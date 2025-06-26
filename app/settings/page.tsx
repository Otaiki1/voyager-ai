"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, Shield, LogOut } from "lucide-react";

// TODO: Replace with real user context or props
const user = {
    loginMethod: "google",
    email: "sarah.chen@example.com",
    wallet: "0x742d35Cc6Cc445C228532c8f3a",
};

export default function SettingsPage() {
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sms: false,
        marketing: false,
    });

    const [privacy, setPrivacy] = useState({
        profileVisible: true,
        tripsVisible: true,
        savingsVisible: false,
    });

    const [showPrivateKey, setShowPrivateKey] = useState(false);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Settings
                </h1>
                <p className="text-gray-600">
                    Manage your account preferences and security
                </p>
            </div>

            <div className="space-y-8">
                {/* Account Settings */}
                <Card className="border-0 shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Account Settings
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Connected Account
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Signed in via {user.loginMethod}
                                    </p>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className="capitalize"
                                >
                                    {user.loginMethod}
                                </Badge>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Email Address
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {user.email}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Change
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Wallet & Security */}
                <Card className="border-0 shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Wallet & Security
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Wallet Address
                                    </p>
                                    <p className="text-sm text-gray-600 font-mono">
                                        {user.wallet}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-green-600">
                                        Connected
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Private Key
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {showPrivateKey
                                            ? "0x8f3a2d74c6e9b1a5..."
                                            : "••••••••••••••••"}
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setShowPrivateKey(!showPrivateKey)
                                    }
                                >
                                    {showPrivateKey ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Two-Factor Authentication
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Add an extra layer of security
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Shield className="w-4 h-4 mr-2" />
                                    Enable 2FA
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Notifications */}
                <Card className="border-0 shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Notifications
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Email Notifications
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Receive updates about your trips and
                                        savings
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.email}
                                    onCheckedChange={(checked) =>
                                        setNotifications({
                                            ...notifications,
                                            email: checked,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Push Notifications
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Get notified about important updates
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.push}
                                    onCheckedChange={(checked) =>
                                        setNotifications({
                                            ...notifications,
                                            push: checked,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        SMS Notifications
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Receive text messages for urgent updates
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.sms}
                                    onCheckedChange={(checked) =>
                                        setNotifications({
                                            ...notifications,
                                            sms: checked,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Marketing Emails
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Receive travel deals and promotions
                                    </p>
                                </div>
                                <Switch
                                    checked={notifications.marketing}
                                    onCheckedChange={(checked) =>
                                        setNotifications({
                                            ...notifications,
                                            marketing: checked,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Privacy */}
                <Card className="border-0 shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Privacy
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Profile Visibility
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Allow others to see your profile
                                    </p>
                                </div>
                                <Switch
                                    checked={privacy.profileVisible}
                                    onCheckedChange={(checked) =>
                                        setPrivacy({
                                            ...privacy,
                                            profileVisible: checked,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Trip Visibility
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Show your trips to other users
                                    </p>
                                </div>
                                <Switch
                                    checked={privacy.tripsVisible}
                                    onCheckedChange={(checked) =>
                                        setPrivacy({
                                            ...privacy,
                                            tripsVisible: checked,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Savings Visibility
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Allow others to see your savings
                                        progress
                                    </p>
                                </div>
                                <Switch
                                    checked={privacy.savingsVisible}
                                    onCheckedChange={(checked) =>
                                        setPrivacy({
                                            ...privacy,
                                            savingsVisible: checked,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Danger Zone */}
                <Card className="border-0 shadow-sm border-red-200">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-red-900 mb-4">
                            Danger Zone
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-red-900">
                                        Disconnect Wallet
                                    </p>
                                    <p className="text-sm text-red-600">
                                        This will log you out and disconnect
                                        your wallet
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Disconnect
                                </Button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-red-900">
                                        Delete Account
                                    </p>
                                    <p className="text-sm text-red-600">
                                        Permanently delete your account and all
                                        data
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                >
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
