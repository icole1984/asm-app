import { UserRole, SiteStatus, OperationStatus, DocumentType, ChecklistStatus } from '@prisma/client';

export interface CreateSiteDto {
  name: string;
  location: string;
  address: string;
  postcode: string;
  startDate: string;
  endDate?: string;
  status?: SiteStatus;
  managerId: string;
}

export interface UpdateSiteDto {
  name?: string;
  location?: string;
  address?: string;
  postcode?: string;
  startDate?: string;
  endDate?: string;
  status?: SiteStatus;
  managerId?: string;
}

export interface CreateOperationDto {
  siteId: string;
  operationType: string;
  description: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  workersCount: number;
  status?: OperationStatus;
  recordedBy: string;
}

export interface UpdateOperationDto {
  status?: OperationStatus;
  endTime?: string;
  duration?: number;
}

export interface CreateDocumentDto {
  siteId: string;
  uploadedBy: string;
  docType: DocumentType;
}

export interface PaginationQuery {
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

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  token: string;
}
