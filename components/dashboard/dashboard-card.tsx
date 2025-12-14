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
            className={`cyber-card cyber-border rounded-lg p-4 relative overflow-hidden ${className}`}
        >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#00ff41]/50" />
            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-[#00ff41]/50" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-[#00ff41]/50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#00ff41]/50" />

            {title && (
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#00ff41]/20">
                    <div className="flex items-center gap-2">
                        {icon && (
                            <span className="text-[#00ff41]">{icon}</span>
                        )}
                        <h3 className="text-sm font-semibold terminal-text text-[#00ff41] uppercase tracking-wider">
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
