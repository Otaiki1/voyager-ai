"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Wallet, Users, Check, Copy } from "lucide-react";

export default function PlanningPage() {
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
            {/* Progress and steps UI as in TripPlanningScreen */}
            {/* ...rest of TripPlanningScreen code... */}
        </div>
    );
}
