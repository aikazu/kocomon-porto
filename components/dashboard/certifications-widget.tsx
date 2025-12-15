"use client";

import React from "react";
import { DashboardCard } from "./dashboard-card";
import { IconCertificate, IconCheck, IconShieldCheck, IconRosetteDiscountCheck } from "@tabler/icons-react";

const certifications = [
    {
        name: "CompTIA Security+ ce",
        issuer: "CompTIA",
        validity: "Valid until March 2027",
        status: "active",
        badge: "SEC+",
        gradient: "from-cyan-500 to-blue-500",
        glow: "shadow-cyan-500/20"
    },
    {
        name: "ISC2 Candidate",
        issuer: "ISC2",
        validity: "Valid until May 2025",
        status: "active",
        badge: "ISC2",
        gradient: "from-purple-500 to-pink-500",
        glow: "shadow-purple-500/20"
    }
];

const training = [
    "Internal Auditor ISO 19011:2018",
    "ISMS Awareness ISO 27001"
];

export function CertificationsWidget() {
    return (
        <DashboardCard title="Certifications & Training" icon={<IconCertificate size={18} />}>
            <div className="space-y-5">
                {/* Certifications */}
                <div className="space-y-3">
                    {certifications.map((cert) => (
                        <div
                            key={cert.name}
                            className={`flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group hover:bg-white/[0.07] cursor-default shadow-lg hover:${cert.glow}`}
                        >
                            {/* Badge Icon */}
                            <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${cert.gradient} flex items-center justify-center relative overflow-hidden`}>
                                <span className="text-xs font-bold text-white terminal-text z-10">{cert.badge}</span>
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-sm font-medium text-white truncate">{cert.name}</h4>
                                    <IconRosetteDiscountCheck size={16} className="text-cyan-400 flex-shrink-0" />
                                </div>
                                <p className="text-xs text-slate-500">{cert.issuer}</p>
                                <p className="text-xs text-cyan-400/80 terminal-text mt-1.5 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                                    {cert.validity}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Training */}
                <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        Training
                    </p>
                    <div className="space-y-2">
                        {training.map((item) => (
                            <div key={item} className="flex items-center gap-3 text-xs text-slate-400 group hover:text-slate-300 transition-colors">
                                <span className="p-1 rounded bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                                    <IconCheck size={12} className="text-emerald-400" />
                                </span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
}
