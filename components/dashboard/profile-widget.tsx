"use client";

import React from "react";
import { DashboardCard } from "./dashboard-card";
import { StatusIndicator } from "./status-indicator";
import {
    IconMail,
    IconPhone,
    IconMapPin,
    IconBrandLinkedin,
    IconBrandGithub,
    IconWorld,
    IconAward,
    IconUser
} from "@tabler/icons-react";

const contactLinks = [
    { icon: IconMail, label: "Email", value: "attila.iqbal@gmail.com", href: "mailto:attila.iqbal@gmail.com" },
    { icon: IconMapPin, label: "Location", value: "Indonesia", href: null },
];

const socialLinks = [
    { icon: IconBrandLinkedin, label: "LinkedIn", href: "https://linkedin.com/in/iqbalattila" },
    { icon: IconWorld, label: "Portfolio", href: "https://me.kcmon.id" },
    { icon: IconBrandGithub, label: "GitHub", href: "https://github.com/aikazu" },
    { icon: IconAward, label: "Credly", href: "https://credly.com/users/iqbal-attila" },
];

export function ProfileWidget() {
    return (
        <DashboardCard className="h-full" icon={<IconUser size={18} />} title="User Profile">
            <div className="space-y-4">
                {/* Name and Title */}
                <div className="text-center pb-4 border-b border-[#00ff41]/10">
                    <h1 className="text-2xl font-bold text-white mb-1">
                        Iqbal Attila
                    </h1>
                    <p className="text-sm text-slate-400 mb-3">
                        Cybersecurity Solution Architect
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff41]/10 border border-[#00ff41]/30">
                        <span className="text-xs terminal-text text-[#00ff41]">CompTIA Security+ Certified</span>
                    </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between py-2 px-3 rounded bg-slate-900/50">
                    <StatusIndicator status="online" label="System Operational" size="sm" />
                    <span className="cyber-badge">Open to Work</span>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider terminal-text">Contact</p>
                    {contactLinks.map((contact) => (
                        <div key={contact.label} className="flex items-center gap-3 text-sm">
                            <contact.icon size={16} className="text-[#00ff41]/70" />
                            {contact.href ? (
                                <a
                                    href={contact.href}
                                    className="text-slate-300 hover:text-[#00ff41] transition-colors truncate"
                                >
                                    {contact.value}
                                </a>
                            ) : (
                                <span className="text-slate-300">{contact.value}</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Social Links */}
                <div className="space-y-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider terminal-text">Links</p>
                    <div className="grid grid-cols-2 gap-2">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#00ff41] transition-colors p-2 rounded hover:bg-[#00ff41]/5"
                            >
                                <link.icon size={16} />
                                <span>{link.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
}
