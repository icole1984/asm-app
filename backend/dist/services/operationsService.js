"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operationsService = void 0;
const prisma_1 = require("../utils/prisma");
exports.operationsService = {
    async createOperation(data) {
        return await prisma_1.prisma.siteOperation.create({
            data: {
                siteId: data.siteId,
                operationType: data.operationType,
                description: data.description,
                startTime: new Date(data.startTime),
                endTime: data.endTime ? new Date(data.endTime) : null,
                duration: data.duration,
                workersCount: data.workersCount,
                recordedBy: data.recordedBy,
            },
        });
    },
    async getOperationsBySite(siteId) {
        return await prisma_1.prisma.siteOperation.findMany({
            where: {
                siteId,
            },
            include: {
                user: true,
            },
        });
    },
    async updateOperation(id, data) {
        return await prisma_1.prisma.siteOperation.update({
            where: {
                id,
            },
            data: {
                status: data.status,
                endTime: data.endTime ? new Date(data.endTime) : null,
                duration: data.duration,
            },
        });
    },
    async deleteOperation(id) {
        return await prisma_1.prisma.siteOperation.delete({
            where: {
                id,
            },
        });
    },
    async getOperationById(id) {
        return await prisma_1.prisma.siteOperation.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
                site: true,
            },
        });
    },
};
//# sourceMappingURL=operationsService.js.map