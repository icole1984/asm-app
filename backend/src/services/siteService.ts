import prisma from '../utils/prisma';
import { PaginationParams, PaginatedResponse } from '../types';

export const siteService = {
  // Create a new site
  async createSite(siteData: any) {
    return await prisma.site.create({
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
            role: true,
          },
        },
      },
    });
  },

  // Get all sites with pagination
  async getAllSites(params?: PaginationParams): Promise<PaginatedResponse<any>> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const [sites, total] = await Promise.all([
      prisma.site.findMany({
        skip,
        take: limit,
        include: {
          manager: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
          _count: {
            select: {
              operations: true,
              documents: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.site.count(),
    ]);

    return {
      data: sites,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // Get site by ID
  async getSiteById(siteId: string) {
    const site = await prisma.site.findUnique({
      where: { id: siteId },
      include: {
        manager: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
        operations: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
        documents: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
        _count: {
          select: {
            operations: true,
            documents: true,
            checklists: true,
          },
        },
      },
    });

    if (!site) {
      throw new Error('Site not found');
    }

    return site;
  },

  // Update site
  async updateSite(siteId: string, updatedData: any) {
    const site = await prisma.site.findUnique({ where: { id: siteId } });
    
    if (!site) {
      throw new Error('Site not found');
    }

    return await prisma.site.update({
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
            role: true,
          },
        },
      },
    });
  },

  // Delete site
  async deleteSite(siteId: string) {
    const site = await prisma.site.findUnique({ where: { id: siteId } });
    
    if (!site) {
      throw new Error('Site not found');
    }

    // Delete cascades to operations, documents, checklists via schema
    return await prisma.site.delete({
      where: { id: siteId },
    });
  },

  // Get sites by manager
  async getSitesByManager(managerId: string, params?: PaginationParams): Promise<PaginatedResponse<any>> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const [sites, total] = await Promise.all([
      prisma.site.findMany({
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
              role: true,
            },
          },
          _count: {
            select: {
              operations: true,
              documents: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.site.count({ where: { managerId } }),
    ]);

    return {
      data: sites,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
};
