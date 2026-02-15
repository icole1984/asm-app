import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import documentService from '../services/documentService';

export const documentController = {
    // Get all documents with pagination
    async getAllDocuments(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const siteId = req.query.siteId as string;
            const skip = (page - 1) * limit;

            const where = siteId ? { siteId } : {};

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
                                location: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                }),
                prisma.document.count({ where }),
            ]);

            res.status(200).json({
                documents,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            });
        } catch (error: any) {
            res.status(500).json({ error: 'Error retrieving documents', message: error.message });
        }
    },

    // Get a document by ID
    async getDocumentById(req: Request, res: Response) {
        const id = req.params.id;
        try {
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
                            location: true,
                        },
                    },
                },
            });

            if (!document) {
                return res.status(404).json({ error: 'Document not found' });
            }

            res.status(200).json(document);
        } catch (error: any) {
            res.status(500).json({ error: 'Error retrieving document', message: error.message });
        }
    },

    // Create a new document (with file upload)
    async createDocument(req: Request, res: Response) {
        try {
            const { siteId, docType, uploadedBy } = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            // Upload to S3
            const fileUrl = await documentService.uploadDocument(
                `${siteId}/${Date.now()}-${file.originalname}`,
                file.buffer
            );

            // Save document metadata to database
            const document = await prisma.document.create({
                data: {
                    siteId,
                    uploadedBy,
                    fileName: file.originalname,
                    fileUrl,
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

            res.status(201).json(document);
        } catch (error: any) {
            res.status(500).json({ error: 'Error creating document', message: error.message });
        }
    },

    // Update a document by ID
    async updateDocument(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const { docType } = req.body;

            const document = await prisma.document.update({
                where: { id },
                data: {
                    ...(docType && { docType }),
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
                },
            });

            res.status(200).json(document);
        } catch (error: any) {
            res.status(500).json({ error: 'Error updating document', message: error.message });
        }
    },

    // Delete a document by ID
    async deleteDocument(req: Request, res: Response) {
        const id = req.params.id;
        try {
            await prisma.document.delete({
                where: { id },
            });

            res.status(200).json({ message: 'Document deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ error: 'Error deleting document', message: error.message });
        }
    },
};