import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge, KPICard } from "@/components/StatusBadge";
import { workOrders, productionTrend } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Gauge, Timer, TrendingUp } from "lucide-react";

export default function ProductionPage() {
  const running = workOrders.filter(w => w.status === "Running").length;
  const avgYield = (workOrders.reduce((s, w) => s + w.yield, 0) / workOrders.length).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="module-header">Production Visibility</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time WIP, output, yield, and shift performance</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard title="Active Lines" value={running} icon={<Activity className="h-5 w-5" />} />
          <KPICard title="Avg Yield" value={`${avgYield}%`} trend="up" trendValue="0.2% vs yesterday" icon={<TrendingUp className="h-5 w-5" />} />
          <KPICard title="Total Output" value={workOrders.reduce((s, w) => s + w.actual, 0).toLocaleString()} icon={<Gauge className="h-5 w-5" />} />
          <KPICard title="Avg Cycle Time" value={`${Math.round(workOrders.reduce((s, w) => s + w.cycleTime, 0) / workOrders.length)}s`} icon={<Timer className="h-5 w-5" />} />
        </div>

        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Output Trend (March)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={productionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
              <Line type="monotone" dataKey="planned" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Planned" />
              <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Work Orders</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Work Order</th>
                <th>Line</th>
                <th>Shift</th>
                <th>Planned</th>
                <th>Actual</th>
                <th>Yield</th>
                <th>Cycle Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((w) => (
                <tr key={w.id}>
                  <td className="font-mono text-xs">{w.id}</td>
                  <td className="font-medium">{w.line}</td>
                  <td>{w.shift}</td>
                  <td className="font-mono">{w.planned}</td>
                  <td className="font-mono">{w.actual}</td>
                  <td className={`font-mono ${w.yield >= 97 ? "text-status-green" : w.yield >= 95 ? "text-status-yellow" : "text-status-red"}`}>{w.yield}%</td>
                  <td className="font-mono">{w.cycleTime}s</td>
                  <td><StatusBadge status={w.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
