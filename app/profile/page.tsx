"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, ExternalLink, Edit, Save, Camera, Star } from "lucide-react";
import Image from "next/image";

// TODO: Replace with real user context or props
const user = {
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    countriesVisited: 12,
    tripsCompleted: 8,
    totalSaved: 15420,
    joinedDate: "January 2024",
};

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user.name,
        email: user.email,
        bio: "Travel enthusiast who loves exploring new cultures and cuisines. Always planning the next adventure!",
        location: "San Francisco, CA",
        website: "https://sarahchen.travel",
    });

    const stats = [
        { label: "Countries Visited", value: user.countriesVisited },
        { label: "Trips Completed", value: user.tripsCompleted },
        { label: "Total Saved", value: `$${user.totalSaved.toLocaleString()}` },
        { label: "Member Since", value: user.joinedDate },
    ];

    const badges = [
        {
            id: 1,
            name: "Passport Stamper",
            icon: "🛂",
            description: "Visited 10+ countries",
            earned: true,
        },
        {
            id: 2,
            name: "Culture Connoisseur",
            icon: "🏛️",
            description: "Visited 15+ museums",
            earned: true,
        },
        {
            id: 3,
            name: "Adventure Seeker",
            icon: "🏔️",
            description: "Completed 5+ adventure activities",
            earned: true,
        },
        {
            id: 4,
            name: "Foodie Explorer",
            icon: "🍜",
            description: "Tried 50+ local dishes",
            earned: true,
        },
        {
            id: 5,
            name: "Budget Master",
            icon: "💰",
            description: "Saved $10,000+ for trips",
            earned: true,
        },
        {
            id: 6,
            name: "Social Butterfly",
            icon: "🦋",
            description: "Traveled with 20+ different people",
            earned: false,
        },
    ];

    const recentTrips = [
        {
            destination: "Paris, France",
            date: "Jan 2024",
            image: "/placeholder.svg?height=100&width=150&text=Paris",
            rating: 5,
        },
        {
            destination: "Rome, Italy",
            date: "Oct 2023",
            image: "/placeholder.svg?height=100&width=150&text=Rome",
            rating: 5,
        },
        {
            destination: "Bali, Indonesia",
            date: "Aug 2023",
            image: "/placeholder.svg?height=100&width=150&text=Bali",
            rating: 4,
        },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Profile Header */}
            <Card className="border-0 shadow-sm mb-8">
                <div className="p-8">
                    <div className="flex items-start space-x-6">
                        <div className="relative">
                            <Image
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                                width={120}
                                height={120}
                                className="rounded-full"
                            />
                            <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg">
                                <Camera className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>

                        <div className="flex-1">
                            {isEditing ? (
                                <div className="space-y-4">
                                    <Input
                                        value={profileData.name}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="text-xl font-semibold"
                                    />
                                    <Input
                                        value={profileData.email}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                    <Textarea
                                        value={profileData.bio}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                bio: e.target.value,
                                            })
                                        }
                                        className="h-20"
                                    />
                                    <Input
                                        value={profileData.location}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                location: e.target.value,
                                            })
                                        }
                                        placeholder="Location"
                                    />
                                    <Input
                                        value={profileData.website}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                website: e.target.value,
                                            })
                                        }
                                        placeholder="Website"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                                        {profileData.name}
                                    </h1>
                                    <p className="text-gray-600 mb-3">
                                        {profileData.email}
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        {profileData.bio}
                                    </p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <span className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {profileData.location}
                                        </span>
                                        <span className="flex items-center">
                                            <ExternalLink className="w-4 h-4 mr-1" />
                                            <a
                                                href={profileData.website}
                                                className="text-rose-600 hover:underline"
                                            >
                                                Website
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex space-x-3 mt-6">
                                {isEditing ? (
                                    <>
                                        <Button
                                            onClick={() => setIsEditing(false)}
                                            className="bg-rose-500 hover:bg-rose-600 text-white"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            Save Changes
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        variant="outline"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Card
                        key={index}
                        className="p-6 border-0 shadow-sm text-center"
                    >
                        <p className="text-2xl font-semibold text-gray-900">
                            {stat.value}
                        </p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Travel Badges */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Travel Badges
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {badges.map((badge) => (
                            <Card
                                key={badge.id}
                                className={`p-4 text-center border-0 shadow-sm ${
                                    badge.earned
                                        ? "bg-gradient-to-br from-yellow-50 to-orange-50"
                                        : "bg-gray-50"
                                }`}
                            >
                                <div
                                    className={`text-3xl mb-2 ${
                                        badge.earned
                                            ? ""
                                            : "grayscale opacity-50"
                                    }`}
                                >
                                    {badge.icon}
                                </div>
                                <h4
                                    className={`font-medium text-sm mb-1 ${
                                        badge.earned
                                            ? "text-gray-900"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {badge.name}
                                </h4>
                                <p
                                    className={`text-xs ${
                                        badge.earned
                                            ? "text-gray-600"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {badge.description}
                                </p>
                                {badge.earned && (
                                    <Badge className="mt-2 bg-yellow-100 text-yellow-800 text-xs">
                                        Earned
                                    </Badge>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Recent Trips */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Recent Trips
                    </h2>
                    <div className="space-y-4">
                        {recentTrips.map((trip, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden border-0 shadow-sm"
                            >
                                <div className="flex">
                                    <div className="w-24 h-20 relative">
                                        <Image
                                            src={
                                                trip.image || "/placeholder.svg"
                                            }
                                            alt={trip.destination}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 p-4">
                                        <h4 className="font-medium text-gray-900">
                                            {trip.destination}
                                        </h4>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {trip.date}
                                        </p>
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3 h-3 ${
                                                        i < trip.rating
                                                            ? "text-yellow-400 fill-current"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
