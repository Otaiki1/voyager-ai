"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    PiggyBank,
    MapPin,
    Users,
    Target,
    Plus,
    MessageCircle,
    User,
    Wallet,
} from "lucide-react";
import Image from "next/image";

// TODO: Replace with real user context or props
const user = {
    name: "Sarah Chen",
    loginMethod: "google",
    balance: "2,450 STRK",
    wallet: "0x742d35Cc6Cc445C228532c8f3a",
    usdBalance: "$1,225.50",
};

export default function DashboardPage() {
    const upcomingTrips = [
        {
            id: 1,
            destination: "Tokyo, Japan",
            dates: "Mar 15-22, 2024",
            image: "/placeholder.svg?height=200&width=300&text=Tokyo+Skyline",
            savingsGoal: 5000,
            currentSavings: 3200,
            collaborators: 3,
            status: "Saving",
        },
        {
            id: 2,
            destination: "Barcelona, Spain",
            dates: "Apr 8-15, 2024",
            image: "/placeholder.svg?height=200&width=300&text=Barcelona+Architecture",
            savingsGoal: 3500,
            currentSavings: 3500,
            collaborators: 2,
            status: "Ready to Book",
        },
    ];

    const recentActivity = [
        {
            user: "Mike",
            action: "added $200 to Tokyo savings pool",
            time: "2h ago",
            amount: "+$200",
        },
        {
            user: "Emma",
            action: "joined Barcelona trip",
            time: "4h ago",
            amount: null,
        },
        {
            user: "You",
            action: "created Tokyo savings pool",
            time: "1d ago",
            amount: "+$500",
        },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Welcome back, {user.name.split(" ")[0]}
                </h1>
                <p className="text-gray-600">
                    Plan your next adventure and save together with friends
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 border-0 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-gray-900">
                                4
                            </p>
                            <p className="text-sm text-gray-600">
                                Active Trips
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-0 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <PiggyBank className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-gray-900">
                                $6,700
                            </p>
                            <p className="text-sm text-gray-600">Total Saved</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-0 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-gray-900">
                                12
                            </p>
                            <p className="text-sm text-gray-600">
                                Travel Buddies
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-0 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                            <Target className="w-6 h-6 text-rose-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-gray-900">
                                85%
                            </p>
                            <p className="text-sm text-gray-600">
                                Goals Reached
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Your Trips */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Your Trips
                        </h2>
                        <div className="flex space-x-3">
                            <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Trip
                            </Button>
                            <Button variant="outline">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Ask AI
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {upcomingTrips.map((trip) => (
                            <Card
                                key={trip.id}
                                className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="md:flex">
                                    <div className="md:w-48 h-48 md:h-auto relative">
                                        <Image
                                            src={
                                                trip.image || "/placeholder.svg"
                                            }
                                            alt={trip.destination}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {trip.destination}
                                                </h3>
                                                <p className="text-gray-600 mb-2">
                                                    {trip.dates}
                                                </p>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                    <span className="flex items-center">
                                                        <Users className="w-4 h-4 mr-1" />
                                                        {trip.collaborators}{" "}
                                                        travelers
                                                    </span>
                                                </div>
                                            </div>
                                            <Badge
                                                variant={
                                                    trip.status ===
                                                    "Ready to Book"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                                className={
                                                    trip.status ===
                                                    "Ready to Book"
                                                        ? "bg-green-100 text-green-800"
                                                        : ""
                                                }
                                            >
                                                {trip.status}
                                            </Badge>
                                        </div>

                                        {/* Savings Progress */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-700">
                                                    Savings Progress
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    $
                                                    {trip.currentSavings.toLocaleString()}{" "}
                                                    / $
                                                    {trip.savingsGoal.toLocaleString()}
                                                </span>
                                            </div>
                                            <Progress
                                                value={
                                                    (trip.currentSavings /
                                                        trip.savingsGoal) *
                                                    100
                                                }
                                                className="h-2"
                                            />
                                        </div>

                                        <div className="flex space-x-3">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                            >
                                                <PiggyBank className="w-4 h-4 mr-2" />
                                                Add to Savings
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Recent Activity
                    </h2>
                    <Card className="border-0 shadow-sm">
                        <div className="p-6">
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3"
                                    >
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-gray-900">
                                                <span className="font-medium">
                                                    {activity.user}
                                                </span>{" "}
                                                {activity.action}
                                            </p>
                                            <div className="flex items-center justify-between mt-1">
                                                <p className="text-xs text-gray-500">
                                                    {activity.time}
                                                </p>
                                                {activity.amount && (
                                                    <span className="text-xs font-medium text-green-600">
                                                        {activity.amount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Wallet Info */}
                    <Card className="border-0 shadow-sm mt-6">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Wallet
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        Connected via
                                    </span>
                                    <Badge
                                        variant="secondary"
                                        className="capitalize"
                                    >
                                        {user.loginMethod}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        Wallet Address
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm font-mono text-gray-900">
                                            {user.wallet}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        STRK Balance
                                    </span>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {user.balance}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        USD Value
                                    </span>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {user.usdBalance}
                                    </span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                >
                                    <Wallet className="w-4 h-4 mr-2" />
                                    Manage Wallet
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
