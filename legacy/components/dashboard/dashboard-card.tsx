import React from "react";

interface DashboardCardProps {
    title?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    headerRight?: React.ReactNode;
}

export function DashboardCard({
    title,
    icon,
    children,
    className = "",
    headerRight
}: DashboardCardProps) {
    return (
        <div
            className={`cyber-card cyber-border rounded-xl p-5 relative overflow-hidden group ${className}`}
        >
            {/* Animated Corner Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-transparent group-hover:from-cyan-300 transition-colors" />
                <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-cyan-400 to-transparent group-hover:from-cyan-300 transition-colors" />
            </div>
            <div className="absolute top-0 right-0 w-6 h-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-purple-500 to-transparent group-hover:from-purple-400 transition-colors" />
                <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-purple-500 to-transparent group-hover:from-purple-400 transition-colors" />
            </div>
            <div className="absolute bottom-0 left-0 w-6 h-6 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-transparent group-hover:from-purple-400 transition-colors" />
                <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-purple-500 to-transparent group-hover:from-purple-400 transition-colors" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-cyan-400 to-transparent group-hover:from-cyan-300 transition-colors" />
                <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-cyan-400 to-transparent group-hover:from-cyan-300 transition-colors" />
            </div>

            {/* Subtle Glow Effect on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
            </div>

            {title && (
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        {icon && (
                            <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors icon-glow">
                                {icon}
                            </span>
                        )}
                        <h3 className="text-sm font-semibold terminal-text tracking-wider uppercase bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            {title}
                        </h3>
                    </div>
                    {headerRight && (
                        <div>{headerRight}</div>
                    )}
                </div>
            )}

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
