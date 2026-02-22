import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import prisma from '../utils/prisma';
import { PaginationParams, PaginatedResponse } from '../types';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'asm-documents';

export const documentService = {
  // Upload document to S3 and save metadata to database
  async uploadDocument(file: Express.Multer.File, siteId: string, uploadedBy: string, docType: string) {
    const fileKey = `sites/${siteId}/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await s3Client.send(command);

      // Save document metadata to database
      const document = await prisma.document.create({
        data: {
          siteId,
          uploadedBy,
          fileName: file.originalname,
          fileUrl: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`,
          fileKey,
          fileSize: file.size,
          fileType: file.mimetype,
          docType,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          site: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return document;
    } catch (error: any) {
      throw new Error(`Failed to upload document: ${error.message}`);
    }
  },

  // Get all documents with pagination and filtering
  async getDocuments(filters?: {
    siteId?: string;
    docType?: string;
  }, params?: PaginationParams): Promise<PaginatedResponse<any>> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.siteId) where.siteId = filters.siteId;
    if (filters?.docType) where.docType = filters.docType;

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          site: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.document.count({ where }),
    ]);

    return {
      data: documents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // Get document by ID
  async getDocumentById(id: string) {
    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        site: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!document) {
      throw new Error('Document not found');
    }

    return document;
  },

  // Get presigned URL for document download
  async getDocumentDownloadUrl(id: string): Promise<string> {
    const document = await this.getDocumentById(id);

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: document.fileKey,
    });

    // URL expires in 1 hour
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  },

  // Update document metadata
  async updateDocument(id: string, updatedData: any) {
    const document = await prisma.document.findUnique({ where: { id } });

    if (!document) {
      throw new Error('Document not found');
    }

    return await prisma.document.update({
      where: { id },
      data: {
        ...(updatedData.docType && { docType: updatedData.docType }),
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        site: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },

  // Delete document from S3 and database
  async deleteDocument(id: string) {
    const document = await prisma.document.findUnique({ where: { id } });

    if (!document) {
      throw new Error('Document not found');
    }

    // Delete from S3
    const deleteCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: document.fileKey,
    });

    try {
      await s3Client.send(deleteCommand);
    } catch (error: any) {
      console.error(`Error deleting file from S3: ${error.message}`);
      // Continue with database deletion even if S3 deletion fails
    }

    // Delete from database
    return await prisma.document.delete({
      where: { id },
    });
  },
};
