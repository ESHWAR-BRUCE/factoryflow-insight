import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colorMap: Record<string, string> = {
    Green: "bg-status-green/10 text-status-green",
    Yellow: "bg-status-yellow/10 text-status-yellow",
    Red: "bg-status-red/10 text-status-red",
    Running: "bg-status-blue/10 text-status-blue",
    Completed: "bg-status-green/10 text-status-green",
    Delayed: "bg-status-red/10 text-status-red",
    "On Hold": "bg-status-yellow/10 text-status-yellow",
    Open: "bg-status-red/10 text-status-red",
    Investigation: "bg-status-yellow/10 text-status-yellow",
    "Corrective Action": "bg-status-blue/10 text-status-blue",
    Closed: "bg-muted text-muted-foreground",
    Critical: "bg-status-red/10 text-status-red",
    Major: "bg-status-yellow/10 text-status-yellow",
    Minor: "bg-muted text-muted-foreground",
    Approved: "bg-status-green/10 text-status-green",
    Conditional: "bg-status-yellow/10 text-status-yellow",
    "Under Review": "bg-status-red/10 text-status-red",
    Valid: "bg-status-green/10 text-status-green",
    "Expiring Soon": "bg-status-yellow/10 text-status-yellow",
    Expired: "bg-status-red/10 text-status-red",
    Received: "bg-muted text-muted-foreground",
    Diagnostics: "bg-status-yellow/10 text-status-yellow",
    Repair: "bg-status-blue/10 text-status-blue",
    Testing: "bg-status-blue/10 text-status-blue",
    Shipped: "bg-status-green/10 text-status-green",
  };

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", colorMap[status] || "bg-muted text-muted-foreground", className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-status-green": ["Green", "Completed", "Approved", "Valid", "Shipped"].includes(status),
        "bg-status-yellow": ["Yellow", "On Hold", "Investigation", "Conditional", "Expiring Soon", "Major", "Diagnostics"].includes(status),
        "bg-status-red": ["Red", "Delayed", "Open", "Under Review", "Expired", "Critical"].includes(status),
        "bg-status-blue": ["Running", "Corrective Action", "Repair", "Testing"].includes(status),
        "bg-muted-foreground": ["Closed", "Minor", "Received"].includes(status),
      })} />
      {status}
    </span>
  );
}

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: ReactNode;
}

export function KPICard({ title, value, subtitle, trend, trendValue, icon }: KPICardProps) {
  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight mt-1">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      {trend && trendValue && (
        <p className={cn("text-xs font-medium mt-2", {
          "text-status-green": trend === "up",
          "text-status-red": trend === "down",
          "text-muted-foreground": trend === "neutral",
        })}>
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
        </p>
      )}
    </div>
  );
}
