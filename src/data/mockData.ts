// Mock data for the entire FactoryIQ portal
import { 
  CheckCircle, AlertTriangle, XCircle 
} from "lucide-react";

export type HealthStatus = "Green" | "Yellow" | "Red";

export interface Program {
  id: string;
  name: string;
  customer: string;
  status: HealthStatus;
  progress: number;
  milestones: number;
  completedMilestones: number;
  sites: string[];
  owner: string;
  startDate: string;
  endDate: string;
}

export interface WorkOrder {
  id: string;
  programId: string;
  line: string;
  shift: string;
  planned: number;
  actual: number;
  yield: number;
  cycleTime: number;
  status: "Running" | "Completed" | "Delayed" | "On Hold";
}

export interface NCR {
  id: string;
  title: string;
  severity: "Critical" | "Major" | "Minor";
  status: "Open" | "Investigation" | "Corrective Action" | "Closed";
  raisedDate: string;
  owner: string;
  program: string;
}

export interface Supplier {
  id: string;
  name: string;
  rating: number;
  onTimeDelivery: number;
  qualityScore: number;
  activePOs: number;
  status: "Approved" | "Conditional" | "Under Review";
}

export interface RMA {
  id: string;
  customer: string;
  product: string;
  reason: string;
  status: "Received" | "Diagnostics" | "Repair" | "Testing" | "Shipped";
  dateCreated: string;
  warranty: boolean;
}

export interface Certification {
  id: string;
  name: string;
  standard: string;
  expiryDate: string;
  site: string;
  status: "Valid" | "Expiring Soon" | "Expired";
}

export const programs: Program[] = [
  { id: "PRG-001", name: "Avionics Control Unit v3", customer: "Airbus Defense", status: "Green", progress: 78, milestones: 12, completedMilestones: 9, sites: ["Munich", "Toulouse"], owner: "M. Weber", startDate: "2025-01-15", endDate: "2026-06-30" },
  { id: "PRG-002", name: "Rail Signaling Module", customer: "Siemens Mobility", status: "Yellow", progress: 52, milestones: 8, completedMilestones: 4, sites: ["Berlin"], owner: "K. Schneider", startDate: "2025-03-01", endDate: "2026-09-15" },
  { id: "PRG-003", name: "Medical Imaging Board", customer: "Philips Healthcare", status: "Green", progress: 91, milestones: 10, completedMilestones: 9, sites: ["Eindhoven", "Shanghai"], owner: "L. Chen", startDate: "2024-06-01", endDate: "2026-01-31" },
  { id: "PRG-004", name: "EV Battery Management System", customer: "BMW Group", status: "Red", progress: 34, milestones: 15, completedMilestones: 5, sites: ["Munich", "Spartanburg"], owner: "T. Müller", startDate: "2025-06-01", endDate: "2027-03-31" },
  { id: "PRG-005", name: "5G Base Station Controller", customer: "Nokia Networks", status: "Green", progress: 65, milestones: 10, completedMilestones: 6, sites: ["Oulu", "Chennai"], owner: "A. Patel", startDate: "2025-02-15", endDate: "2026-08-31" },
  { id: "PRG-006", name: "Industrial IoT Gateway", customer: "Bosch", status: "Yellow", progress: 45, milestones: 8, completedMilestones: 3, sites: ["Stuttgart"], owner: "R. Fischer", startDate: "2025-07-01", endDate: "2026-12-31" },
];

export const workOrders: WorkOrder[] = [
  { id: "WO-1001", programId: "PRG-001", line: "SMT-A1", shift: "Day", planned: 500, actual: 487, yield: 97.4, cycleTime: 42, status: "Running" },
  { id: "WO-1002", programId: "PRG-001", line: "SMT-A2", shift: "Night", planned: 500, actual: 512, yield: 98.1, cycleTime: 39, status: "Completed" },
  { id: "WO-1003", programId: "PRG-002", line: "PTH-B1", shift: "Day", planned: 200, actual: 156, yield: 94.2, cycleTime: 65, status: "Delayed" },
  { id: "WO-1004", programId: "PRG-003", line: "SMT-C1", shift: "Day", planned: 300, actual: 298, yield: 99.3, cycleTime: 28, status: "Completed" },
  { id: "WO-1005", programId: "PRG-004", line: "SMT-D1", shift: "Day", planned: 150, actual: 98, yield: 91.8, cycleTime: 55, status: "Delayed" },
  { id: "WO-1006", programId: "PRG-005", line: "SMT-E1", shift: "Night", planned: 400, actual: 392, yield: 98.7, cycleTime: 33, status: "Running" },
];

export const ncrs: NCR[] = [
  { id: "NCR-0421", title: "Solder bridge on U14 BGA", severity: "Critical", status: "Investigation", raisedDate: "2026-03-20", owner: "Q. Zhang", program: "PRG-004" },
  { id: "NCR-0420", title: "Wrong component value R47", severity: "Major", status: "Corrective Action", raisedDate: "2026-03-18", owner: "S. Kumar", program: "PRG-002" },
  { id: "NCR-0419", title: "Label misalignment on housing", severity: "Minor", status: "Open", raisedDate: "2026-03-22", owner: "M. Weber", program: "PRG-001" },
  { id: "NCR-0418", title: "Insufficient conformal coating", severity: "Major", status: "Closed", raisedDate: "2026-03-10", owner: "L. Chen", program: "PRG-003" },
  { id: "NCR-0417", title: "AOI false reject rate spike", severity: "Minor", status: "Open", raisedDate: "2026-03-21", owner: "A. Patel", program: "PRG-005" },
];

