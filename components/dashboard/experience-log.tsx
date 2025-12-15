"use client";

import React from "react";
import { DashboardCard } from "./dashboard-card";
import { IconHistory, IconTerminal, IconBriefcase } from "@tabler/icons-react";

const experiences = [
    {
        title: "Solution Architect",
        company: "PT Global Infotech Solution",
        period: "June 2021 - Aug 2025",
        timestamp: "[2021.06 - 2025.08]",
        color: "cyan",
        highlights: [
            "Led cybersecurity solution architecture for 10+ enterprise clients (Banking, Healthcare)",
            "Managed end-to-end product lifecycle for 10+ solutions",
            "Orchestrated complex system integrations and server infrastructure"
        ]
    },
    {
        title: "IT Consultant",
        company: "Bhinneka Inti Global Data",
        period: "Feb 2020 - July 2020",
        timestamp: "[2020.02 - 2020.07]",
        color: "purple",
        highlights: [
            "Facilitated 5+ enterprise clients in achieving ISO 27001 certification",
            "Conducted comprehensive VAPT and provided mitigation strategies"
        ]
    },
    {
        title: "Senior IT Officer",
        company: "Danakoo Mitra Artha (Fintech)",
        period: "July 2019 - Jan 2020",
        timestamp: "[2019.07 - 2020.01]",
        color: "pink",
        highlights: [
            "Maintained 99.9% uptime for digital payment platform",
            "Implemented robust security hardening for financial data servers"
        ]
    },
    {
        title: "IT Specialist",
        company: "Teknologi Adhikarya Prima",
        period: "Aug 2016 - July 2019",
        timestamp: "[2016.08 - 2019.07]",
        color: "emerald",
        highlights: [
            "Managed diverse IT functions: development, infrastructure support, and analysis"
        ]
    }
];

const colorMap = {
    cyan: {
        dot: "bg-cyan-400",
        line: "border-cyan-500/30 hover:border-cyan-400",
        text: "text-cyan-400",
        bg: "bg-cyan-500/10"
    },
    purple: {
        dot: "bg-purple-400",
        line: "border-purple-500/30 hover:border-purple-400",
        text: "text-purple-400",
        bg: "bg-purple-500/10"
    },
    pink: {
        dot: "bg-pink-400",
        line: "border-pink-500/30 hover:border-pink-400",
        text: "text-pink-400",
        bg: "bg-pink-500/10"
    },
    emerald: {
        dot: "bg-emerald-400",
        line: "border-emerald-500/30 hover:border-emerald-400",
        text: "text-emerald-400",
        bg: "bg-emerald-500/10"
    }
};

export function ExperienceLog() {
    return (
        <DashboardCard title="Experience Log" icon={<IconHistory size={18} />}>
            <div className="space-y-1">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 text-xs text-slate-500 terminal-text mb-4 pb-3 border-b border-white/10">
                    <IconTerminal size={14} className="text-cyan-400" />
                    <span className="text-slate-400">audit_trail.log</span>
                    <span className="ml-auto px-2 py-0.5 rounded bg-white/5 text-cyan-400">{experiences.length} entries</span>
                </div>

                {/* Log Entries */}
                <div className="space-y-4 overflow-y-auto pr-2 max-h-[280px]">
                    {experiences.map((exp, index) => {
                        const colors = colorMap[exp.color as keyof typeof colorMap];

                        return (
                            <div
                                key={index}
                                className={`relative pl-5 border-l-2 ${colors.line} transition-colors group`}
                            >
                                {/* Timeline dot */}
                                <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full ${colors.dot} shadow-lg ring-2 ring-slate-900`} />

                                <div className="space-y-2">
                                    {/* Timestamp */}
                                    <div className={`text-xs terminal-text ${colors.text} opacity-70`}>
                                        {exp.timestamp}
                                    </div>

                                    {/* Title and Company */}
                                    <div className="flex items-start gap-2">
                                        <span className={`p-1.5 rounded-md ${colors.bg} mt-0.5`}>
                                            <IconBriefcase size={12} className={colors.text} />
                                        </span>
                                        <div>
                                            <h4 className="text-sm font-semibold text-white group-hover:text-cyan-100 transition-colors">
                                                {exp.title}
                                            </h4>
                                            <p className="text-xs text-slate-400">@ {exp.company}</p>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <ul className="space-y-1.5 pl-1">
                                        {exp.highlights.map((highlight, hIndex) => (
                                            <li key={hIndex} className="text-xs text-slate-400 flex items-start gap-2">
                                                <span className={`${colors.text} mt-1 text-[10px]`}>▹</span>
                                                <span className="leading-relaxed">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </DashboardCard>
    );
}
