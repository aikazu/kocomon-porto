"use client";

import React from "react";
import { DashboardCard } from "./dashboard-card";
import {
    IconClock,
    IconTarget,
    IconFocus2,
    IconCertificate,
    IconActivity
} from "@tabler/icons-react";

const metrics = [
    {
        icon: IconClock,
        label: "Experience",
        value: "10+",
        unit: "Years",
        color: "#00ff41"
    },
    {
        icon: IconTarget,
        label: "Status",
        value: "Seeking",
        unit: "Opportunities",
        color: "#00d4ff"
    },
    {
        icon: IconFocus2,
        label: "Focus",
        value: "3",
        unit: "Core Areas",
        color: "#22c55e"
    },
    {
        icon: IconCertificate,
        label: "Top Cert",
        value: "Security+",
        unit: "Valid: 2027",
        color: "#f59e0b"
    }
];

const focusAreas = [
    "Solution Architecture",
    "Cybersecurity",
    "Linux Administration"
];

export function MetricsWidget() {
    return (
        <DashboardCard title="Core Metrics" icon={<IconActivity size={18} />}>
            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-[#00ff41]/30 transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <metric.icon size={16} style={{ color: metric.color }} />
                                <span className="text-xs text-slate-500 uppercase tracking-wider">{metric.label}</span>
                            </div>
                            <div className="text-xl font-bold text-white terminal-text" style={{ color: metric.color }}>
                                {metric.value}
                            </div>
                            <div className="text-xs text-slate-400">{metric.unit}</div>
                        </div>
                    ))}
                </div>

                {/* Focus Areas */}
                <div className="pt-3 border-t border-slate-800">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Focus Areas</p>
                    <div className="flex flex-wrap gap-2">
                        {focusAreas.map((area) => (
                            <span key={area} className="cyber-badge">
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
}
