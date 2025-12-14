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
import { IconShield } from "@tabler/icons-react";

export default function Page() {
    return (
        <div className="min-h-screen bg-[#020617] cyber-grid">
            {/* Matrix Rain Background */}
            <MatrixBackground />

            {/* Main Content */}
            <div className="relative z-10 min-h-screen">
                {/* Header */}
                <header className="border-b border-[#00ff41]/20 bg-[#020617]/80 backdrop-blur-sm sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#00ff41]/10 border border-[#00ff41]/30 flex items-center justify-center">
                                    <IconShield className="text-[#00ff41]" size={24} />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-white">IQBAL ATTILA</h1>
                                    <p className="text-xs text-slate-500 terminal-text">SOC DASHBOARD v1.0</p>
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 text-xs terminal-text">
                                <span className="w-2 h-2 bg-[#00ff41] rounded-full pulse-status" />
                                <span className="text-[#00ff41]">SYSTEM OPERATIONAL</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid - Column Based Layout to eliminate gaps */}
                <main className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-start">

                        {/* LEFT COLUMN (Span 3) - Profile & Certs */}
                        <div className="lg:col-span-3 flex flex-col gap-4">
                            <ProfileWidget />
                            <CertificationsWidget />
                        </div>

                        {/* CENTER COLUMN (Span 6) - Summary, Skills, Terminal */}
                        <div className="lg:col-span-6 flex flex-col gap-4">
                            <SummaryWidget />
                            <SkillMatrix />
                            <CopyTerminal />
                        </div>

                        {/* RIGHT COLUMN (Span 3) - Metrics, Scan, Log */}
                        <div className="lg:col-span-3 flex flex-col gap-4">
                            <MetricsWidget />
                            <DashboardCard title="Security Scan" icon={<IconShield size={18} />}>
                                <ScanButton />
                            </DashboardCard>
                            <ExperienceLog />
                        </div>

                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-[#00ff41]/10 mt-8">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 terminal-text">
                            <div className="flex items-center gap-4">
                                <span>© 2024 Iqbal Attila</span>
                                <span className="hidden sm:inline">|</span>
                                <span className="hidden sm:inline">Cybersecurity Solution Architect</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#00ff41] rounded-full" />
                                <span>All Systems Secure</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}