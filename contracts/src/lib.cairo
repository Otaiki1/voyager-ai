use starknet::{ContractAddress};

#[starknet::interface]
pub trait IVoyageAI<ContractState>{
    fn create_trip(ref self: ContractState, total_budget: u256, deadline: u64, max_participants: u32) -> u32;
    fn join_trip(ref self: ContractState, trip_id: u32, amount: u256);
    fn confirm_trip(ref self: ContractState, trip_id: u32);
    fn cancel_trip(ref self: ContractState, trip_id: u32);
    fn release_funds(ref self: ContractState, trip_id: u32, recipient: ContractAddress);
    fn refund_participants(ref self: ContractState, trip_id: u32);
    fn earn_points(ref self: ContractState, user: ContractAddress, points: u256);
    fn redeem_points(ref self: ContractState, points: u256);
    fn get_user_points(ref self: ContractState, user: ContractAddress) -> u256;
    fn get_trip_details(ref self: ContractState, trip_id: u32) -> (u32, ContractAddress, u256, u256, u64, u32, u32, bool, bool, u64);
    fn get_participant_contribution(ref self: ContractState, trip_id: u32, participant: ContractAddress) -> u256;
}

// ================= VoyageAI Contract ================

#[starknet::contract]
mod VoyageAI {
    use starknet::{get_caller_address, get_contract_address};
    use starknet::ContractAddress;
    use starknet::storage::Map;
    use starknet::storage::StoragePointerReadAccess;
    use starknet::storage::StoragePointerWriteAccess;
    use starknet::storage::StorageMapReadAccess;
    use starknet::storage::StorageMapWriteAccess;
    use core::array::ArrayTrait;
    use core::array::Array;
    use core::integer::u256;
    use core::bool;
    use core::option::OptionTrait;

    // ================= Events ================
    
    #[derive(Copy, Drop, starknet::Event)]
    struct TripCreated {
        trip_id: u32,
        organizer: ContractAddress,
        total_budget: u256,
        deadline: u64,
        max_participants: u32,
    }
    
    #[derive(Copy, Drop, starknet::Event)]
    struct UserJoined {
        trip_id: u32,
        participant: ContractAddress,
        amount: u256,
    }

    #[derive(Copy, Drop, starknet::Event)]
    struct TripConfirmed {
        trip_id: u32,
        confirmed: bool,
    }

    #[derive(Copy, Drop, starknet::Event)]
    struct TripCancelled {
        trip_id: u32,
        cancelled: bool,
    }

    #[derive(Copy, Drop, starknet::Event)]
    struct FundsReleased {
        trip_id: u32,
        amount: u256,
        recipient: ContractAddress,
    }

    #[derive(Copy, Drop, starknet::Event)]
    struct FundsRefunded {
        trip_id: u32,
        participant: ContractAddress,
        amount: u256,
    }

    #[derive(Copy, Drop, starknet::Event)]
    struct PointsEarned {
        participant: ContractAddress,
        points: u256,
        total_points: u256,
    }

    #[derive(Copy, Drop, starknet::Event)]
    struct PointsRedeemed {
        participant: ContractAddress,
        points: u256,
        remaining_points: u256,
    }

    // ================= Data Structures ================

    #[derive(Drop, Debug, PartialEq, Serde, starknet::Store)]
    struct Participant {
        address: ContractAddress,
        contribution: u256,
        joined_at: u64,
    }

    #[derive(Drop, Debug, PartialEq, Serde, starknet::Store)]
    struct Trip {
        id: u32,
        organizer: ContractAddress,
        total_budget: u256,
        funds_raised: u256,
        deadline: u64,
        max_participants: u32,
        current_participants: u32,
        is_confirmed: bool,
        is_cancelled: bool,
        created_at: u64,
    }

    #[derive(Drop, Debug, PartialEq, Serde, starknet::Store)]
    struct UserProfile {
        total_points: u256,
        trips_created: u32,
        trips_joined: u32,
        total_contributed: u256,
    }

    // ================= Storage ================

    #[storage]
    struct Storage {
        trip_count: u32,
        trips: Map::<u32, Trip>,
        user_profiles: Map::<ContractAddress, UserProfile>,
        total_escrow_funds: u256,
    }

    // ================= Events ================

