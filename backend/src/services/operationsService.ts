import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const operationsService = {
  async createOperation(data: any) {
    return await prisma.siteOperation.create({
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

  async getOperationsBySite(siteId: string) {
    return await prisma.siteOperation.findMany({
      where: {
        siteId,
      },
      include: {
        user: true,
      },
    });
  },

  async updateOperation(id: string, data: any) {
    return await prisma.siteOperation.update({
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

  async deleteOperation(id: string) {
    return await prisma.siteOperation.delete({
      where: {
        id,
      },
    });
  },

  async getOperationById(id: string) {
    return await prisma.siteOperation.findUnique({
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
