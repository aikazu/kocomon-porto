"use client";

import React, { useState } from "react";
import { IconScan, IconShieldCheck, IconLoader2 } from "@tabler/icons-react";

type ScanState = "idle" | "scanning" | "complete";

export function ScanButton() {
    const [scanState, setScanState] = useState<ScanState>("idle");
    const [progress, setProgress] = useState(0);

    const runScan = () => {
        if (scanState !== "idle") return;

        setScanState("scanning");
        setProgress(0);

        // Simulate scanning progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setScanState("complete");
                    // Reset after 5 seconds
                    setTimeout(() => {
                        setScanState("idle");
                        setProgress(0);
                    }, 5000);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 200);
    };

    return (
        <div className="space-y-3">
            <button
                onClick={runScan}
                disabled={scanState !== "idle"}
                className={`
          w-full py-3 px-4 rounded-lg 
          flex items-center justify-center gap-2
          font-medium terminal-text text-sm
          transition-all duration-300
          ${scanState === "idle"
                        ? "bg-[#00ff41]/10 border border-[#00ff41]/50 text-[#00ff41] hover:bg-[#00ff41]/20 hover:border-[#00ff41] cursor-pointer"
                        : scanState === "scanning"
                            ? "bg-slate-800 border border-slate-700 text-slate-400 cursor-wait"
                            : "bg-[#00ff41]/20 border border-[#00ff41] text-[#00ff41] cursor-default"
                    }
        `}
            >
                {scanState === "idle" && (
                    <>
                        <IconScan size={18} />
                        <span>Run Vulnerability Scan</span>
                    </>
                )}
                {scanState === "scanning" && (
                    <>
                        <IconLoader2 size={18} className="animate-spin" />
                        <span>Scanning Portfolio...</span>
                    </>
                )}
                {scanState === "complete" && (
                    <>
                        <IconShieldCheck size={18} />
                        <span>Scan Complete</span>
                    </>
                )}
            </button>

            {/* Progress Bar */}
            {scanState === "scanning" && (
                <div className="space-y-1">
                    <div className="cyber-progress h-1">
                        <div
                            className="cyber-progress-bar h-full transition-all duration-200"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs terminal-text text-slate-500">
                        <span>Scanning...</span>
                        <span>{Math.min(Math.round(progress), 100)}%</span>
                    </div>
                </div>
            )}

            {/* Result */}
            {scanState === "complete" && (
                <div className="p-3 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/30">
                    <div className="flex items-center gap-2 text-[#00ff41] mb-1">
                        <IconShieldCheck size={16} />
                        <span className="text-sm font-semibold terminal-text">SCAN RESULT</span>
                    </div>
                    <p className="text-xs text-[#00ff41]/80 terminal-text">
                        ✓ No Vulnerabilities Found<br />
                        ✓ All Systems Secure<br />
                        <span className="text-white font-bold mt-1 block">→ HIRE IMMEDIATELY</span>
                    </p>
                </div>
            )}
        </div>
    );
}
