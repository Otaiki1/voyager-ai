"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    PiggyBank,
    Target,
    TrendingUp,
    Plus,
    Users,
    Calendar,
    Share2,
} from "lucide-react";
import Image from "next/image";
import PaymentModal from "@/components/PaymentModal";
import InviteFriendsModal from "@/components/InviteFriendsModal";
import BookTripModal from "@/components/BookTripModal";

export default function SavingsPage() {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showBookModal, setShowBookModal] = useState(false);
    const [selectedPool, setSelectedPool] = useState(null);

    const savingsPools = [
        {
            id: 1,
            tripName: "Tokyo Adventure",
            destination: "Tokyo, Japan",
            goal: 5000,
            current: 3200,
            contributors: [
                {
                    name: "You",
                    amount: 1500,
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    name: "Mike",
                    amount: 1200,
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    name: "Sarah",
                    amount: 500,
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
            deadline: "Mar 1, 2024",
            status: "active",
        },
        {
            id: 2,
            tripName: "Barcelona Getaway",
            destination: "Barcelona, Spain",
            goal: 3500,
            current: 3500,
            contributors: [
                {
                    name: "You",
                    amount: 1750,
                    avatar: "/placeholder.svg?height=32&width=32",
                },
                {
                    name: "Emma",
                    amount: 1750,
                    avatar: "/placeholder.svg?height=32&width=32",
                },
            ],
            deadline: "Apr 1, 2024",
            status: "completed",
        },
    ];

    const handlePaymentComplete = (amount, method) => {
        // Handle successful payment
        console.log(`Payment of $${amount} via ${method} completed`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Savings Pools
                    </h1>
                    <p className="text-gray-600">
                        Save together with friends for your dream trips
                    </p>
                </div>
                <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Pool
                </Button>
            </div>

            {/* Savings Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Target className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-gray-900">
                                $8,500
                            </p>
                            <p className="text-sm text-gray-600">Total Goals</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 border-0 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-gray-900">
                                79%
                            </p>
                            <p className="text-sm text-gray-600">
                                Average Progress
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Savings Pools */}
            <div className="space-y-6">
                {savingsPools.map((pool) => (
                    <Card key={pool.id} className="border-0 shadow-sm">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        {pool.tripName}
                                    </h3>
                                    <p className="text-gray-600 mb-2">
                                        {pool.destination}
                                    </p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <span>Deadline: {pool.deadline}</span>
                                        <Badge
                                            variant={
                                                pool.status === "completed"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className={
                                                pool.status === "completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : ""
                                            }
                                        >
                                            {pool.status === "completed"
                                                ? "Goal Reached"
                                                : "Active"}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-semibold text-gray-900">
                                        ${pool.current.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        of ${pool.goal.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <Progress
                                    value={(pool.current / pool.goal) * 100}
                                    className="h-3"
                                />
                                <div className="flex justify-between mt-2 text-sm text-gray-600">
                                    <span>
                                        {Math.round(
                                            (pool.current / pool.goal) * 100
                                        )}
                                        % complete
                                    </span>
                                    <span>
                                        $
                                        {(
                                            pool.goal - pool.current
                                        ).toLocaleString()}{" "}
                                        remaining
                                    </span>
                                </div>
                            </div>

                            {/* Contributors */}
                            <div className="mb-6">
                                <h4 className="font-medium text-gray-900 mb-3">
                                    Contributors
                                </h4>
                                <div className="space-y-3">
                                    {pool.contributors.map(
                                        (contributor, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Image
                                                        src={
                                                            contributor.avatar ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt={contributor.name}
                                                        width={32}
                                                        height={32}
                                                        className="rounded-full"
                                                    />
                                                    <span className="font-medium text-gray-900">
                                                        {contributor.name}
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-gray-900">
                                                    $
                                                    {contributor.amount.toLocaleString()}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-3">
                                {pool.status === "active" ? (
                                    <>
                                        <Button
                                            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                                            onClick={() => {
                                                setSelectedPool(pool);
                                                setShowPaymentModal(true);
                                            }}
                                        >
                                            <PiggyBank className="w-4 h-4 mr-2" />
                                            Add Money
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => {
                                                setSelectedPool(pool);
                                                setShowInviteModal(true);
                                            }}
                                        >
                                            <Users className="w-4 h-4 mr-2" />
                                            Invite Friends
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                        onClick={() => {
                                            setSelectedPool(pool);
                                            setShowBookModal(true);
                                        }}
                                    >
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Book Trip
                                    </Button>
                                )}
                                <Button variant="outline" size="sm">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Modals */}
            {showPaymentModal && selectedPool && (
                <PaymentModal
                    isOpen={showPaymentModal}
                    onClose={() => setShowPaymentModal(false)}
                    poolName={selectedPool.tripName}
                    onPaymentComplete={handlePaymentComplete}
                />
            )}

            {showInviteModal && selectedPool && (
                <InviteFriendsModal
                    isOpen={showInviteModal}
                    onClose={() => setShowInviteModal(false)}
                    tripName={selectedPool.tripName}
                />
            )}

            {showBookModal && selectedPool && (
                <BookTripModal
                    isOpen={showBookModal}
                    onClose={() => setShowBookModal(false)}
                    tripName={selectedPool.tripName}
                    budget={selectedPool.current}
                />
            )}
        </div>
    );
}
