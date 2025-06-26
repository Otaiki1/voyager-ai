# VoyageAI - Decentralized Travel Planning & Savings Platform

![VoyageAI Logo](https://img.shields.io/badge/VoyageAI-Travel%20Planning%20%26%20Savings-rose?style=for-the-badge&logo=globe)

A revolutionary decentralized application (dApp) that combines AI-powered travel planning with collaborative savings pools on Starknet. VoyageAI enables friends to plan trips together, save money collectively, and earn rewards through blockchain-based escrow functionality.

## 🌟 Features

### 🏠 **Dashboard**

-   Personalized travel overview with active trips and savings progress
-   Quick stats showing total saved, travel buddies, and goals reached
-   Recent activity feed and wallet integration
-   AI-powered trip recommendations

### 🗺️ **Explore Destinations**

-   Browse curated travel destinations with ratings and reviews
-   Filter by categories (Beach, City, Adventure, Culture)
-   Average cost estimates and traveler reviews
-   One-click trip planning integration

### ✈️ **Trip Management**

-   Create and manage travel itineraries
-   Collaborative trip planning with friends
-   Real-time progress tracking
-   Trip status management (Upcoming, Ready to Book, Completed)

### 💰 **Savings Pools**

-   Create collaborative savings pools for trips
-   Escrow-based fund management on Starknet
-   Progress tracking and contribution management
-   Automated fund release when goals are reached

### 🤖 **AI Trip Advisor**

-   AI-powered travel recommendations
-   Personalized trip suggestions
-   Interactive chat interface for travel queries
-   Budget optimization and itinerary planning

### 👤 **User Profiles**

-   Travel statistics and achievements
-   Badge system for travel milestones
-   Recent trip history with ratings
-   Editable profile information

### ⚙️ **Settings & Security**

-   Wallet connection management
-   Privacy controls and notification preferences
-   Two-factor authentication support
-   Account security settings

## 🏗️ Architecture

### Frontend

-   **Framework**: Next.js 15 with App Router
-   **UI Library**: Radix UI components with Tailwind CSS
-   **State Management**: React hooks and context
-   **Styling**: Tailwind CSS with custom design system
-   **Icons**: Lucide React

### Blockchain Integration

-   **Network**: Starknet Testnet
-   **Wallet Integration**: Cartridge Connector, MetaMask SDK
-   **Smart Contracts**: Cairo contracts for escrow and rewards
-   **Web3 Libraries**: Starknet React, StarknetKit

### Smart Contract Features

-   **Escrow System**: Secure fund management for trip savings
-   **Rewards System**: Point-based incentives for participation
-   **Multi-signature**: Collaborative decision making for fund release
-   **Automated Refunds**: Smart contract-based refund mechanisms

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   pnpm, npm, or yarn
-   Starknet wallet (ArgentX, Braavos, or MetaMask)

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd voyageai-dapp
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

3. **Set up environment variables**

    ```bash
    cp .env.example .env.local
    # Add your Starknet RPC URL and other configuration
    ```

4. **Run the development server**

    ```bash
    npm run dev
    # or
    pnpm dev
    # or
    yarn dev
    ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Smart Contract Deployment

The VoyageAI smart contract has been deployed to **Starknet Testnet**:

**Contract Address**: `0x049329191e5adb38e49f96020312b6115bba958817970a764405d669636f7a54`

#### Contract Functions

-   `create_trip()` - Create a new trip savings pool
-   `join_trip()` - Join a trip and contribute funds
-   `confirm_trip()` - Confirm trip and release funds
-   `cancel_trip()` - Cancel trip and refund participants
-   `earn_points()` - Award points for participation
-   `redeem_points()` - Redeem points for rewards

## 🛠️ Technology Stack

### Frontend

-   **Next.js 15** - React framework with App Router
-   **TypeScript** - Type-safe JavaScript
-   **Tailwind CSS** - Utility-first CSS framework
-   **Radix UI** - Accessible component primitives
-   **Lucide React** - Beautiful icons

### Blockchain

-   **Starknet** - Layer 2 scaling solution
-   **Cairo** - Smart contract language
-   **Starknet React** - React hooks for Starknet
-   **Cartridge Connector** - Wallet connection
-   **MetaMask SDK** - Multi-wallet support

### Development Tools

-   **Scarb** - Cairo package manager
-   **Starknet Foundry** - Testing framework
-   **ESLint** - Code linting
-   **PostCSS** - CSS processing

## 📱 Application Structure

```
voyageai-dapp/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── explore/          # Destination exploration
│   ├── trips/            # Trip management
│   ├── savings/          # Savings pools
│   ├── planning/         # Trip planning
│   ├── profile/          # User profiles
│   ├── settings/         # App settings
│   └── ai/               # AI trip advisor
├── components/           # Reusable UI components
├── contracts/           # Cairo smart contracts
├── providers/           # React context providers
├── hooks/               # Custom React hooks
└── lib/                 # Utility functions
```

## 🔐 Security Features

-   **Escrow System**: Funds are held securely in smart contracts
-   **Multi-signature**: Collaborative decision making for fund release
-   **Automated Refunds**: Smart contract-based refund mechanisms
-   **Wallet Integration**: Secure wallet connection with multiple providers
-   **Privacy Controls**: User-configurable privacy settings

## 🎯 Use Cases

1. **Group Travel Planning**: Friends can plan trips together with shared budgets
2. **Savings Motivation**: Collaborative savings pools encourage saving for travel
3. **Trustless Escrow**: Smart contracts ensure secure fund management
4. **Rewards System**: Earn points for participation and redeem for benefits
5. **AI-Powered Planning**: Get personalized travel recommendations

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Links

-   **Live Demo**: [Coming Soon]
-   **Documentation**: [Coming Soon]
-   **Smart Contract**: [voyager-sepolia](https://sepolia.voyager.online/contract/0x049329191e5adb38e49f96020312b6115bba958817970a764405d669636f7a54)
-   **Discord**: [Join our community](https://discord.gg/voyageai)

## 🙏 Acknowledgments

-   Built with [Next.js](https://nextjs.org/)
-   Powered by [Starknet](https://starknet.io/)
-   UI components from [Radix UI](https://www.radix-ui.com/)
-   Icons from [Lucide](https://lucide.dev/)

---

**VoyageAI** - Making travel planning decentralized, collaborative, and rewarding! 🌍✈️
