"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    MapPin,
    Users,
    Calendar,
    Wallet,
    Plus,
    Search,
    Bell,
    Settings,
    User,
    Home,
    PiggyBank,
    Target,
    TrendingUp,
    Share2,
    Heart,
    Star,
    Filter,
    Globe,
    Menu,
    X,
    Mail,
    Copy,
    Check,
    CreditCard,
    Send,
    LogOut,
    Shield,
    Eye,
    EyeOff,
    Plane,
    Camera,
    Edit,
    Save,
    Facebook,
    Twitter,
    Instagram,
    MessageCircle,
    ExternalLink,
    DollarSign,
    MapIcon,
} from "lucide-react";
import Image from "next/image";
import {
    AITripAdvisorScreen as AITripAdvisorScreenComponent,
    AIChatModal as AIChatModalComponent,
} from "../components/ai-trip-advisor";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import ControllerConnector from "@cartridge/connector/controller";
export default function Main() {
    const [currentScreen, setCurrentScreen] = useState("onboarding");
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showAIChat, setShowAIChat] = useState(false);
    const [aiMessages, setAiMessages] = useState([]);
    const [currentAIContext, setCurrentAIContext] = useState(null);

    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const { address } = useAccount();
    const controller = connectors[0] as ControllerConnector;

    const handleSocialLogin = async (provider: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setUser({
                name: "Sarah Chen",
                email: "sarah.chen@example.com",
                avatar: "/placeholder.svg?height=40&width=40",
                wallet: "0x742d35Cc6Cc445C228532c8f3a",
                balance: "2,450 STRK",
                usdBalance: "$1,225.50",
                isConnected: true,
                loginMethod: provider,
                joinedDate: "January 2024",
                tripsCompleted: 8,
                countriesVisited: 12,
                totalSaved: 15420,
            });
            connect({ connector: controller });
            setCurrentScreen("dashboard");
            setIsLoading(false);
        }, 2000);
    };

    const handleDisconnect = () => {
        setUser(null);
        setCurrentScreen("onboarding");
        setShowProfileMenu(false);
    };

    if (currentScreen === "onboarding") {
        return (
            <OnboardingScreen
                onLogin={handleSocialLogin}
                isLoading={isLoading}
            />
        );
    }

    if (isLoading) {
        return <LoadingScreen />;
    }

    const screens = {
        dashboard: (
            <DashboardScreen
                user={user}
                onNavigate={setCurrentScreen}
                onOpenAI={setShowAIChat}
            />
        ),
        explore: (
            <ExploreScreen
                onNavigate={setCurrentScreen}
                onOpenAI={setShowAIChat}
            />
        ),
        trips: (
            <TripsScreen
                onNavigate={setCurrentScreen}
                onOpenAI={setShowAIChat}
            />
        ),
        savings: (
            <SavingsScreen
                onNavigate={setCurrentScreen}
                onOpenAI={setShowAIChat}
            />
        ),
        planning: (
            <TripPlanningScreen
                onNavigate={setCurrentScreen}
                onOpenAI={setShowAIChat}
            />
        ),
        profile: <ProfileScreen user={user} onNavigate={setCurrentScreen} />,
        settings: (
            <SettingsScreen
                user={user}
                onNavigate={setCurrentScreen}
                onDisconnect={handleDisconnect}
            />
        ),
        ai: (
            <AITripAdvisorScreenComponent
                user={user}
                onNavigate={setCurrentScreen}
            />
        ),
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <button
                                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <div className="flex items-center space-x-2 ml-2 md:ml-0">
                                <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-semibold text-rose-500">
                                    voyageai
                                </span>
                            </div>
                        </div>

                        {/* Search Bar - Desktop */}
                        <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-8">
                            <div className="w-full">
                                <div className="flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow bg-white">
                                    <div className="flex-1 px-6 py-3">
                                        <input
                                            type="text"
                                            placeholder="Where do you want to go?"
                                            className="w-full border-none focus:outline-none text-sm"
                                        />
                                    </div>
                                    <div className="border-l border-gray-300 px-6 py-3 min-w-0">
                                        <span className="text-sm text-gray-600 whitespace-nowrap">
                                            Add dates
                                        </span>
                                    </div>
                                    <div className="border-l border-gray-300 px-6 py-3 min-w-0">
                                        <span className="text-sm text-gray-600 whitespace-nowrap">
                                            Add travelers
                                        </span>
                                    </div>
                                    <button className="bg-rose-500 text-white p-3 rounded-full mr-2 hover:bg-rose-600 transition-colors flex-shrink-0">
                                        <Search className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center space-x-4">
                            {/* Wallet Connection */}
                            <div className="hidden sm:flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                                <Wallet className="w-4 h-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">
                                    {user.balance}
                                </span>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>

                            <Button variant="ghost" size="sm" className="p-2">
                                <Bell className="w-5 h-5 text-gray-600" />
                            </Button>

                            {/* Profile Menu */}
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowProfileMenu(!showProfileMenu)
                                    }
                                    className="flex items-center space-x-3 border border-gray-300 rounded-full p-1 hover:shadow-md transition-shadow"
                                >
                                    <Menu className="w-4 h-4 text-gray-600 ml-2" />
                                    <Image
                                        src={user.avatar || "/placeholder.svg"}
                                        alt="Profile"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                </button>

                                {/* Profile Dropdown */}
                                {showProfileMenu && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="font-medium text-gray-900">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {user.email}
                                            </p>
                                            <div className="flex items-center space-x-2 mt-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-xs text-gray-600">
                                                    Connected via{" "}
                                                    {user.loginMethod}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setCurrentScreen("profile");
                                                setShowProfileMenu(false);
                                            }}
                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                        >
                                            <User className="w-4 h-4" />
                                            <span>Profile</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                setCurrentScreen("settings");
                                                setShowProfileMenu(false);
                                            }}
                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                        >
                                            <Settings className="w-4 h-4" />
                                            <span>Settings</span>
                                        </button>

                                        <div className="border-t border-gray-100 mt-2 pt-2">
                                            <button
                                                onClick={handleDisconnect}
                                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Disconnect Wallet</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar - Desktop */}
                <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 min-h-screen">
                    <Navigation
                        currentScreen={currentScreen}
                        onNavigate={setCurrentScreen}
                    />
                </aside>

                {/* Mobile Sidebar */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <div className="fixed left-0 top-0 w-64 h-full bg-white">
                            <div className="flex items-center justify-between p-4 border-b">
                                <span className="text-lg font-semibold">
                                    Menu
                                </span>
                                <button onClick={() => setSidebarOpen(false)}>
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <Navigation
                                currentScreen={currentScreen}
                                onNavigate={setCurrentScreen}
                            />
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 min-h-screen">
                    {screens[currentScreen]}
                </main>
            </div>
            {/* AI Chat Modal */}
            {showAIChat && (
                <AIChatModalComponent
                    isOpen={showAIChat}
                    onClose={() => setShowAIChat(false)}
                    context={currentAIContext}
                    user={user}
                />
            )}
        </div>
    );
}

