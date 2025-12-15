"use client";

import React, { useState, useEffect, useMemo } from "react";
import { IconScan, IconShieldCheck, IconRadar2, IconSparkles, IconBug, IconLock, IconFingerprint, IconVirus } from "@tabler/icons-react";

type ScanState = "idle" | "scanning" | "complete";

interface ScanItem {
    name: string;
    status: "pending" | "scanning" | "passed";
    icon: React.ReactNode;
}

export function ScanButton() {
    const [scanState, setScanState] = useState<ScanState>("idle");
    const [progress, setProgress] = useState(0);
    const [currentScanIndex, setCurrentScanIndex] = useState(-1);
    const [threatScore, setThreatScore] = useState(0);

    const scanItems: ScanItem[] = useMemo(() => [
        { name: "Malware Detection", status: "pending", icon: <IconVirus size={14} /> },
        { name: "Security Headers", status: "pending", icon: <IconLock size={14} /> },
        { name: "SSL Certificate", status: "pending", icon: <IconFingerprint size={14} /> },
        { name: "Vulnerability Scan", status: "pending", icon: <IconBug size={14} /> },
    ], []);

    const [items, setItems] = useState(scanItems);

    const runScan = () => {
        if (scanState !== "idle") return;

        setScanState("scanning");
        setProgress(0);
        setCurrentScanIndex(0);
        setItems(scanItems.map(item => ({ ...item, status: "pending" })));
        setThreatScore(0);
    };

    useEffect(() => {
        if (scanState !== "scanning") return;

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + Math.random() * 8 + 2;
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return newProgress;
            });
        }, 150);

        return () => clearInterval(progressInterval);
    }, [scanState]);

    useEffect(() => {
        if (scanState !== "scanning" || currentScanIndex < 0) return;

        const itemsLength = items.length;
        const scanInterval = setInterval(() => {
            setItems(prev => {
                const newItems = [...prev];
                if (currentScanIndex > 0 && currentScanIndex <= newItems.length) {
                    newItems[currentScanIndex - 1].status = "passed";
                }
                if (currentScanIndex < newItems.length) {
                    newItems[currentScanIndex].status = "scanning";
                }
                return newItems;
            });

            setCurrentScanIndex(prev => {
                if (prev >= itemsLength) {
                    setScanState("complete");
                    setThreatScore(100);
                    setTimeout(() => {
                        setScanState("idle");
                        setProgress(0);
                        setCurrentScanIndex(-1);
                        setItems(scanItems);
                    }, 6000);
                    return prev;
                }
                return prev + 1;
            });
        }, 600);

        return () => clearInterval(scanInterval);
    }, [scanState, currentScanIndex, items.length, scanItems]);

    return (
        <div className="space-y-4">
            {/* Main Scan Button with Radar Animation */}
            <button
                onClick={runScan}
                disabled={scanState !== "idle"}
                className={`
                    w-full py-4 px-4 rounded-xl 
                    flex items-center justify-center gap-3
                    font-medium terminal-text text-sm
                    transition-all duration-500 relative overflow-hidden
                    ${scanState === "idle"
                        ? "bg-gradient-to-r from-cyan-600/30 via-purple-600/30 to-pink-600/30 border border-cyan-500/50 text-cyan-400 hover:from-cyan-500/40 hover:via-purple-500/40 hover:to-pink-500/40 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer group"
                        : scanState === "scanning"
                            ? "bg-white/5 border border-cyan-500/30 text-cyan-400 cursor-wait"
                            : "bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border border-emerald-500/50 text-emerald-400 cursor-default"
                    }
                `}
            >
                {/* Animated Background Pulse */}
                {scanState === "scanning" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse" />
                )}

                {/* Sweep Effect */}
                {scanState === "idle" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                )}

                {/* Rotating Border Effect */}
                {scanState === "scanning" && (
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent,cyan,transparent)] animate-spin" style={{ animationDuration: '2s' }} />
                        <div className="absolute inset-[2px] bg-[#0a0f1a] rounded-xl" />
                    </div>
                )}

                <div className="relative z-10 flex items-center justify-center gap-3">
                    {scanState === "idle" && (
                        <>
                            <div className="relative">
                                <IconRadar2 size={20} className="group-hover:animate-pulse" />
                                <div className="absolute inset-0 blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    <IconRadar2 size={20} className="text-cyan-400" />
                                </div>
                            </div>
                            <span className="text-sm font-semibold tracking-wide">INITIATE SCAN</span>
                        </>
                    )}
                    {scanState === "scanning" && (
                        <>
                            <IconScan size={20} className="animate-spin" style={{ animationDuration: '1.5s' }} />
                            <span className="text-sm font-semibold tracking-wide">SCANNING SYSTEMS...</span>
                        </>
                    )}
                    {scanState === "complete" && (
                        <>
                            <IconShieldCheck size={20} />
                            <span className="text-sm font-semibold tracking-wide">SCAN COMPLETE</span>
                        </>
                    )}
                </div>
            </button>

            {/* Enhanced Scanning View */}
            {scanState === "scanning" && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Multi-layer Progress */}
                    <div className="space-y-1">
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden relative">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-300"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </div>
                    </div>

                    {/* Scan Items List */}
                    <div className="rounded-lg bg-black/30 border border-white/5 p-3 space-y-2">
                        {items.map((item) => (
                            <div
                                key={item.name}
                                className={`flex items-center justify-between text-xs terminal-text py-1.5 px-2 rounded-md transition-all duration-300 ${item.status === "scanning"
                                    ? "bg-cyan-500/10 border border-cyan-500/30"
                                    : item.status === "passed"
                                        ? "bg-emerald-500/10"
                                        : "opacity-50"
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`${item.status === "scanning" ? "text-cyan-400" : item.status === "passed" ? "text-emerald-400" : "text-slate-500"}`}>
                                        {item.icon}
                                    </span>
                                    <span className={`${item.status === "scanning" ? "text-cyan-400" : item.status === "passed" ? "text-emerald-400" : "text-slate-500"}`}>
                                        {item.name}
                                    </span>
                                </div>
                                <div>
                                    {item.status === "scanning" && (
                                        <span className="text-cyan-400 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                                            Scanning
                                        </span>
                                    )}
                                    {item.status === "passed" && (
                                        <span className="text-emerald-400">✓ Passed</span>
                                    )}
                                    {item.status === "pending" && (
                                        <span className="text-slate-500">Pending</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between text-xs terminal-text text-slate-500">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                            Active Scan
                        </span>
                        <span className="text-cyan-400 font-mono">{Math.min(Math.round(progress), 100)}%</span>
                    </div>
                </div>
            )}

            {/* Enhanced Result Card */}
            {scanState === "complete" && (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                    <div className="relative p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/40 overflow-hidden">
                        {/* Glow Effect */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-emerald-400/20 blur-2xl" />

                        {/* Header with Score */}
                        <div className="relative flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <IconSparkles size={16} className="animate-pulse" />
                                <span className="text-sm font-bold terminal-text tracking-wide">SCAN REPORT</span>
                            </div>
                            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                                <IconShieldCheck size={14} className="text-emerald-400" />
                                <span className="text-xs font-bold text-emerald-400">{threatScore}%</span>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="relative space-y-2 text-xs terminal-text">
                            <div className="flex items-center gap-2 text-emerald-400/90 p-2 rounded-lg bg-emerald-500/10">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/50" />
                                <span>Zero Vulnerabilities Detected</span>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-400/90 p-2 rounded-lg bg-emerald-500/10">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/50" />
                                <span>All Security Tests Passed</span>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-400/90 p-2 rounded-lg bg-emerald-500/10">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/50" />
                                <span>Maximum Security Grade</span>
                            </div>

                            {/* CTA */}
                            <div className="mt-3 pt-3 border-t border-emerald-500/20">
                                <div className="flex items-center justify-center gap-2 text-white font-bold text-sm py-2 rounded-lg bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border border-emerald-400/30">
                                    <span className="text-lg">🚀</span>
                                    <span>READY FOR DEPLOYMENT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
