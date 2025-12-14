"use client";

import React from "react";

interface StatusIndicatorProps {
    status?: "online" | "offline" | "busy";
    label?: string;
    size?: "sm" | "md" | "lg";
}

export function StatusIndicator({
    status = "online",
    label = "System Operational",
    size = "md"
}: StatusIndicatorProps) {
    const sizeClasses = {
        sm: "w-2 h-2",
        md: "w-3 h-3",
        lg: "w-4 h-4"
    };

    const textSizes = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base"
    };

    const statusColors = {
        online: "bg-[#00ff41]",
        offline: "bg-red-500",
        busy: "bg-yellow-500"
    };

    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <div
                    className={`${sizeClasses[size]} ${statusColors[status]} rounded-full pulse-status`}
                />
                <div
                    className={`absolute inset-0 ${sizeClasses[size]} ${statusColors[status]} rounded-full animate-ping opacity-75`}
                />
            </div>
            <span className={`${textSizes[size]} terminal-text text-[#00ff41] font-medium`}>
                {label}
            </span>
        </div>
    );
}
