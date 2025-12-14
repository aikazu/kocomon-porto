"use client";

import React from "react";
import { DashboardCard } from "./dashboard-card";
import { IconHistory, IconTerminal } from "@tabler/icons-react";

const experiences = [
    {
        title: "Solution Architect",
        company: "PT Global Infotech Solution",
        period: "June 2021 - Aug 2025",
        timestamp: "[2021.06 - 2025.08]",
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
        highlights: [
            "Managed diverse IT functions: development, infrastructure support, and analysis"
        ]
    }
];

export function ExperienceLog() {
    return (
        <DashboardCard title="Experience Log" icon={<IconHistory size={18} />}>
            <div className="space-y-1">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 text-xs text-slate-500 terminal-text mb-3 pb-2 border-b border-slate-800">
                    <IconTerminal size={14} />
                    <span>audit_trail.log</span>
                    <span className="ml-auto">{experiences.length} entries</span>
                </div>

                {/* Log Entries */}
                <div className="space-y-4 overflow-y-auto pr-2 max-h-[280px] scrollbar-thin scrollbar-thumb-emerald-900 scrollbar-track-emerald-950">
                    {experiences.map((exp, index) => (
                        <div key={index} className="relative pl-4 border-l-2 border-[#00ff41]/30 hover:border-[#00ff41] transition-colors">
                            {/* Timeline dot */}
                            <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[#00ff41]" />

                            <div className="space-y-2">
                                {/* Timestamp */}
                                <div className="text-xs terminal-text text-[#00ff41]/70">
                                    {exp.timestamp}
                                </div>

                                {/* Title and Company */}
                                <div>
                                    <h4 className="text-sm font-semibold text-white">
                                        {exp.title}
                                    </h4>
                                    <p className="text-xs text-slate-400">@ {exp.company}</p>
                                </div>

                                {/* Highlights */}
                                <ul className="space-y-1">
                                    {exp.highlights.map((highlight, hIndex) => (
                                        <li key={hIndex} className="text-xs text-slate-400 flex items-start gap-2">
                                            <span className="text-[#00ff41] mt-0.5">›</span>
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardCard>
    );
}
