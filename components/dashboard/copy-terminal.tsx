"use client";

import React, { useState } from "react";
import { DashboardCard } from "./dashboard-card";
import { IconTerminal2, IconCopy, IconCheck, IconChevronRight } from "@tabler/icons-react";

const contactPlainText = `Iqbal Attila
Email: attila.iqbal@gmail.com
Location: Indonesia
LinkedIn: linkedin.com/in/iqbalattila
GitHub: github.com/aikazu
Portfolio: me.kcmon.id`;

export function CopyTerminal() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(contactPlainText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <DashboardCard
            title="Terminal"
            icon={<IconTerminal2 size={18} />}
            headerRight={
                <button
                    onClick={copyToClipboard}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all duration-300 ${copied
                            ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                            : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 text-slate-400 hover:text-cyan-400"
                        }`}
                >
                    {copied ? (
                        <>
                            <IconCheck size={12} />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <IconCopy size={12} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            }
        >
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl p-4 font-mono text-sm overflow-hidden border border-white/5">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 text-slate-500 mb-3 border-b border-white/10 pb-3">
                    <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-xs text-slate-600 ml-2">~/iqbal-attila</span>
                </div>

                {/* Command */}
                <div className="flex items-center gap-2 text-slate-500 mb-3">
                    <span className="text-cyan-400">$</span>
                    <span className="text-slate-400">cat</span>
                    <span className="text-purple-400">contact_info.json</span>
                </div>

                {/* Output */}
                <div className="space-y-2 pl-2 border-l-2 border-cyan-500/30 ml-1">
                    <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[100px_1fr] gap-2 items-center">
                        <span className="text-slate-500 text-xs uppercase tracking-wider">Name</span>
                        <span className="text-white font-medium">Iqbal Attila</span>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[100px_1fr] gap-2 items-center">
                        <span className="text-slate-500 text-xs uppercase tracking-wider">Role</span>
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-medium">Cybersecurity Solution Architect</span>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[100px_1fr] gap-2 items-center">
                        <span className="text-slate-500 text-xs uppercase tracking-wider">Email</span>
                        <a href="mailto:attila.iqbal@gmail.com" className="text-slate-300 hover:text-cyan-400 transition-colors truncate">attila.iqbal@gmail.com</a>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[100px_1fr] gap-2 items-center">
                        <span className="text-slate-500 text-xs uppercase tracking-wider">Location</span>
                        <span className="text-slate-300">Indonesia</span>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[100px_1fr] gap-2 items-center">
                        <span className="text-slate-500 text-xs uppercase tracking-wider">Web</span>
                        <a href="https://me.kcmon.id" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">me.kcmon.id</a>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[100px_1fr] gap-2 items-center">
                        <span className="text-slate-500 text-xs uppercase tracking-wider">Status</span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full pulse-status" />
                            <span className="text-emerald-400">Online</span>
                        </span>
                    </div>
                </div>

                {/* Prompt */}
                <div className="mt-4 flex items-center gap-2 text-slate-500">
                    <span className="text-cyan-400">$</span>
                    <span className="w-2.5 h-5 bg-gradient-to-b from-cyan-400 to-purple-500 cursor-blink rounded-sm" />
                </div>
            </div>
        </DashboardCard>
    );
}
