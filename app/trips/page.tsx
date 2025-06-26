"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapIcon, Plus, Edit, Share2, Plane } from "lucide-react";
import Image from "next/image";
import ShareTripModal from "@/components/ShareTripModal";

export default function TripsPage() {
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);

    const trips = [
        {
            id: 1,
            destination: "Tokyo, Japan",
            dates: "Mar 15-22, 2024",
            status: "Upcoming",
            image: "/placeholder.svg?height=200&width=300&text=Tokyo+Skyline",
            collaborators: [
                { name: "You", avatar: "/placeholder.svg?height=32&width=32" },
                { name: "Mike", avatar: "/placeholder.svg?height=32&width=32" },
                {
                    name: "Sarah",
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
            itinerary: [
                {
                    day: 1,
                    activity: "Arrive & Check-in",
                    time: "2:00 PM",
                    location: "Shibuya",
                },
                {
                    day: 1,
                    activity: "Shibuya Crossing",
                    time: "4:00 PM",
                    location: "Shibuya",
                },
                {
                    day: 2,
                    activity: "Senso-ji Temple",
                    time: "9:00 AM",
                    location: "Asakusa",
                },
                {
                    day: 2,
                    activity: "Tokyo Skytree",
                    time: "2:00 PM",
                    location: "Sumida",
                },
            ],
            budget: 5000,
            spent: 3200,
        },
        {
            id: 2,
            destination: "Barcelona, Spain",
            dates: "Apr 8-15, 2024",
            status: "Ready to Book",
            image: "/placeholder.svg?height=200&width=300&text=Barcelona+Architecture",
            collaborators: [
                { name: "You", avatar: "/placeholder.svg?height=32&width=32" },
                { name: "Emma", avatar: "/placeholder.svg?height=32&width=32" },
            ],
            itinerary: [
                {
                    day: 1,
                    activity: "Sagrada Familia",
                    time: "10:00 AM",
                    location: "Eixample",
                },
                {
                    day: 1,
                    activity: "Park Güell",
                    time: "3:00 PM",
                    location: "Gràcia",
                },
                {
                    day: 2,
                    activity: "Gothic Quarter",
                    time: "9:00 AM",
                    location: "Ciutat Vella",
                },
            ],
            budget: 3500,
            spent: 3500,
        },
        {
            id: 3,
            destination: "Paris, France",
            dates: "Jan 10-17, 2024",
            status: "Completed",
            image: "/placeholder.svg?height=200&width=300&text=Paris+Eiffel+Tower",
            collaborators: [
                { name: "You", avatar: "/placeholder.svg?height=32&width=32" },
                { name: "Alex", avatar: "/placeholder.svg?height=32&width=32" },
                { name: "Lisa", avatar: "/placeholder.svg?height=32&width=32" },
            ],
            itinerary: [
                {
                    day: 1,
                    activity: "Eiffel Tower",
                    time: "10:00 AM",
                    location: "7th Arrondissement",
                },
                {
                    day: 1,
                    activity: "Seine River Cruise",
                    time: "3:00 PM",
                    location: "Seine",
                },
                {
                    day: 2,
                    activity: "Louvre Museum",
                    time: "9:00 AM",
                    location: "1st Arrondissement",
                },
            ],
            budget: 4200,
            spent: 4200,
        },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        My Trips
                    </h1>
                    <p className="text-gray-600">
                        Manage your travel adventures
                    </p>
                </div>
                <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Plan New Trip
                </Button>
            </div>

            {/* Trip Cards */}
            <div className="space-y-6">
                {trips.map((trip) => (
                    <Card
                        key={trip.id}
                        className="overflow-hidden border-0 shadow-sm"
                    >
                        <div className="md:flex">
                            <div className="md:w-64 h-48 md:h-auto relative">
                                <Image
                                    src={trip.image || "/placeholder.svg"}
                                    alt={trip.destination}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <Badge
                                        variant={
                                            trip.status === "Completed"
                                                ? "default"
                                                : trip.status ===
                                                  "Ready to Book"
                                                ? "default"
                                                : "secondary"
                                        }
                                        className={
                                            trip.status === "Completed"
                                                ? "bg-green-100 text-green-800"
                                                : trip.status ===
                                                  "Ready to Book"
                                                ? "bg-blue-100 text-blue-800"
                                                : ""
                                        }
                                    >
                                        {trip.status}
                                    </Badge>
                                </div>
                            </div>

                            <div className="flex-1 p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {trip.destination}
                                        </h3>
                                        <p className="text-gray-600 mb-3">
                                            {trip.dates}
                                        </p>

                                        {/* Collaborators */}
                                        <div className="flex items-center space-x-2 mb-4">
                                            <div className="flex -space-x-2">
                                                {trip.collaborators.map(
                                                    (collab, index) => (
                                                        <Image
                                                            key={index}
                                                            src={
                                                                collab.avatar ||
                                                                "/placeholder.svg"
                                                            }
                                                            alt={collab.name}
                                                            width={32}
                                                            height={32}
                                                            className="rounded-full border-2 border-white"
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                {trip.collaborators.length}{" "}
                                                travelers
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">
                                            Budget
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            ${trip.budget.toLocaleString()}
                                        </p>
                                        {trip.status !== "Completed" && (
                                            <p className="text-sm text-gray-600">
                                                ${trip.spent.toLocaleString()}{" "}
                                                saved
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Itinerary Preview */}
                                <div className="mb-4">
                                    <h4 className="font-medium text-gray-900 mb-2">
                                        Itinerary Highlights
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {trip.itinerary
                                            .slice(0, 4)
                                            .map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-2 text-sm text-gray-600"
                                                >
                                                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                                                    <span>
                                                        Day {item.day}:{" "}
                                                        {item.activity}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                    >
                                        <MapIcon className="w-4 h-4 mr-2" />
                                        View Details
                                    </Button>

                                    {trip.status === "Ready to Book" && (
                                        <Button
                                            size="sm"
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            <Plane className="w-4 h-4 mr-2" />
                                            Book Now
                                        </Button>
                                    )}

                                    {trip.status === "Upcoming" && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                        >
                                            <Edit className="w-4 h-4 mr-2" />
                                            Edit Trip
                                        </Button>
                                    )}

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedTrip(trip);
                                            setShowShareModal(true);
                                        }}
                                    >
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Share Modal */}
            {showShareModal && selectedTrip && (
                <ShareTripModal
                    isOpen={showShareModal}
                    onClose={() => setShowShareModal(false)}
                    tripName={selectedTrip.destination}
                />
            )}
        </div>
    );
}
