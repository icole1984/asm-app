export declare const operationsService: {
    createOperation(data: any): Promise<{
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
    }>;
    getOperationsBySite(siteId: string): Promise<({
        user: {
            id: string;
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
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
    })[]>;
    updateOperation(id: string, data: any): Promise<{
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
    }>;
    deleteOperation(id: string): Promise<{
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
    }>;
    getOperationById(id: string): Promise<({
        user: {
            id: string;
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            role: import(".prisma/client").$Enums.UserRole;
            createdAt: Date;
            updatedAt: Date;
        };
        site: {
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
        };
    } & {
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
    }) | null>;
};
//# sourceMappingURL=operationsService.d.ts.map