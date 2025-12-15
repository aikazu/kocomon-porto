"use client";

import React from "react";
import { DashboardCard } from "./dashboard-card";
import { IconFileText } from "@tabler/icons-react";

export function SummaryWidget() {
    return (
        <DashboardCard title="Professional Summary" icon={<IconFileText size={18} />}>
            <div className="relative">
                <p className="text-slate-300 leading-relaxed text-sm">
                    <span className="text-cyan-400 terminal-text font-medium">{">"}</span>{" "}
                    Experienced IT Solution Architect and Cybersecurity Professional with over{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
                        10 years
                    </span>{" "}
                    of expertise in designing, implementing, and securing enterprise technology solutions.
                    Proven track record in{" "}
                    <span className="relative inline-block">
                        <span className="text-cyan-400">VAPT</span>
                        <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent" />
                    </span>
                    ,{" "}
                    <span className="relative inline-block">
                        <span className="text-purple-400">infrastructure hardening</span>
                        <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400/50 to-transparent" />
                    </span>
                    , and{" "}
                    <span className="relative inline-block">
                        <span className="text-pink-400">risk mitigation</span>
                        <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400/50 to-transparent" />
                    </span>
                    .
                </p>
            </div>
        </DashboardCard>
    );
}