    #[event]
    #[derive(Copy, Drop, starknet::Event)]
    pub enum Event {
        TripCreated: TripCreated,
        UserJoined: UserJoined,
        TripConfirmed: TripConfirmed,
        TripCancelled: TripCancelled,
        FundsReleased: FundsReleased,
        FundsRefunded: FundsRefunded,
        PointsEarned: PointsEarned,
        PointsRedeemed: PointsRedeemed,
    }

    // ================= Implementation ================

    #[abi(embed_v0)]
    impl VoyageAI of super::IVoyageAI<ContractState> {
        
        // Create a new trip pool with escrow functionality
        fn create_trip(ref self: ContractState, total_budget: u256, deadline: u64, max_participants: u32) -> u32 {
            let organizer = starknet::get_caller_address();
            assert(total_budget > 0, 'Budget cannot be 0');
            assert(deadline > 0, 'Deadline cannot be 0');
            assert(max_participants > 0, 'participants mustgreater0');
            
            let trip_id = self.trip_count.read();
            self.trip_count.write(trip_id + 1);

            let current_time = starknet::get_block_timestamp();
            assert(deadline > current_time, 'Deadline must be in the future');

            let trip = Trip {
                id: trip_id,
                organizer,
                total_budget,
                funds_raised: 0_u256,
                deadline,
                max_participants,
                current_participants: 0,
                is_confirmed: false,
                is_cancelled: false,
                created_at: current_time,
            };

            self.trips.write(trip_id, trip);
            
            // Initialize organizer's profile if not exists
            self._initialize_user_profile(organizer);
            
            // Update organizer's stats
            let mut organizer_profile = self.user_profiles.read(organizer);
            organizer_profile.trips_created = organizer_profile.trips_created + 1;
            self.user_profiles.write(organizer, organizer_profile);
            
            // Award points for creating a trip
            self._award_points(organizer, 100_u256);
            
            self.emit(TripCreated { trip_id, organizer, total_budget, deadline, max_participants });
            trip_id
        }

        // Join a trip and contribute funds to escrow
        fn join_trip(ref self: ContractState, trip_id: u32, amount: u256) {
            let participant = starknet::get_caller_address();
            let mut trip = self.trips.read(trip_id);
            
            // Validate trip state
            assert(!trip.is_cancelled, 'Trip is cancelled');
            assert(!trip.is_confirmed, 'Trip is already confirmed');
            assert(trip.current_participants < trip.max_participants, 'Trip is full');
            
            let current_time = starknet::get_block_timestamp();
            assert(current_time < trip.deadline, 'Trip deadline has passed');
            
            assert(amount > 0, 'amount must be greater than 0');
            
            // Check if user is not the organizer
            assert(participant != trip.organizer, 'not organizer');
            
            // Update trip funds
            trip.funds_raised = trip.funds_raised + amount;
            trip.current_participants = trip.current_participants + 1;
            self.trips.write(trip_id, trip);
            
            // Update total escrow funds
            let total_escrow = self.total_escrow_funds.read();
            self.total_escrow_funds.write(total_escrow + amount);
            
            // Initialize participant's profile if not exists
            self._initialize_user_profile(participant);
            
            // Update participant's stats
            let mut participant_profile = self.user_profiles.read(participant);
            participant_profile.trips_joined = participant_profile.trips_joined + 1;
            participant_profile.total_contributed = participant_profile.total_contributed + amount;
            self.user_profiles.write(participant, participant_profile);
            
            // Award points for joining
            self._award_points(participant, 50_u256);
            
            self.emit(UserJoined { trip_id, participant, amount });
        }

        // Confirm trip and release funds to organizer
        fn confirm_trip(ref self: ContractState, trip_id: u32) {
            let caller = starknet::get_caller_address();
            let mut trip = self.trips.read(trip_id);
            
            assert(caller == trip.organizer, 'Only organizer can confirm trip');
            assert(!trip.is_cancelled, 'Trip is cancelled');
            assert(!trip.is_confirmed, 'Trip is already confirmed');
            assert(trip.funds_raised >= trip.total_budget, 'Insufficient funds raised');
            
            trip.is_confirmed = true;
            self.trips.write(trip_id, trip);
            
            // Award points to organizer for successful trip
            self._award_points(caller, 200_u256);
            
            self.emit(TripConfirmed { trip_id, confirmed: true });
        }

        // Cancel trip and enable refunds
        fn cancel_trip(ref self: ContractState, trip_id: u32) {
            let caller = starknet::get_caller_address();
            let mut trip = self.trips.read(trip_id);
            
            assert(caller == trip.organizer, 'Only organizer can cancel trip');
            assert(!trip.is_cancelled, 'Trip is already cancelled');
            assert(!trip.is_confirmed, 'Trip is already confirmed');
            
            trip.is_cancelled = true;
            self.trips.write(trip_id, trip);
            
            self.emit(TripCancelled { trip_id, cancelled: true });
        }

