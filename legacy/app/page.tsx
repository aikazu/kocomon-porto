import {
    MatrixBackground,
    ProfileWidget,
    SummaryWidget,
    MetricsWidget,
    SkillMatrix,
    ExperienceLog,
    CertificationsWidget,
    ScanButton,
    CopyTerminal,
    DashboardCard,
} from "@/components/dashboard";
import { IconCode, IconLock } from "@tabler/icons-react";

export default function Page() {
    return (
        <div className="min-h-screen bg-[#030712] cyber-grid">
            {/* Matrix Rain Background */}
            <MatrixBackground />

            {/* Main Content */}
            <div className="relative z-10 min-h-screen">

                {/* Dashboard Grid */}
                <main className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-start">

                        {/* LEFT COLUMN (Span 3) - Profile & Certs */}
                        <div className="lg:col-span-3 flex flex-col gap-5">
                            <ProfileWidget />
                            <CertificationsWidget />
                        </div>

                        {/* CENTER COLUMN (Span 6) - Summary, Skills, Terminal */}
                        <div className="lg:col-span-6 flex flex-col gap-5">
                            <SummaryWidget />
                            <SkillMatrix />
                            <CopyTerminal />
                        </div>

                        {/* RIGHT COLUMN (Span 3) - Scan, Metrics, Log */}
                        <div className="lg:col-span-3 flex flex-col gap-5">
                            <DashboardCard title="Security Scan" icon={<IconLock size={18} />}>
                                <ScanButton />
                            </DashboardCard>
                            <MetricsWidget />
                            <ExperienceLog />
                        </div>

                    </div>
                </main>

                {/* Premium Footer */}
                <footer className="mt-16 relative overflow-hidden">
                    {/* Animated Gradient Top Border */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                    <div
                        className="absolute top-0 left-0 right-0 h-[2px] animate-gradient"
                        style={{
                            background: 'linear-gradient(90deg, transparent, #00d4ff, #8b5cf6, #ec4899, transparent)',
                            backgroundSize: '200% 100%',
                        }}
                    />

                    {/* Background Glow */}
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative container mx-auto px-4 py-8">
                        {/* Bottom Bar */}
                        <div className="">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                {/* Copyright */}
                                <div className="flex items-center gap-3 text-sm">
                                    <IconCode size={16} className="text-cyan-400/50" />
                                    <span className="text-slate-500">© 2025</span>
                                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-medium">
                                        Iqbal Attila
                                    </span>
                                    <span className="hidden sm:inline text-slate-600">•</span>
                                    <span className="hidden sm:inline text-slate-500 text-xs">
                                        Cybersecurity Solution Architect
                                    </span>
                                </div>

                                {/* Status Badge */}
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 backdrop-blur-sm">
                                        <span className="relative flex items-center justify-center">
                                            <span className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-75" />
                                            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                                        </span>
                                        <span className="text-xs font-medium text-emerald-400">All Systems Secure</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Terminal Style */}
                        <div className="mt-8 flex items-center justify-center">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/30 border border-white/5 font-mono text-[11px] text-slate-500">
                                <span className="text-cyan-400">&gt;</span>
                                <span>system.security.status</span>
                                <span className="text-emerald-400">VERIFIED</span>
                                <span className="w-2 h-4 bg-cyan-400/50 cursor-blink" />
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}