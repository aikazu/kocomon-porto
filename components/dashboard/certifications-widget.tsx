"use client";

import React from "react";
import { DashboardCard } from "./dashboard-card";
import { IconCertificate, IconCheck } from "@tabler/icons-react";

const certifications = [
    {
        name: "CompTIA Security+ ce",
        issuer: "CompTIA",
        validity: "Valid until March 2027",
        status: "active",
        badge: "SEC+"
    },
    {
        name: "ISC2 Candidate",
        issuer: "ISC2",
        validity: "Valid until May 2025",
        status: "active",
        badge: "ISC2"
    }
];

const training = [
    "Internal Auditor ISO 19011:2018",
    "ISMS Awareness ISO 27001"
];

export function CertificationsWidget() {
    return (
        <DashboardCard title="Certifications & Training" icon={<IconCertificate size={18} />}>
            <div className="space-y-4">
                {/* Certifications */}
                <div className="space-y-3">
                    {certifications.map((cert) => (
                        <div
                            key={cert.name}
                            className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-[#00ff41]/30 transition-colors"
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded bg-[#00ff41]/10 border border-[#00ff41]/30 flex items-center justify-center">
                                <span className="text-xs font-bold text-[#00ff41] terminal-text">{cert.badge}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-medium text-white truncate">{cert.name}</h4>
                                    <IconCheck size={14} className="text-[#00ff41] flex-shrink-0" />
                                </div>
                                <p className="text-xs text-slate-500">{cert.issuer}</p>
                                <p className="text-xs text-[#00ff41]/70 terminal-text mt-1">{cert.validity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Training */}
                <div className="pt-3 border-t border-slate-800">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Training</p>
                    <div className="space-y-1">
                        {training.map((item) => (
                            <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                                <span className="text-[#00ff41]">✓</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
}
