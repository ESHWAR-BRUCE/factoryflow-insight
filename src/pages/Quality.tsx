import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge, KPICard } from "@/components/StatusBadge";
import { ncrs, certifications, defectPareto } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ShieldCheck, AlertTriangle, FileCheck, ClipboardList } from "lucide-react";

export default function QualityPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="module-header">Quality & Compliance</h1>
          <p className="text-sm text-muted-foreground mt-1">NCR/CAPA tracking, certifications, SPC, and audit management</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard title="Open NCRs" value={ncrs.filter(n => n.status !== "Closed").length} trend="down" trendValue="1 closed today" icon={<AlertTriangle className="h-5 w-5" />} />
          <KPICard title="Active Certs" value={certifications.filter(c => c.status === "Valid").length} icon={<ShieldCheck className="h-5 w-5" />} />
          <KPICard title="Expiring Soon" value={certifications.filter(c => c.status === "Expiring Soon").length} trend="down" trendValue="Needs renewal" icon={<FileCheck className="h-5 w-5" />} />
          <KPICard title="Pending Audits" value={2} icon={<ClipboardList className="h-5 w-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card p-5">
            <h3 className="text-sm font-semibold mb-4">Defect Pareto Analysis</h3>
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

          <div className="rounded-lg border bg-card p-5">
            <h3 className="text-sm font-semibold mb-4">Certification Library</h3>
            <table className="data-table">
              <thead>
                <tr><th>Certificate</th><th>Standard</th><th>Site</th><th>Expiry</th><th>Status</th></tr>
              </thead>
              <tbody>
                {certifications.map((c) => (
                  <tr key={c.id}>
                    <td className="font-medium">{c.name}</td>
                    <td className="text-xs">{c.standard}</td>
                    <td className="text-xs">{c.site}</td>
                    <td className="text-xs font-mono">{c.expiryDate}</td>
                    <td><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Non-Conformance Reports (NCRs)</h3>
            <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90">+ Log NCR</button>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>NCR ID</th><th>Title</th><th>Severity</th><th>Status</th><th>Program</th><th>Owner</th><th>Raised</th></tr>
            </thead>
            <tbody>
              {ncrs.map((n) => (
                <tr key={n.id}>
                  <td className="font-mono text-xs">{n.id}</td>
                  <td className="font-medium">{n.title}</td>
                  <td><StatusBadge status={n.severity} /></td>
                  <td><StatusBadge status={n.status} /></td>
                  <td className="text-xs">{n.program}</td>
                  <td className="text-xs">{n.owner}</td>
                  <td className="text-xs font-mono">{n.raisedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
