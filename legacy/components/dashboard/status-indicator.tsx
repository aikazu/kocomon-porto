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
        md: "w-2.5 h-2.5",
        lg: "w-3 h-3"
    };

    const textSizes = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base"
    };

    const statusConfig = {
        online: {
            color: "bg-emerald-400",
            text: "text-emerald-400",
            glow: "shadow-emerald-500/50"
        },
        offline: {
            color: "bg-red-400",
            text: "text-red-400",
            glow: "shadow-red-500/50"
        },
        busy: {
            color: "bg-amber-400",
            text: "text-amber-400",
            glow: "shadow-amber-500/50"
        }
    };

    const config = statusConfig[status];

    return (
        <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
                <div
                    className={`${sizeClasses[size]} ${config.color} rounded-full shadow-lg ${config.glow} pulse-status`}
                />
                <div
                    className={`absolute ${sizeClasses[size]} ${config.color} rounded-full animate-ping opacity-40`}
                />
            </div>
            <span className={`${textSizes[size]} terminal-text ${config.text} font-medium`}>
                {label}
            </span>
        </div>
    );
}
