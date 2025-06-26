"use client";

import { Card } from "@/components/ui/card";

export default function AIPage() {
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