        // Release funds to service provider or organizer
        fn release_funds(ref self: ContractState, trip_id: u32, recipient: ContractAddress) {
            let caller = starknet::get_caller_address();
            let trip = self.trips.read(trip_id);
            
            assert(caller == trip.organizer, 'cant Release');
            assert(trip.is_confirmed, 'Trip not confirmed');
            assert(!trip.is_cancelled, 'Trip is cancelled');
            assert(trip.funds_raised > 0, 'No funds to release');
            
            // Update total escrow funds
            let total_escrow = self.total_escrow_funds.read();
            self.total_escrow_funds.write(total_escrow - trip.funds_raised);
            
            self.emit(FundsReleased { trip_id, amount: trip.funds_raised, recipient });
        }

        // Refund participants when trip is cancelled
        fn refund_participants(ref self: ContractState, trip_id: u32) {
            let caller = starknet::get_caller_address();
            let trip = self.trips.read(trip_id);
            
            assert(caller == trip.organizer, 'Only organizer can refund');
            assert(trip.is_cancelled, ' cancel trip to refund');
            assert(!trip.is_confirmed, 'Trip is confirmed');
            
            // Update total escrow funds
            let total_escrow = self.total_escrow_funds.read();
            self.total_escrow_funds.write(total_escrow - trip.funds_raised);
            
            // Note: In a real implementation, you would iterate through participants
            // and transfer funds back to each participant
            // For now, we just emit the event
            self.emit(FundsRefunded { trip_id, participant: caller, amount: trip.funds_raised });
        }

        // Award points to a user
        fn earn_points(ref self: ContractState, user: ContractAddress, points: u256) {
            let caller = starknet::get_caller_address();
            // In a real implementation, you might want to restrict who can award points
            // assert(caller == authorized_address, 'Not authorized to award points');
            
            self._award_points(user, points);
        }

        // Redeem points for rewards
        fn redeem_points(ref self: ContractState, points: u256) {
            let user = starknet::get_caller_address();
            assert(points > 0, 'Points must be greater than 0');
            
            let mut profile = self.user_profiles.read(user);
            let remaining_points = profile.total_points - points;
            assert(profile.total_points >= points, 'Insufficient points');
            
            profile.total_points = remaining_points;
            self.user_profiles.write(user, profile);
            
            self.emit(PointsRedeemed { participant: user, points, remaining_points });
        }

        // Get user's current points
        fn get_user_points(ref self: ContractState, user: ContractAddress) -> u256 {
            let profile = self.user_profiles.read(user);
            profile.total_points
        }

        // Get trip details
        fn get_trip_details(ref self: ContractState, trip_id: u32) -> (u32, ContractAddress, u256, u256, u64, u32, u32, bool, bool, u64) {
            let trip = self.trips.read(trip_id);
            (trip.id, trip.organizer, trip.total_budget, trip.funds_raised, trip.deadline, trip.max_participants, trip.current_participants, trip.is_confirmed, trip.is_cancelled, trip.created_at)
        }

        // Get participant's contribution for a specific trip
        fn get_participant_contribution(ref self: ContractState, trip_id: u32, participant: ContractAddress) -> u256 {
            // Since we simplified storage, return 0 for now
            // In a real implementation, you would track this in a separate Map
            0_u256
        }
    }

    // ================= Internal Functions ================

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn _initialize_user_profile(ref self: ContractState, user: ContractAddress) {
            let profile_exists = self.user_profiles.read(user).total_points != 0_u256 
                || self.user_profiles.read(user).trips_created != 0 
                || self.user_profiles.read(user).trips_joined != 0;
            
            if !profile_exists {
                let new_profile = UserProfile {
                    total_points: 0_u256,
                    trips_created: 0,
                    trips_joined: 0,
                    total_contributed: 0_u256,
                };
                self.user_profiles.write(user, new_profile);
            }
        }

        fn _award_points(ref self: ContractState, user: ContractAddress, points: u256) {
            let mut profile = self.user_profiles.read(user);
            profile.total_points = profile.total_points + points;
            let total_points = profile.total_points;
            self.user_profiles.write(user, profile);

            self.emit(PointsEarned { participant: user, points, total_points });
        }
    }
}