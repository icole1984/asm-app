export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  WORKER = 'WORKER',
  OFFICE_ADMIN = 'OFFICE_ADMIN'
}

export enum SiteStatus {
  PLANNING = 'PLANNING',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export enum OperationStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  CANCELLED = 'CANCELLED'
}

export enum ChecklistStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export enum DocumentType {
  FORM = 'FORM',
  PHOTO = 'PHOTO',
  REPORT = 'REPORT',
  CERTIFICATE = 'CERTIFICATE',
  SAFETY_PLAN = 'SAFETY_PLAN',
  OTHER = 'OTHER'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Site {
  id: string;
  name: string;
  location: string;
  address: string;
  postcode: string;
  startDate: string;
  endDate?: string;
  status: SiteStatus;
  managerId: string;
  manager?: User;
  createdAt: string;
  updatedAt: string;
  operations?: SiteOperation[];
  documents?: Document[];
  checklists?: Checklist[];
}

export interface SiteOperation {
  id: string;
  siteId: string;
  site?: Site;
  operationType: string;
  description: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  workersCount: number;
  status: OperationStatus;
  recordedBy: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Checklist {
  id: string;
  siteId: string;
  site?: Site;
  name: string;
  items: ChecklistItem[];
  status: ChecklistStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistItem {
  id: string;
  checklistId: string;
  description: string;
  completed: boolean;
  completedAt?: string;
}

export interface Document {
  id: string;
  siteId: string;
  site?: Site;
  uploadedBy: string;
  user?: User;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  docType: DocumentType;
  createdAt: string;
}

export interface DashboardStats {
  totalSites: number;
  activeSites: number;
  totalOperations: number;
  todayOperations: number;
  activeWorkers: number;
  completedToday: number;
  documentsUploaded: number;
  pendingChecklists: number;
}

export interface ActivityItem {
  id: string;
  type: 'operation' | 'document' | 'site' | 'checklist';
  title: string;
  description: string;
  timestamp: string;
  user?: User;
}