export const suppliers: Supplier[] = [
  { id: "SUP-001", name: "Murata Manufacturing", rating: 4.8, onTimeDelivery: 98.2, qualityScore: 99.1, activePOs: 23, status: "Approved" },
  { id: "SUP-002", name: "Texas Instruments", rating: 4.6, onTimeDelivery: 95.5, qualityScore: 99.8, activePOs: 18, status: "Approved" },
  { id: "SUP-003", name: "Jabil Circuit", rating: 3.9, onTimeDelivery: 87.3, qualityScore: 96.4, activePOs: 7, status: "Conditional" },
  { id: "SUP-004", name: "Amphenol Corp", rating: 4.5, onTimeDelivery: 96.8, qualityScore: 98.9, activePOs: 12, status: "Approved" },
  { id: "SUP-005", name: "Flex Ltd", rating: 3.7, onTimeDelivery: 82.1, qualityScore: 94.5, activePOs: 5, status: "Under Review" },
];

export const rmas: RMA[] = [
  { id: "RMA-2201", customer: "Airbus Defense", product: "Avionics Control Unit v2", reason: "Power supply failure", status: "Diagnostics", dateCreated: "2026-03-15", warranty: true },
  { id: "RMA-2202", customer: "Siemens Mobility", product: "Rail Signaling Module", reason: "Communication error", status: "Repair", dateCreated: "2026-03-12", warranty: true },
  { id: "RMA-2203", customer: "BMW Group", product: "Battery Mgmt Board v1", reason: "Thermal shutdown", status: "Testing", dateCreated: "2026-03-08", warranty: false },
  { id: "RMA-2204", customer: "Nokia Networks", product: "5G Controller", reason: "Firmware corruption", status: "Received", dateCreated: "2026-03-22", warranty: true },
];

export const certifications: Certification[] = [
  { id: "CERT-01", name: "AS9100D", standard: "Aerospace QMS", expiryDate: "2027-06-15", site: "Munich", status: "Valid" },
  { id: "CERT-02", name: "ISO 13485", standard: "Medical Devices QMS", expiryDate: "2026-05-01", site: "Eindhoven", status: "Expiring Soon" },
  { id: "CERT-03", name: "IATF 16949", standard: "Automotive QMS", expiryDate: "2027-11-30", site: "Munich", status: "Valid" },
  { id: "CERT-04", name: "NADCAP", standard: "Special Processes", expiryDate: "2026-04-10", site: "Toulouse", status: "Expiring Soon" },
  { id: "CERT-05", name: "ISO 9001:2015", standard: "General QMS", expiryDate: "2025-12-31", site: "Berlin", status: "Expired" },
  { id: "CERT-06", name: "IPC-A-610G", standard: "Electronics Assembly", expiryDate: "2028-01-15", site: "Shanghai", status: "Valid" },
];

export const productionTrend = [
  { date: "Mar 1", planned: 1200, actual: 1180, yield: 97.2 },
  { date: "Mar 5", planned: 1300, actual: 1250, yield: 96.8 },
  { date: "Mar 10", planned: 1100, actual: 1095, yield: 98.1 },
  { date: "Mar 15", planned: 1400, actual: 1320, yield: 95.5 },
  { date: "Mar 20", planned: 1350, actual: 1340, yield: 97.9 },
  { date: "Mar 25", planned: 1500, actual: 1485, yield: 98.4 },
];

export const defectPareto = [
  { defect: "Solder Bridge", count: 45, percentage: 28 },
  { defect: "Tombstone", count: 32, percentage: 20 },
  { defect: "Missing Comp", count: 24, percentage: 15 },
  { defect: "Wrong Part", count: 18, percentage: 11 },
  { defect: "Cold Joint", count: 15, percentage: 9 },
  { defect: "Insufficient", count: 12, percentage: 8 },
  { defect: "Other", count: 14, percentage: 9 },
];

export const kpiSummary = {
  onTimeDelivery: 94.2,
  firstPassYield: 97.6,
  openNCRs: 8,
  customerSatisfaction: 4.3,
  capacityUtilization: 82,
  activePrograms: 6,
  openRMAs: 4,
  pendingAudits: 2,
};

export function getStatusColor(status: HealthStatus): string {
  switch (status) {
    case "Green": return "text-status-green";
    case "Yellow": return "text-status-yellow";
    case "Red": return "text-status-red";
  }
}

export function getStatusBg(status: HealthStatus): string {
  switch (status) {
    case "Green": return "bg-status-green/10 text-status-green";
    case "Yellow": return "bg-status-yellow/10 text-status-yellow";
    case "Red": return "bg-status-red/10 text-status-red";
  }
}
