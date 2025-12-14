"use client";

import React from "react";
import { DashboardCard } from "./dashboard-card";
import { IconCode } from "@tabler/icons-react";

const skillCategories = [
    {
        name: "Cybersecurity",
        skills: [
            { name: "Penetration Testing (VAPT)", level: 90 },
            { name: "Vulnerability Assessment", level: 88 },
            { name: "ISO 27001/19011 Compliance", level: 85 },
            { name: "Server Hardening", level: 92 },
            { name: "Risk Assessment", level: 87 }
        ]
    },
    {
        name: "Infrastructure",
        skills: [
            { name: "Linux System Admin", level: 95 },
            { name: "Windows Server", level: 80 },
            { name: "Network Security", level: 88 },
            { name: "Cloud Security", level: 82 },
            { name: "Disaster Recovery", level: 85 }
        ]
    },
    {
        name: "Dev/Architecture",
        skills: [
            { name: "Solution Architecture", level: 90 },
            { name: "API Integration", level: 85 },
            { name: "DevSecOps", level: 78 },
            { name: "Python/Bash Scripting", level: 88 }
        ]
    }
];

function ProgressBar({ value, label }: { value: number; label: string }) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-xs">
                <span className="text-slate-400">{label}</span>
                <span className="text-[#00ff41] terminal-text">{value}%</span>
            </div>
            <div className="cyber-progress h-1.5">
                <div
                    className="cyber-progress-bar h-full"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

export function SkillMatrix() {
    return (
        <DashboardCard title="Skill Matrix" icon={<IconCode size={18} />}>
            <div className="space-y-5">
                {skillCategories.map((category) => (
                    <div key={category.name}>
                        <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#00ff41] rounded-full" />
                            {category.name}
                        </h4>
                        <div className="space-y-2">
                            {category.skills.map((skill) => (
                                <ProgressBar
                                    key={skill.name}
                                    value={skill.level}
                                    label={skill.name}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
}
