// Type definitions for the ASM application

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  WORKER = 'WORKER',
  OFFICE_ADMIN = 'OFFICE_ADMIN',
}

export enum SiteStatus {
  PLANNING = 'PLANNING',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export enum OperationStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  CANCELLED = 'CANCELLED',
}

export enum DocumentType {
  FORM = 'FORM',
  PHOTO = 'PHOTO',
  REPORT = 'REPORT',
  CERTIFICATE = 'CERTIFICATE',
  SAFETY_PLAN = 'SAFETY_PLAN',
  OTHER = 'OTHER',
}

export enum ChecklistStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
