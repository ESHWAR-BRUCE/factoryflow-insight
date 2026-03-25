import { DashboardLayout } from "@/components/DashboardLayout";
import { KPICard } from "@/components/StatusBadge";
import { programs, kpiSummary, productionTrend } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { BarChart3, Download, Filter, Share2 } from "lucide-react";

const statusDistribution = [
  { name: "Green", value: programs.filter(p => p.status === "Green").length, color: "hsl(142, 71%, 45%)" },
  { name: "Yellow", value: programs.filter(p => p.status === "Yellow").length, color: "hsl(45, 93%, 47%)" },
  { name: "Red", value: programs.filter(p => p.status === "Red").length, color: "hsl(0, 72%, 51%)" },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="module-header">Analytics & Reports</h1>
            <p className="text-sm text-muted-foreground mt-1">Executive dashboards, predictive insights, and self-service reporting</p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-3 rounded-md border text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2"><Filter className="h-4 w-4" />Filters</button>
            <button className="h-9 px-3 rounded-md border text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2"><Download className="h-4 w-4" />Export</button>
            <button className="h-9 px-3 rounded-md border text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2"><Share2 className="h-4 w-4" />Share</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard title="On-Time Delivery" value={`${kpiSummary.onTimeDelivery}%`} trend="up" trendValue="+1.2%" />
          <KPICard title="First Pass Yield" value={`${kpiSummary.firstPassYield}%`} trend="up" trendValue="+0.3%" />
          <KPICard title="Capacity Util." value={`${kpiSummary.capacityUtilization}%`} trend="neutral" trendValue="Stable" />
          <KPICard title="Customer Sat." value={`${kpiSummary.customerSatisfaction}/5`} trend="up" trendValue="+0.1" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-lg border bg-card p-5">
            <h3 className="text-sm font-semibold mb-4">Yield Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={productionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[94, 100]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
                <Line type="monotone" dataKey="yield" stroke="hsl(var(--status-green))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg border bg-card p-5">
            <h3 className="text-sm font-semibold mb-4">Portfolio Health</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {statusDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {statusDistribution.map((s) => (
                <div key={s.name} className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-xs text-muted-foreground">{s.name} ({s.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
