export declare const siteService: {
    createSite(siteData: any): Promise<{
        manager: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string;
        address: string;
        postcode: string;
        startDate: Date;
        endDate: Date | null;
        managerId: string;
        status: import(".prisma/client").$Enums.SiteStatus;
    }>;
    getAllSites(page?: number, limit?: number): Promise<{
        sites: ({
            manager: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            location: string;
            address: string;
            postcode: string;
            startDate: Date;
            endDate: Date | null;
            managerId: string;
            status: import(".prisma/client").$Enums.SiteStatus;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getSiteById(siteId: string): Promise<{
        operations: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            siteId: string;
            operationType: string;
            description: string;
            startTime: Date;
            endTime: Date | null;
            workersCount: number;
            recordedBy: string;
            status: import(".prisma/client").$Enums.OperationStatus;
            duration: number | null;
        }[];
        documents: {
            id: string;
            createdAt: Date;
            siteId: string;
            uploadedBy: string;
            fileName: string;
            fileUrl: string;
            fileSize: number;
            fileType: string;
            docType: import(".prisma/client").$Enums.DocumentType;
        }[];
        manager: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        checklists: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            siteId: string;
            status: import(".prisma/client").$Enums.ChecklistStatus;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string;
        address: string;
        postcode: string;
        startDate: Date;
        endDate: Date | null;
        managerId: string;
        status: import(".prisma/client").$Enums.SiteStatus;
    }>;
    updateSite(siteId: string, updatedData: any): Promise<{
        manager: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string;
        address: string;
        postcode: string;
        startDate: Date;
        endDate: Date | null;
        managerId: string;
        status: import(".prisma/client").$Enums.SiteStatus;
    }>;
    deleteSite(siteId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        location: string;
        address: string;
        postcode: string;
        startDate: Date;
        endDate: Date | null;
        managerId: string;
        status: import(".prisma/client").$Enums.SiteStatus;
    }>;
    getSitesByManager(managerId: string, page?: number, limit?: number): Promise<{
        sites: ({
            manager: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            location: string;
            address: string;
            postcode: string;
            startDate: Date;
            endDate: Date | null;
            managerId: string;
            status: import(".prisma/client").$Enums.SiteStatus;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
};
//# sourceMappingURL=siteService.d.ts.map