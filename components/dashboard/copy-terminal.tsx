"use client";

import React, { useState } from "react";
import { DashboardCard } from "./dashboard-card";
import { IconTerminal2, IconCopy, IconCheck } from "@tabler/icons-react";



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
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-[#00ff41] transition-colors"
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
            <div className="bg-slate-950 rounded p-4 font-mono text-sm overflow-hidden">
                <div className="flex items-center gap-2 text-slate-500 mb-2 border-b border-slate-800 pb-2">
                    <span className="text-[#00ff41]">$</span> cat contact_info.json
                </div>
                <div className="space-y-1">
                    <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-2">
                        <span className="text-slate-500">Name:</span>
                        <span className="text-white">Iqbal Attila</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-2">
                        <span className="text-slate-500">Role:</span>
                        <span className="text-[#00ff41]">Cybersecurity Solution Architect</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-2">
                        <span className="text-slate-500">Email:</span>
                        <a href="mailto:attila.iqbal@gmail.com" className="text-slate-300 hover:text-[#00ff41] transition-colors truncate">attila.iqbal@gmail.com</a>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-2">
                        <span className="text-slate-500">Location:</span>
                        <span className="text-slate-300">Indonesia</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-2">
                        <span className="text-slate-500">Web:</span>
                        <a href="https://me.kcmon.id" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-[#00ff41] transition-colors">me.kcmon.id</a>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-2">
                        <span className="text-slate-500">Status:</span>
                        <span className="text-[#00ff41] animate-pulse">● Online</span>
                    </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-slate-500">
                    <span className="text-[#00ff41]">$</span> <span className="animate-pulse">_</span>
                </div>
            </div>
        </DashboardCard>
    );
}
