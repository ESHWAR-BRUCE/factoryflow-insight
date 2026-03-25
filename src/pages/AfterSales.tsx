import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge, KPICard } from "@/components/StatusBadge";
import { rmas } from "@/data/mockData";
import { Wrench, RotateCcw, Shield, Package } from "lucide-react";

const warrantyClaims = [
  { id: "WC-301", customer: "Airbus Defense", product: "Avionics Unit v2", claimDate: "2026-03-10", amount: "€12,400", status: "Under Review" },
  { id: "WC-302", customer: "BMW Group", product: "BMS Board v1", claimDate: "2026-03-05", amount: "€8,200", status: "Approved" },
  { id: "WC-303", customer: "Nokia Networks", product: "5G Controller", claimDate: "2026-02-28", amount: "€3,100", status: "Closed" },
];

export default function AfterSalesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="module-header">After-Sales & Service</h1>
          <p className="text-sm text-muted-foreground mt-1">RMA intake, repair workflows, warranty claims, and spare parts</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard title="Open RMAs" value={rmas.length} icon={<RotateCcw className="h-5 w-5" />} />
          <KPICard title="In Repair" value={rmas.filter(r => r.status === "Repair").length} icon={<Wrench className="h-5 w-5" />} />
          <KPICard title="Warranty Claims" value={warrantyClaims.length} icon={<Shield className="h-5 w-5" />} />
          <KPICard title="Avg Turnaround" value="6.2 days" trend="up" trendValue="0.8 days faster" icon={<Package className="h-5 w-5" />} />
        </div>

        <div className="rounded-lg border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">RMA Tracking</h3>
            <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90">+ New RMA</button>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>RMA ID</th><th>Customer</th><th>Product</th><th>Reason</th><th>Status</th><th>Warranty</th><th>Created</th></tr>
            </thead>
            <tbody>
              {rmas.map((r) => (
                <tr key={r.id}>
                  <td className="font-mono text-xs">{r.id}</td>
                  <td>{r.customer}</td>
                  <td className="text-xs">{r.product}</td>
                  <td className="text-xs">{r.reason}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td>{r.warranty ? <span className="text-xs text-status-green font-medium">Yes</span> : <span className="text-xs text-muted-foreground">No</span>}</td>
                  <td className="text-xs font-mono">{r.dateCreated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Warranty Claims</h3>
          <table className="data-table">
            <thead>
              <tr><th>Claim ID</th><th>Customer</th><th>Product</th><th>Date</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              {warrantyClaims.map((w) => (
                <tr key={w.id}>
                  <td className="font-mono text-xs">{w.id}</td>
                  <td>{w.customer}</td>
                  <td className="text-xs">{w.product}</td>
                  <td className="text-xs font-mono">{w.claimDate}</td>
                  <td className="font-mono">{w.amount}</td>
                  <td><StatusBadge status={w.status === "Approved" ? "Green" : w.status === "Under Review" ? "Yellow" : "Closed"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
