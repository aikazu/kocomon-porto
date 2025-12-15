"use client";

import React from "react";
import Image from "next/image";
import { DashboardCard } from "./dashboard-card";
import { StatusIndicator } from "./status-indicator";
import {
    IconMail,
    IconMapPin,
    IconBrandLinkedin,
    IconBrandGithub,
    IconWorld,
    IconAward,
    IconUser,
    IconExternalLink
} from "@tabler/icons-react";

const contactLinks = [
    { icon: IconMail, label: "Email", value: "attila.iqbal@gmail.com", href: "mailto:attila.iqbal@gmail.com" },
    { icon: IconMapPin, label: "Location", value: "Indonesia", href: null },
];

const socialLinks = [
    { icon: IconBrandLinkedin, label: "LinkedIn", href: "https://linkedin.com/in/iqbalattila", color: "from-blue-400 to-blue-600" },
    { icon: IconWorld, label: "Portfolio", href: "https://me.kcmon.id", color: "from-cyan-400 to-teal-500" },
    { icon: IconBrandGithub, label: "GitHub", href: "https://github.com/aikazu", color: "from-purple-400 to-purple-600" },
    { icon: IconAward, label: "Credly", href: "https://credly.com/users/iqbal-attila", color: "from-orange-400 to-orange-600" },
];

export function ProfileWidget() {
    return (
        <DashboardCard className="h-full" icon={<IconUser size={18} />} title="User Profile">
            <div className="space-y-5">
                {/* Avatar & Name */}
                <div className="text-center pb-5 border-b border-white/10">
                    {/* Animated Avatar Ring */}
                    <div className="relative inline-block mb-4 group cursor-pointer">
                        {/* Outer Glow Effect */}
                        <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient opacity-40 blur-xl group-hover:opacity-60 transition-opacity duration-500" />

                        {/* Animated Ring Border */}
                        <div className="absolute inset-0 -m-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient p-[2px]">
                            <div className="w-full h-full rounded-full bg-slate-900" />
                        </div>

                        {/* Portrait Image */}
                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-105">
                            <Image
                                src="/potrait.jpg"
                                alt="Iqbal Attila"
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                sizes="160px"
                                priority
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Status Dot */}
                        <div className="absolute bottom-1 right-1 z-20">
                            <span className="relative flex h-3.5 w-3.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900" />
                            </span>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-white mb-1">
                        Iqbal Attila
                    </h1>
                    <p className="text-sm text-slate-400 mb-4">
                        Cybersecurity Solution Architect
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full pulse-status" />
                        <span className="text-xs terminal-text text-cyan-400">CompTIA Security+ Certified</span>
                    </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-colors">
                    <StatusIndicator status="online" label="System Operational" size="sm" />
                    <span className="cyber-badge badge-active">Open to Work</span>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider terminal-text flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        Contact
                    </p>
                    {contactLinks.map((contact) => (
                        <div key={contact.label} className="flex items-center gap-3 text-sm group">
                            <contact.icon size={16} className="text-cyan-400/70 group-hover:text-cyan-400 transition-colors" />
                            {contact.href ? (
                                <a
                                    href={contact.href}
                                    className="text-slate-300 hover:text-cyan-400 transition-colors truncate"
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
                <div className="space-y-3">
                    <p className="text-xs text-slate-500 uppercase tracking-wider terminal-text flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        Links
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 group"
                            >
                                <span className={`p-1.5 rounded-md bg-gradient-to-br ${link.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                                    <link.icon size={14} className="text-white" />
                                </span>
                                <span className="flex-1">{link.label}</span>
                                <IconExternalLink size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
}
