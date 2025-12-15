"use client";

import React from "react";
import { DashboardCard } from "./dashboard-card";
import {
    IconClock,
    IconTarget,
    IconFocus2,
    IconCertificate,
    IconActivity,
    IconTrendingUp
} from "@tabler/icons-react";

const metrics = [
    {
        icon: IconClock,
        label: "Experience",
        value: "10+",
        unit: "Years",
        gradient: "from-cyan-500 to-blue-500",
        glow: "group-hover:shadow-cyan-500/20"
    },
    {
        icon: IconTarget,
        label: "Status",
        value: "Seeking",
        unit: "Opportunities",
        gradient: "from-purple-500 to-pink-500",
        glow: "group-hover:shadow-purple-500/20"
    },
    {
        icon: IconFocus2,
        label: "Focus",
        value: "3",
        unit: "Core Areas",
        gradient: "from-emerald-500 to-teal-500",
        glow: "group-hover:shadow-emerald-500/20"
    },
    {
        icon: IconCertificate,
        label: "Top Cert",
        value: "Security+",
        unit: "Valid: 2027",
        gradient: "from-orange-500 to-amber-500",
        glow: "group-hover:shadow-orange-500/20"
    }
];

const focusAreas = [
    { name: "Solution Architecture", icon: IconTrendingUp },
    { name: "Cybersecurity", icon: IconTarget },
    { name: "Linux Administration", icon: IconFocus2 }
];

export function MetricsWidget() {
    return (
        <DashboardCard title="Core Metrics" icon={<IconActivity size={18} />}>
            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className={`p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 group hover:bg-white/[0.07] cursor-default shadow-lg ${metric.glow}`}
                        >
                            <div className="flex items-start gap-3">
                                {/* Icon with gradient background */}
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.gradient} opacity-90`}>
                                    <metric.icon size={18} className="text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider block mb-0.5">
                                        {metric.label}
                                    </span>
                                    <div className="text-xl font-bold text-white terminal-text">
                                        {metric.value}
                                    </div>
                                    <div className="text-xs text-slate-400">{metric.unit}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Focus Areas */}
                <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        Focus Areas
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {focusAreas.map((area) => (
                            <span
                                key={area.name}
                                className="cyber-badge flex items-center gap-1.5"
                            >
                                <area.icon size={12} />
                                {area.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
}
