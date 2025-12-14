"use client";

import React from "react";
import { DashboardCard } from "./dashboard-card";
import { IconFileText } from "@tabler/icons-react";

export function SummaryWidget() {
    return (
        <DashboardCard title="Professional Summary" icon={<IconFileText size={18} />}>
            <div className="relative">
                <p className="text-slate-300 leading-relaxed text-sm">
                    <span className="text-[#00ff41] terminal-text">{">"}</span>{" "}
                    Experienced IT Solution Architect and Cybersecurity Professional with over{" "}
                    <span className="text-[#00ff41] font-semibold">10 years</span> of expertise
                    in designing, implementing, and securing enterprise technology solutions.
                    Proven track record in{" "}
                    <span className="text-[#00ff41]">VAPT</span>,{" "}
                    <span className="text-[#00ff41]">infrastructure hardening</span>, and{" "}
                    <span className="text-[#00ff41]">risk mitigation</span>.
                </p>
                <span className="inline-block w-2 h-4 bg-[#00ff41] ml-1 cursor-blink" />
            </div>
        </DashboardCard>
    );
}
