import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const siteService = {
  async createSite(data: any) {
    return await prisma.site.create({
      data: {
        name: data.name,
        location: data.location,
        address: data.address,
        postcode: data.postcode,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        managerId: data.managerId,
      },
    });
  },

  async getSiteById(id: string) {
    return await prisma.site.findUnique({
      where: { id },
      include: {
        manager: true,
        operations: true,
        documents: true,
        checklists: true,
      },
    });
  },

  async getAllSites(managerId?: string) {
    return await prisma.site.findMany({
      where: managerId ? { managerId } : {},
      include: { manager: true, operations: true },
    });
  },

  async updateSite(id: string, data: any) {
    return await prisma.site.update({
      where: { id },
      data: {
        name: data.name,
        location: data.location,
        address: data.address,
        postcode: data.postcode,
        status: data.status,
      },
    });
  },

  async deleteSite(id: string) {
    return await prisma.site.delete({ where: { id } });
  },
};