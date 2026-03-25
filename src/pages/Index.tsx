import { DashboardLayout } from "@/components/DashboardLayout";
import { KPICard, StatusBadge } from "@/components/StatusBadge";
import { programs, kpiSummary, productionTrend, defectPareto, ncrs, workOrders } from "@/data/mockData";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Factory, Truck, Shield, Wrench } from "lucide-react";

export default function Index() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="module-header">Executive Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time manufacturing operations overview</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard title="On-Time Delivery" value={`${kpiSummary.onTimeDelivery}%`} trend="up" trendValue="1.2% vs last month" icon={<Truck className="h-5 w-5" />} />
          <KPICard title="First Pass Yield" value={`${kpiSummary.firstPassYield}%`} trend="up" trendValue="0.3% improvement" icon={<CheckCircle className="h-5 w-5" />} />
          <KPICard title="Open NCRs" value={kpiSummary.openNCRs} trend="down" trendValue="2 closed this week" icon={<AlertTriangle className="h-5 w-5" />} />
          <KPICard title="Capacity Utilization" value={`${kpiSummary.capacityUtilization}%`} trend="neutral" trendValue="Stable" icon={<Factory className="h-5 w-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Production Trend */}
          <div className="rounded-lg border bg-card p-5">
            <h3 className="text-sm font-semibold mb-4">Production Output vs Plan</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={productionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                <Line type="monotone" dataKey="planned" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Defect Pareto */}
          <div className="rounded-lg border bg-card p-5">
            <h3 className="text-sm font-semibold mb-4">Top Defect Modes (Pareto)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={defectPareto}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="defect" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {defectPareto.map((_, i) => (
                    <Cell key={i} fill={i < 2 ? "hsl(var(--destructive))" : i < 4 ? "hsl(var(--status-yellow))" : "hsl(var(--primary))"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Program Portfolio */}
        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Program Portfolio Health</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Program</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Milestones</th>
                <th>Sites</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.id}>
                  <td className="font-medium">{p.name}</td>
                  <td>{p.customer}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="text-xs">{p.completedMilestones}/{p.milestones}</td>
                  <td className="text-xs">{p.sites.join(", ")}</td>
                  <td className="text-xs">{p.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent NCRs */}
          <div className="rounded-lg border bg-card p-5">
            <h3 className="text-sm font-semibold mb-4">Recent Non-Conformances</h3>
            <div className="space-y-3">
              {ncrs.slice(0, 4).map((n) => (
                <div key={n.id} className="flex items-start gap-3 p-3 rounded-md bg-muted/30">
                  <div className="mt-0.5">
                    <AlertTriangle className={`h-4 w-4 ${n.severity === "Critical" ? "text-status-red" : n.severity === "Major" ? "text-status-yellow" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.id} · {n.program} · {n.owner}</p>
                  </div>
                  <StatusBadge status={n.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Active Work Orders */}
          <div className="rounded-lg border bg-card p-5">
            <h3 className="text-sm font-semibold mb-4">Active Work Orders</h3>
            <div className="space-y-3">
              {workOrders.filter(w => w.status === "Running" || w.status === "Delayed").map((w) => (
                <div key={w.id} className="flex items-center gap-3 p-3 rounded-md bg-muted/30">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{w.id} — Line {w.line}</p>
                    <p className="text-xs text-muted-foreground">Shift: {w.shift} · Cycle: {w.cycleTime}s · Yield: {w.yield}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono">{w.actual}/{w.planned}</p>
                    <StatusBadge status={w.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
