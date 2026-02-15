"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteService = void 0;
const prisma_1 = require("../utils/prisma");
exports.siteService = {
    // Function to create a new site
    async createSite(siteData) {
        return await prisma_1.prisma.site.create({
            data: {
                name: siteData.name,
                location: siteData.location,
                address: siteData.address,
                postcode: siteData.postcode,
                startDate: new Date(siteData.startDate),
                endDate: siteData.endDate ? new Date(siteData.endDate) : null,
                status: siteData.status || 'ACTIVE',
                managerId: siteData.managerId,
            },
            include: {
                manager: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    },
    // Function to retrieve all sites with pagination
    async getAllSites(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [sites, total] = await Promise.all([
            prisma_1.prisma.site.findMany({
                skip,
                take: limit,
                include: {
                    manager: {
                        select: {
                            id: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            prisma_1.prisma.site.count(),
        ]);
        return {
            sites,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    },
    // Function to get a site by its ID
    async getSiteById(siteId) {
        const site = await prisma_1.prisma.site.findUnique({
            where: { id: siteId },
            include: {
                manager: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                operations: {
                    orderBy: {
                        startTime: 'desc',
                    },
                    take: 10,
                },
                documents: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 10,
                },
                checklists: true,
            },
        });
        if (!site) {
            throw new Error('Site not found');
        }
        return site;
    },
    // Function to update an existing site
    async updateSite(siteId, updatedData) {
        return await prisma_1.prisma.site.update({
            where: { id: siteId },
            data: {
                ...(updatedData.name && { name: updatedData.name }),
                ...(updatedData.location && { location: updatedData.location }),
                ...(updatedData.address && { address: updatedData.address }),
                ...(updatedData.postcode && { postcode: updatedData.postcode }),
                ...(updatedData.startDate && { startDate: new Date(updatedData.startDate) }),
                ...(updatedData.endDate && { endDate: new Date(updatedData.endDate) }),
                ...(updatedData.status && { status: updatedData.status }),
                ...(updatedData.managerId && { managerId: updatedData.managerId }),
            },
            include: {
                manager: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    },
    // Function to delete a site
    async deleteSite(siteId) {
        return await prisma_1.prisma.site.delete({
            where: { id: siteId },
        });
    },
    // Function to retrieve sites by manager ID
    async getSitesByManager(managerId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [sites, total] = await Promise.all([
            prisma_1.prisma.site.findMany({
                where: { managerId },
                skip,
                take: limit,
                include: {
                    manager: {
                        select: {
                            id: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            prisma_1.prisma.site.count({ where: { managerId } }),
        ]);
        return {
            sites,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    },
};
//# sourceMappingURL=siteService.js.map