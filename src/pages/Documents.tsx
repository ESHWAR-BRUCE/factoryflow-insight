import { DashboardLayout } from "@/components/DashboardLayout";
import { KPICard } from "@/components/StatusBadge";
import { FileText, FolderOpen, MessageSquare, BookOpen } from "lucide-react";

const documents = [
  { name: "BOM_AvionicsV3_Rev4.xlsx", type: "BOM", program: "PRG-001", version: "Rev 4", updatedBy: "M. Weber", date: "2026-03-24" },
  { name: "ECO-2026-0087.pdf", type: "ECO", program: "PRG-002", version: "v1.0", updatedBy: "K. Schneider", date: "2026-03-22" },
  { name: "TestPlan_BMS_Thermal.docx", type: "Test Plan", program: "PRG-004", version: "Draft", updatedBy: "T. Müller", date: "2026-03-20" },
  { name: "FAI_Report_5GController.pdf", type: "FAI Report", program: "PRG-005", version: "Final", updatedBy: "A. Patel", date: "2026-03-18" },
  { name: "Drawing_Housing_Top.step", type: "CAD Drawing", program: "PRG-001", version: "Rev 2", updatedBy: "L. Chen", date: "2026-03-15" },
];

const threads = [
  { title: "ECO-0087 review comments", program: "PRG-002", messages: 12, lastActivity: "2 hours ago" },
  { title: "BMS thermal test failures", program: "PRG-004", messages: 8, lastActivity: "4 hours ago" },
  { title: "5G controller firmware sign-off", program: "PRG-005", messages: 5, lastActivity: "1 day ago" },
];

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="module-header">Documents & Collaboration</h1>
          <p className="text-sm text-muted-foreground mt-1">Document versioning, engineering viewers, communication threads</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KPICard title="Total Documents" value={documents.length} icon={<FileText className="h-5 w-5" />} />
          <KPICard title="Pending Reviews" value={2} icon={<FolderOpen className="h-5 w-5" />} />
          <KPICard title="Active Threads" value={threads.length} icon={<MessageSquare className="h-5 w-5" />} />
          <KPICard title="KB Articles" value={47} icon={<BookOpen className="h-5 w-5" />} />
        </div>

        <div className="rounded-lg border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Recent Documents</h3>
            <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90">+ Upload</button>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Document</th><th>Type</th><th>Program</th><th>Version</th><th>Updated By</th><th>Date</th></tr>
            </thead>
            <tbody>
              {documents.map((d, i) => (
                <tr key={i} className="cursor-pointer">
                  <td className="font-medium text-primary">{d.name}</td>
                  <td><span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs">{d.type}</span></td>
                  <td className="font-mono text-xs">{d.program}</td>
                  <td className="text-xs">{d.version}</td>
                  <td className="text-xs">{d.updatedBy}</td>
                  <td className="text-xs font-mono">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Communication Threads</h3>
          <div className="space-y-3">
            {threads.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-md bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.program} · {t.messages} messages</p>
                </div>
                <span className="text-xs text-muted-foreground">{t.lastActivity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