function OnboardingScreen({ onLogin, isLoading }) {
    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome to VoyageAI
                    </h1>
                    <p className="text-gray-600">
                        Plan trips and save together with friends using AI
                    </p>
                </div>

                <Card className="border-0 shadow-sm">
                    <div className="p-8">
                        <div className="space-y-4">
                            <Button
                                onClick={() => onLogin("google")}
                                className="w-full h-12 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-3"
                            >
                                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    G
                                </div>
                                <span>Continue with Google</span>
                            </Button>

                            <Button
                                onClick={() => onLogin("twitter")}
                                className="w-full h-12 bg-black text-white hover:bg-gray-800 flex items-center justify-center space-x-3"
                            >
                                <div className="w-5 h-5 bg-blue-400 rounded text-white flex items-center justify-center text-xs font-bold">
                                    𝕏
                                </div>
                                <span>Continue with X (Twitter)</span>
                            </Button>

                            <Button
                                onClick={() => onLogin("discord")}
                                className="w-full h-12 bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center space-x-3"
                            >
                                <div className="w-5 h-5 bg-white rounded text-indigo-600 flex items-center justify-center text-xs font-bold">
                                    D
                                </div>
                                <span>Continue with Discord</span>
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        or
                                    </span>
                                </div>
                            </div>

                            <Button
                                onClick={() => onLogin("email")}
                                className="w-full h-12 bg-rose-500 text-white hover:bg-rose-600"
                            >
                                <Mail className="w-4 h-4 mr-2" />
                                Continue with Email
                            </Button>

                            <Button
                                onClick={() => onLogin("wallet")}
                                variant="outline"
                                className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                <Wallet className="w-4 h-4 mr-2" />
                                Connect Wallet
                            </Button>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-start space-x-2">
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs">
                                        ✓
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-blue-900">
                                        Powered by Cartridge
                                    </p>
                                    <p className="text-xs text-blue-700 mt-1">
                                        Seamless Web3 experience with account
                                        abstraction. No seed phrases or gas fees
                                        to worry about.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500 text-center mt-6">
                            By continuing, you agree to our Terms of Service and
                            Privacy Policy
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function LoadingScreen() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center space-y-6">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-rose-200 rounded-full animate-spin border-t-rose-500 mx-auto"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Globe className="w-8 h-8 text-rose-500" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Setting up your account...
                    </h3>
                    <p className="text-gray-600 text-sm">
                        Creating your smart wallet with Cartridge ✨
                    </p>
                </div>
            </div>
        </div>
    );
}

