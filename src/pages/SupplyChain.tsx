import { DashboardLayout } from "@/components/DashboardLayout";
import { StatusBadge, KPICard } from "@/components/StatusBadge";
import { suppliers } from "@/data/mockData";
import { Truck, Package, Globe, Clock } from "lucide-react";

const inventory = [
  { part: "MCU-STM32F4", location: "Munich", allocated: 1200, available: 350, status: "Active" as const },
  { part: "CAP-100uF-X7R", location: "Shanghai", allocated: 8500, available: 2200, status: "Active" as const },
  { part: "IC-TPS65982", location: "Toulouse", allocated: 600, available: 40, status: "NRND" as const },
  { part: "CONN-USB-C", location: "Berlin", allocated: 3000, available: 800, status: "Active" as const },
  { part: "MOSFET-IRF540", location: "Munich", allocated: 900, available: 0, status: "EOL" as const },
];

const shipments = [
  { id: "SHP-4401", origin: "Shenzhen", destination: "Munich", eta: "2026-03-28", status: "In Transit", carrier: "DHL" },
  { id: "SHP-4402", origin: "Austin, TX", destination: "Toulouse", eta: "2026-04-02", status: "Customs", carrier: "FedEx" },
  { id: "SHP-4403", origin: "Tokyo", destination: "Shanghai", eta: "2026-03-26", status: "Delivered", carrier: "Kuehne+Nagel" },
];

export default function SupplyChainPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="module-header">Supply Chain & Materials</h1>
          <p className="text-sm text-muted-foreground mt-1">PO tracking, inventory, logistics, and supplier scorecards</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard title="Active Suppliers" value={suppliers.length} icon={<Globe className="h-5 w-5" />} />
          <KPICard title="Open POs" value={suppliers.reduce((s, sup) => s + sup.activePOs, 0)} icon={<Package className="h-5 w-5" />} />
          <KPICard title="In Transit" value={shipments.filter(s => s.status === "In Transit").length} icon={<Truck className="h-5 w-5" />} />
          <KPICard title="EOL Parts" value={1} trend="down" trendValue="Needs redesign" icon={<Clock className="h-5 w-5" />} />
        </div>

        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Supplier Scorecards</h3>
          <table className="data-table">
            <thead>
              <tr><th>Supplier</th><th>Rating</th><th>On-Time Delivery</th><th>Quality Score</th><th>Active POs</th><th>Status</th></tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s.id}>
                  <td className="font-medium">{s.name}</td>
                  <td><span className="font-mono">{s.rating}</span>/5.0</td>
                  <td className={`font-mono ${s.onTimeDelivery >= 95 ? "text-status-green" : s.onTimeDelivery >= 90 ? "text-status-yellow" : "text-status-red"}`}>{s.onTimeDelivery}%</td>
                  <td className="font-mono">{s.qualityScore}%</td>
                  <td>{s.activePOs}</td>
                  <td><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card p-5">
            <h3 className="text-sm font-semibold mb-4">Inventory (Global)</h3>
            <table className="data-table">
              <thead>
                <tr><th>Part</th><th>Location</th><th>Allocated</th><th>Available</th><th>Lifecycle</th></tr>
              </thead>
              <tbody>
                {inventory.map((item, i) => (
                  <tr key={i}>
                    <td className="font-mono text-xs">{item.part}</td>
                    <td className="text-xs">{item.location}</td>
                    <td className="font-mono">{item.allocated.toLocaleString()}</td>
                    <td className={`font-mono ${item.available === 0 ? "text-status-red" : item.available < 100 ? "text-status-yellow" : ""}`}>{item.available.toLocaleString()}</td>
                    <td><StatusBadge status={item.status === "EOL" ? "Red" : item.status === "NRND" ? "Yellow" : "Green"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border bg-card p-5">
            <h3 className="text-sm font-semibold mb-4">Shipment Tracking</h3>
            <div className="space-y-3">
              {shipments.map((s) => (
                <div key={s.id} className="p-3 rounded-md bg-muted/30">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{s.id}</p>
                    <StatusBadge status={s.status === "Delivered" ? "Green" : s.status === "Customs" ? "Yellow" : "Running"} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{s.origin} → {s.destination} · {s.carrier}</p>
                  <p className="text-xs font-mono mt-1">ETA: {s.eta}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
