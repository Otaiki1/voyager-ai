"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Heart, Star, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function ExplorePage() {
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
        // ... (other destinations as in original code)
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
            {/* ...rest of ExploreScreen code... */}
        </div>
    );
}