function Navigation({ currentScreen, onNavigate }) {
    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "explore", label: "Explore", icon: Search },
        { id: "trips", label: "My Trips", icon: MapPin },
        { id: "savings", label: "Savings Pools", icon: PiggyBank },
        { id: "ai", label: "AI Trip Advisor", icon: MessageCircle },
        { id: "profile", label: "Profile", icon: User },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <nav className="w-full p-4">
            <div className="space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentScreen === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                                isActive
                                    ? "bg-rose-50 text-rose-600 font-medium"
                                    : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            <Icon
                                className={`w-5 h-5 ${
                                    isActive ? "text-rose-600" : "text-gray-500"
                                }`}
                            />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

function PaymentModal({ isOpen, onClose, poolName, onPaymentComplete }) {
    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("strk");
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            onPaymentComplete(amount, paymentMethod);
            onClose();
            setAmount("");
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Money to {poolName}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="number"
                                placeholder="100"
                                className="pl-10 h-12 text-lg"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Payment Method
                        </label>
                        <div className="space-y-3">
                            <div
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                    paymentMethod === "strk"
                                        ? "border-rose-500 bg-rose-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                                onClick={() => setPaymentMethod("strk")}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">
                                                S
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                STRK Token
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Balance: 2,450 STRK
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 ${
                                            paymentMethod === "strk"
                                                ? "border-rose-500 bg-rose-500"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        {paymentMethod === "strk" && (
                                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                    paymentMethod === "eth"
                                        ? "border-rose-500 bg-rose-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                                onClick={() => setPaymentMethod("eth")}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">
                                                Ξ
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                Ethereum
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Balance: 0.85 ETH
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 ${
                                            paymentMethod === "eth"
                                                ? "border-rose-500 bg-rose-500"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        {paymentMethod === "eth" && (
                                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-medium">
                                ${amount || "0"}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-600">Network fee:</span>
                            <span className="font-medium text-green-600">
                                $0 (Sponsored)
                            </span>
                        </div>
                        <div className="border-t border-gray-200 mt-2 pt-2">
                            <div className="flex justify-between">
                                <span className="font-medium">Total:</span>
                                <span className="font-semibold">
                                    ${amount || "0"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handlePayment}
                            disabled={!amount || isProcessing}
                            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                        >
                            {isProcessing ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Payment
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function InviteFriendsModal({ isOpen, onClose, tripName }) {
    const [inviteMethod, setInviteMethod] = useState("email");
    const [inviteValue, setInviteValue] = useState("");
    const [copiedLink, setCopiedLink] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(
            "https://voyageai.app/invite/tokyo-trip-abc123"
        );
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Invite Friends to {tripName}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            How would you like to invite friends?
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            <Button
                                variant={
                                    inviteMethod === "email"
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => setInviteMethod("email")}
                                className={
                                    inviteMethod === "email"
                                        ? "bg-rose-500 hover:bg-rose-600"
                                        : ""
                                }
                            >
                                <Mail className="w-4 h-4 mr-1" />
                                Email
                            </Button>
                            <Button
                                variant={
                                    inviteMethod === "wallet"
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => setInviteMethod("wallet")}
                                className={
                                    inviteMethod === "wallet"
                                        ? "bg-rose-500 hover:bg-rose-600"
                                        : ""
                                }
                            >
                                <Wallet className="w-4 h-4 mr-1" />
                                Wallet
                            </Button>
                            <Button
                                variant={
                                    inviteMethod === "social"
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => setInviteMethod("social")}
                                className={
                                    inviteMethod === "social"
                                        ? "bg-rose-500 hover:bg-rose-600"
                                        : ""
                                }
                            >
                                <Users className="w-4 h-4 mr-1" />
                                Social
                            </Button>
                        </div>
                    </div>

                    {inviteMethod === "email" && (
                        <div className="flex space-x-2">
                            <Input
                                type="email"
                                placeholder="friend@example.com"
                                className="flex-1 h-12"
                                value={inviteValue}
                                onChange={(e) => setInviteValue(e.target.value)}
                            />
                            <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                                Invite
                            </Button>
                        </div>
                    )}

                    {inviteMethod === "wallet" && (
                        <div className="flex space-x-2">
                            <Input
                                type="text"
                                placeholder="0x742d35Cc6Cc445C228532c8f3a"
                                className="flex-1 h-12 font-mono text-sm"
                                value={inviteValue}
                                onChange={(e) => setInviteValue(e.target.value)}
                            />
                            <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                                Invite
                            </Button>
                        </div>
                    )}

                    {inviteMethod === "social" && (
                        <div className="space-y-3">
                            <div className="flex space-x-2">
                                <Input
                                    type="text"
                                    placeholder="@username or social handle"
                                    className="flex-1 h-12"
                                    value={inviteValue}
                                    onChange={(e) =>
                                        setInviteValue(e.target.value)
                                    }
                                />
                                <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                                    Invite
                                </Button>
                            </div>
                        </div>
                    )}

                    <div>
                        <p className="text-sm text-gray-600 mb-2">
                            Or share trip link
                        </p>
                        <div className="flex space-x-2">
                            <Input
                                type="text"
                                value="https://voyageai.app/invite/tokyo-trip-abc123"
                                readOnly
                                className="flex-1 h-10 text-sm bg-gray-50"
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCopyLink}
                                className="flex items-center space-x-1"
                            >
                                {copiedLink ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                                <span>{copiedLink ? "Copied" : "Copy"}</span>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                            Share on social media
                        </h4>
                        <div className="flex space-x-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                            >
                                <Facebook className="w-4 h-4 mr-2" />
                                Facebook
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                            >
                                <Twitter className="w-4 h-4 mr-2" />
                                Twitter
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                            >
                                <Instagram className="w-4 h-4 mr-2" />
                                Instagram
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function BookTripModal({ isOpen, onClose, tripName, budget }) {
    const [bookingStep, setBookingStep] = useState(1);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState(null);

    const flights = [
        {
            id: 1,
            airline: "Japan Airlines",
            price: 850,
            departure: "10:30 AM",
            arrival: "2:45 PM",
            duration: "14h 15m",
        },
        {
            id: 2,
            airline: "ANA",
            price: 920,
            departure: "6:15 PM",
            arrival: "10:30 PM",
            duration: "14h 15m",
        },
    ];

    const hotels = [
        {
            id: 1,
            name: "Tokyo Grand Hotel",
            price: 180,
            rating: 4.8,
            location: "Shibuya",
        },
        {
            id: 2,
            name: "Sakura Inn",
            price: 120,
            rating: 4.6,
            location: "Shinjuku",
        },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Book {tripName}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Progress */}
                    <div className="flex space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={`flex-1 h-2 rounded-full ${
                                    i <= bookingStep
                                        ? "bg-rose-500"
                                        : "bg-gray-200"
                                }`}
                            />
                        ))}
                    </div>

                    {bookingStep === 1 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Select Flight
                            </h3>
                            <div className="space-y-4">
                                {flights.map((flight) => (
                                    <div
                                        key={flight.id}
                                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                            selectedFlight?.id === flight.id
                                                ? "border-rose-500 bg-rose-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                        onClick={() =>
                                            setSelectedFlight(flight)
                                        }
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {flight.airline}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {flight.departure} -{" "}
                                                    {flight.arrival}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {flight.duration}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-gray-900">
                                                    ${flight.price}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    per person
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button
                                onClick={() => setBookingStep(2)}
                                disabled={!selectedFlight}
                                className="w-full mt-4 bg-rose-500 hover:bg-rose-600 text-white"
                            >
                                Continue to Hotels
                            </Button>
                        </div>
                    )}

                    {bookingStep === 2 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Select Hotel
                            </h3>
                            <div className="space-y-4">
                                {hotels.map((hotel) => (
                                    <div
                                        key={hotel.id}
                                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                            selectedHotel?.id === hotel.id
                                                ? "border-rose-500 bg-rose-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                        onClick={() => setSelectedHotel(hotel)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {hotel.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {hotel.location}
                                                </p>
                                                <div className="flex items-center space-x-1 mt-1">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    <span className="text-sm text-gray-600">
                                                        {hotel.rating}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-gray-900">
                                                    ${hotel.price}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    per night
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex space-x-3 mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setBookingStep(1)}
                                    className="flex-1"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={() => setBookingStep(3)}
                                    disabled={!selectedHotel}
                                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                                >
                                    Review Booking
                                </Button>
                            </div>
                        </div>
                    )}

                    {bookingStep === 3 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Booking Summary
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium text-gray-900 mb-2">
                                        Flight
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {selectedFlight?.airline}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {selectedFlight?.departure} -{" "}
                                        {selectedFlight?.arrival}
                                    </p>
                                    <p className="font-medium text-gray-900">
                                        ${selectedFlight?.price} per person
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-medium text-gray-900 mb-2">
                                        Hotel
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {selectedHotel?.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {selectedHotel?.location}
                                    </p>
                                    <p className="font-medium text-gray-900">
                                        ${selectedHotel?.price} per night
                                    </p>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total Cost:</span>
                                        <span>
                                            $
                                            {(selectedFlight?.price || 0) +
                                                (selectedHotel?.price || 0) * 7}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Paid from savings pool: ${budget}
                                    </p>
                                </div>
                            </div>

                            <div className="flex space-x-3 mt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => setBookingStep(2)}
                                    className="flex-1"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={() => {
                                        onClose();
                                        setBookingStep(1);
                                    }}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                >
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Confirm Booking
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function ShareTripModal({ isOpen, onClose, tripName }) {
    const [shareText, setShareText] = useState(
        `Just planned an amazing trip to ${tripName} with VoyageAI! 🌍✈️ #VoyageAI #TravelPlanning`
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Share {tripName}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Share message
                        </label>
                        <Textarea
                            value={shareText}
                            onChange={(e) => setShareText(e.target.value)}
                            className="h-20"
                            placeholder="Write something about your trip..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            className="flex items-center justify-center space-x-2"
                        >
                            <Facebook className="w-4 h-4 text-blue-600" />
                            <span>Facebook</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex items-center justify-center space-x-2"
                        >
                            <Twitter className="w-4 h-4 text-blue-400" />
                            <span>Twitter</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex items-center justify-center space-x-2"
                        >
                            <Instagram className="w-4 h-4 text-pink-600" />
                            <span>Instagram</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex items-center justify-center space-x-2"
                        >
                            <MessageCircle className="w-4 h-4 text-green-600" />
                            <span>WhatsApp</span>
                        </Button>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 mb-2">
                            Or copy link
                        </p>
                        <div className="flex space-x-2">
                            <Input
                                type="text"
                                value={`https://voyageai.app/trip/${tripName
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                readOnly
                                className="flex-1 text-sm bg-gray-50"
                            />
                            <Button variant="outline" size="sm">
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function DashboardScreen({ user, onNavigate, onOpenAI }) {
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
                            <Button
                                onClick={() => onNavigate("planning")}
                                className="bg-rose-500 hover:bg-rose-600 text-white"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Create Trip
                            </Button>
                            <Button
                                onClick={() => onNavigate("ai")}
                                variant="outline"
                            >
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
                                                onClick={() =>
                                                    onNavigate("savings")
                                                }
                                                className="flex-1"
                                            >
                                                <PiggyBank className="w-4 h-4 mr-2" />
                                                Add to Savings
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                                                onClick={() => onOpenAI(true)}
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

function ExploreScreen({ onNavigate, onOpenAI }) {
    const destinations = [
        {
            id: 1,
            name: "Tokyo, Japan",
            image: "/placeholder.svg?height=300&width=400&text=Tokyo+Skyline",
            rating: 4.9,
            reviews: 1234,
            avgCost: "$2,500",
            description:
                "Experience the perfect blend of traditional and modern culture",
        },
        {
            id: 2,
            name: "Barcelona, Spain",
            image: "/placeholder.svg?height=300&width=400&text=Barcelona+Architecture",
            rating: 4.8,
            reviews: 987,
            avgCost: "$1,800",
            description:
                "Stunning architecture, vibrant nightlife, and Mediterranean charm",
        },
        {
            id: 3,
            name: "Bali, Indonesia",
            image: "/placeholder.svg?height=300&width=400&text=Bali+Beach",
            rating: 4.7,
            reviews: 2156,
            avgCost: "$1,200",
            description:
                "Tropical paradise with beautiful beaches and rich culture",
        },
        {
            id: 4,
            name: "Paris, France",
            image: "/placeholder.svg?height=300&width=400&text=Paris+Eiffel+Tower",
            rating: 4.9,
            reviews: 3421,
            avgCost: "$2,200",
            description: "The city of love, art, and incredible cuisine",
        },
        {
            id: 5,
            name: "New York, USA",
            image: "/placeholder.svg?height=300&width=400&text=NYC+Skyline",
            rating: 4.8,
            reviews: 2890,
            avgCost: "$2,800",
            description:
                "The city that never sleeps, full of energy and opportunities",
        },
        {
            id: 6,
            name: "Dubai, UAE",
            image: "/placeholder.svg?height=300&width=400&text=Dubai+Burj+Khalifa",
            rating: 4.6,
            reviews: 1567,
            avgCost: "$3,200",
            description:
                "Luxury shopping, ultramodern architecture, and desert adventures",
        },
        {
            id: 7,
            name: "London, UK",
            image: "/placeholder.svg?height=300&width=400&text=London+Big+Ben",
            rating: 4.7,
            reviews: 2234,
            avgCost: "$2,400",
            description: "Rich history, royal palaces, and world-class museums",
        },
        {
            id: 8,
            name: "Rome, Italy",
            image: "/placeholder.svg?height=300&width=400&text=Rome+Colosseum",
            rating: 4.8,
            reviews: 1876,
            avgCost: "$1,900",
            description:
                "Ancient history, incredible food, and timeless architecture",
        },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Explore Destinations
                </h1>
                <p className="text-gray-600">
                    Discover amazing places to visit with your friends
                </p>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mb-8">
                <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                </Button>
                <div className="flex space-x-2">
                    <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-gray-200"
                    >
                        Beach
                    </Badge>
                    <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-gray-200"
                    >
                        City
                    </Badge>
                    <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-gray-200"
                    >
                        Adventure
                    </Badge>
                    <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-gray-200"
                    >
                        Culture
                    </Badge>
                </div>
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {destinations.map((destination) => (
                    <Card
                        key={destination.id}
                        className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="relative h-48">
                            <Image
                                src={destination.image || "/placeholder.svg"}
                                alt={destination.name}
                                fill
                                className="object-cover"
                            />
                            <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md">
                                <Heart className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-900">
                                    {destination.name}
                                </h3>
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm font-medium text-gray-900">
                                        {destination.rating}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                                {destination.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                    {destination.reviews} reviews
                                </span>
                                <span className="font-semibold text-gray-900">
                                    {destination.avgCost}
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                                    onClick={() => onNavigate("planning")}
                                >
                                    Plan Trip
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onNavigate("ai")}
                                >
                                    <MessageCircle className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function TripsScreen({ onNavigate, onOpenAI }) {
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
                <Button
                    onClick={() => onNavigate("planning")}
                    className="bg-rose-500 hover:bg-rose-600 text-white"
                >
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

function SavingsScreen({ onNavigate, onOpenAI }) {
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
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onOpenAI(true)}
                                >
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

function TripPlanningScreen({ onNavigate, onOpenAI }) {
    const [step, setStep] = useState(1);
    const [tripData, setTripData] = useState({
        destination: "",
        startDate: "",
        endDate: "",
        budget: "",
        collaborators: [],
    });
    const [inviteMethod, setInviteMethod] = useState("email");
    const [inviteValue, setInviteValue] = useState("");
    const [copiedLink, setCopiedLink] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(
            "https://voyageai.app/invite/tokyo-trip-abc123"
        );
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                    <button
                        onClick={() => onNavigate("dashboard")}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        ← Back
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Plan New Trip
                    </h1>
                </div>
                <div className="flex space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={`flex-1 h-2 rounded-full ${
                                i <= step ? "bg-rose-500" : "bg-gray-200"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {step === 1 && (
                <Card className="border-0 shadow-sm">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Where do you want to go?
                            </h2>
                            <p className="text-gray-600">
                                Tell us about your dream destination
                            </p>
                        </div>

                        <div className="space-y-6 max-w-md mx-auto">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Destination
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="e.g., Tokyo, Japan"
                                        className="pl-10 h-12"
                                        value={tripData.destination}
                                        onChange={(e) =>
                                            setTripData({
                                                ...tripData,
                                                destination: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Start Date
                                    </label>
                                    <Input
                                        type="date"
                                        className="h-12"
                                        value={tripData.startDate}
                                        onChange={(e) =>
                                            setTripData({
                                                ...tripData,
                                                startDate: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        End Date
                                    </label>
                                    <Input
                                        type="date"
                                        className="h-12"
                                        value={tripData.endDate}
                                        onChange={(e) =>
                                            setTripData({
                                                ...tripData,
                                                endDate: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Budget per person
                                </label>
                                <Input
                                    type="number"
                                    placeholder="2000"
                                    className="h-12"
                                    value={tripData.budget}
                                    onChange={(e) =>
                                        setTripData({
                                            ...tripData,
                                            budget: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <Button
                                onClick={() => setStep(2)}
                                disabled={
                                    !tripData.destination ||
                                    !tripData.startDate ||
                                    !tripData.endDate
                                }
                                className="w-full h-12 bg-rose-500 hover:bg-rose-600 text-white"
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {step === 2 && (
                <Card className="border-0 shadow-sm">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Invite your travel buddies
                            </h2>
                            <p className="text-gray-600">
                                Add friends to plan and save together
                            </p>
                        </div>

                        <div className="max-w-md mx-auto space-y-6">
                            {/* Invite Method Selector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    How would you like to invite friends?
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    <Button
                                        variant={
                                            inviteMethod === "email"
                                                ? "default"
                                                : "outline"
                                        }
                                        size="sm"
                                        onClick={() => setInviteMethod("email")}
                                        className={
                                            inviteMethod === "email"
                                                ? "bg-rose-500 hover:bg-rose-600"
                                                : ""
                                        }
                                    >
                                        <Mail className="w-4 h-4 mr-1" />
                                        Email
                                    </Button>
                                    <Button
                                        variant={
                                            inviteMethod === "wallet"
                                                ? "default"
                                                : "outline"
                                        }
                                        size="sm"
                                        onClick={() =>
                                            setInviteMethod("wallet")
                                        }
                                        className={
                                            inviteMethod === "wallet"
                                                ? "bg-rose-500 hover:bg-rose-600"
                                                : ""
                                        }
                                    >
                                        <Wallet className="w-4 h-4 mr-1" />
                                        Wallet
                                    </Button>
                                    <Button
                                        variant={
                                            inviteMethod === "social"
                                                ? "default"
                                                : "outline"
                                        }
                                        size="sm"
                                        onClick={() =>
                                            setInviteMethod("social")
                                        }
                                        className={
                                            inviteMethod === "social"
                                                ? "bg-rose-500 hover:bg-rose-600"
                                                : ""
                                        }
                                    >
                                        <Users className="w-4 h-4 mr-1" />
                                        Social
                                    </Button>
                                </div>
                            </div>

                            {/* Invite Input */}
                            <div>
                                {inviteMethod === "email" && (
                                    <div className="flex space-x-2">
                                        <Input
                                            type="email"
                                            placeholder="friend@example.com"
                                            className="flex-1 h-12"
                                            value={inviteValue}
                                            onChange={(e) =>
                                                setInviteValue(e.target.value)
                                            }
                                        />
                                        <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                                            Invite
                                        </Button>
                                    </div>
                                )}

                                {inviteMethod === "wallet" && (
                                    <div className="flex space-x-2">
                                        <Input
                                            type="text"
                                            placeholder="0x742d35Cc6Cc445C228532c8f3a"
                                            className="flex-1 h-12 font-mono text-sm"
                                            value={inviteValue}
                                            onChange={(e) =>
                                                setInviteValue(e.target.value)
                                            }
                                        />
                                        <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                                            Invite
                                        </Button>
                                    </div>
                                )}

                                {inviteMethod === "social" && (
                                    <div className="space-y-3">
                                        <div className="flex space-x-2">
                                            <Input
                                                type="text"
                                                placeholder="@username or social handle"
                                                className="flex-1 h-12"
                                                value={inviteValue}
                                                onChange={(e) =>
                                                    setInviteValue(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                                                Invite
                                            </Button>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-gray-600 mb-2">
                                                Or share trip link
                                            </p>
                                            <div className="flex space-x-2">
                                                <Input
                                                    type="text"
                                                    value="https://voyageai.app/invite/tokyo-trip-abc123"
                                                    readOnly
                                                    className="flex-1 h-10 text-sm bg-gray-50"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleCopyLink}
                                                    className="flex items-center space-x-1"
                                                >
                                                    {copiedLink ? (
                                                        <Check className="w-4 h-4" />
                                                    ) : (
                                                        <Copy className="w-4 h-4" />
                                                    )}
                                                    <span>
                                                        {copiedLink
                                                            ? "Copied"
                                                            : "Copy"}
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Suggested Friends */}
                            <div>
                                <h3 className="font-medium text-gray-900 mb-3">
                                    Suggested friends
                                </h3>
                                <div className="space-y-2">
                                    {[
                                        {
                                            name: "Mike Johnson",
                                            handle: "@mikej",
                                            type: "social",
                                        },
                                        {
                                            name: "Sarah Kim",
                                            handle: "sarah@gmail.com",
                                            type: "email",
                                        },
                                        {
                                            name: "Emma Wilson",
                                            handle: "0x8f3a...2d74",
                                            type: "wallet",
                                        },
                                    ].map((friend, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                                <div>
                                                    <span className="font-medium text-gray-900 block">
                                                        {friend.name}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {friend.handle}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button size="sm" variant="outline">
                                                Invite
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep(1)}
                                    className="flex-1"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={() => setStep(3)}
                                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {step === 3 && (
                <Card className="border-0 shadow-sm">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Set up savings pool
                            </h2>
                            <p className="text-gray-600">
                                Create a shared savings goal for your trip
                            </p>
                        </div>

                        <div className="max-w-md mx-auto space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total trip budget
                                </label>
                                <Input
                                    type="number"
                                    placeholder="5000"
                                    className="h-12"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    This will be split among all travelers
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Savings deadline
                                </label>
                                <Input type="date" className="h-12" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your initial contribution
                                </label>
                                <Input
                                    type="number"
                                    placeholder="500"
                                    className="h-12"
                                />
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">
                                    Pool Summary
                                </h4>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Total goal:</span>
                                        <span>$5,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Per person:</span>
                                        <span>$1,667</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Your contribution:</span>
                                        <span>$500</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep(2)}
                                    className="flex-1"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={() => onNavigate("savings")}
                                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
                                >
                                    Create Pool
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}

function ProfileScreen({ user, onNavigate }) {
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

function SettingsScreen({ user, onNavigate, onDisconnect }) {
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
                                    onClick={onDisconnect}
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

function AITripAdvisorScreen({ user, onNavigate }) {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    AI Trip Advisor
                </h1>
                <p className="text-gray-600">
                    Get personalized trip recommendations and advice from our AI
                    assistant
                </p>
            </div>

            <Card className="border-0 shadow-sm">
                <div className="p-6">
                    <p>This is the AI Trip Advisor Screen</p>
                </div>
            </Card>
        </div>
    );
}

function AIChatModal({ isOpen, onClose, context, user }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSendMessage = () => {
        if (message.trim() === "") return;

        // Add user message to the chat
        setMessages([...messages, { text: message, sender: "user" }]);

        // Simulate AI response
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: `AI Response: ${message}`, sender: "ai" },
            ]);
        }, 1000);

        // Clear input
        setMessage("");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md h-[75vh]">
                <DialogHeader>
                    <DialogTitle>AI Trip Advisor</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col h-full">
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-2 p-3 rounded-lg ${
                                    msg.sender === "user"
                                        ? "bg-blue-100 text-blue-800 ml-auto"
                                        : "bg-gray-100 text-gray-800 mr-auto"
                                }`}
                                style={{ maxWidth: "80%" }}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex space-x-3">
                            <Input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-1 h-12"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <Button
                                onClick={handleSendMessage}
                                className="bg-rose-500 hover:bg-rose-600 text-white"
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
