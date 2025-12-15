"use client";

import React from "react";
import { DashboardCard } from "./dashboard-card";
import { IconCode, IconShieldCheck, IconServer, IconTerminal2 } from "@tabler/icons-react";

const skillCategories = [
    {
        name: "Cybersecurity",
        icon: IconShieldCheck,
        color: "cyan",
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
        icon: IconServer,
        color: "purple",
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
        icon: IconTerminal2,
        color: "pink",
        skills: [
            { name: "Solution Architecture", level: 90 },
            { name: "API Integration", level: 85 },
            { name: "DevSecOps", level: 78 },
            { name: "Python/Bash Scripting", level: 88 }
        ]
    }
];

const colorMap = {
    cyan: {
        dot: "bg-cyan-400",
        text: "text-cyan-400",
        bar: "from-cyan-400 to-cyan-600",
        glow: "shadow-cyan-500/30"
    },
    purple: {
        dot: "bg-purple-400",
        text: "text-purple-400",
        bar: "from-purple-400 to-purple-600",
        glow: "shadow-purple-500/30"
    },
    pink: {
        dot: "bg-pink-400",
        text: "text-pink-400",
        bar: "from-pink-400 to-pink-600",
        glow: "shadow-pink-500/30"
    }
};

function ProgressBar({ value, label, color }: { value: number; label: string; color: string }) {
    const colors = colorMap[color as keyof typeof colorMap] || colorMap.cyan;

    return (
        <div className="space-y-1.5 group">
            <div className="flex justify-between text-xs">
                <span className="text-slate-400 group-hover:text-slate-300 transition-colors">{label}</span>
                <span className={`${colors.text} terminal-text font-medium`}>{value}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                    className={`h-full rounded-full bg-gradient-to-r ${colors.bar} shadow-lg ${colors.glow} transition-all duration-700 ease-out group-hover:shadow-xl`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

export function SkillMatrix() {
    return (
        <DashboardCard title="Skill Matrix" icon={<IconCode size={18} />}>
            <div className="space-y-6">
                {skillCategories.map((category) => {
                    const colors = colorMap[category.color as keyof typeof colorMap];
                    const CategoryIcon = category.icon;

                    return (
                        <div key={category.name} className="space-y-3">
                            <h4 className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                <span className={`p-1 rounded ${colors.dot}/20`}>
                                    <CategoryIcon size={12} className={colors.text} />
                                </span>
                                <span className={colors.text}>{category.name}</span>
                            </h4>
                            <div className="space-y-3 pl-1">
                                {category.skills.map((skill) => (
                                    <ProgressBar
                                        key={skill.name}
                                        value={skill.level}
                                        label={skill.name}
                                        color={category.color}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </DashboardCard>
    );
}
