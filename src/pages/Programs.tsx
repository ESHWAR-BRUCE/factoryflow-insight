import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge, KPICard } from "@/components/StatusBadge";
import { programs } from "@/data/mockData";
import { FolderKanban, Milestone, MapPin, Users } from "lucide-react";

export default function ProgramsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="module-header">Program & Project Tracking</h1>
            <p className="text-sm text-muted-foreground mt-1">Portfolio dashboard with milestone and dependency tracking</p>
          </div>
          <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            + New Program
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard title="Active Programs" value={programs.length} icon={<FolderKanban className="h-5 w-5" />} />
          <KPICard title="On Track" value={programs.filter(p => p.status === "Green").length} trend="up" trendValue="67% of portfolio" icon={<Milestone className="h-5 w-5" />} />
          <KPICard title="At Risk" value={programs.filter(p => p.status === "Yellow").length} trend="neutral" trendValue="Needs attention" icon={<Users className="h-5 w-5" />} />
          <KPICard title="Critical" value={programs.filter(p => p.status === "Red").length} trend="down" trendValue="1 escalated" icon={<MapPin className="h-5 w-5" />} />
        </div>

        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">All Programs</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Program Name</th>
                <th>Customer</th>
                <th>Health</th>
                <th>Progress</th>
                <th>Milestones</th>
                <th>Sites</th>
                <th>Owner</th>
                <th>Timeline</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.id} className="cursor-pointer">
                  <td className="font-mono text-xs">{p.id}</td>
                  <td className="font-medium">{p.name}</td>
                  <td>{p.customer}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs font-mono">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="text-xs">{p.completedMilestones}/{p.milestones}</td>
                  <td className="text-xs">{p.sites.join(", ")}</td>
                  <td className="text-xs">{p.owner}</td>
                  <td className="text-xs text-muted-foreground">{p.startDate} → {p.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
