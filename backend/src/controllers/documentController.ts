import { Request, Response } from 'express';
import { documentService } from '../services/documentService';

// Upload document
export const uploadDocument = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { siteId, docType } = req.body;
    const uploadedBy = (req as any).user?.id;

    if (!uploadedBy) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const document = await documentService.uploadDocument(
      req.file,
      siteId,
      uploadedBy,
      docType
    );

    res.status(201).json(document);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all documents
export const getAllDocuments = async (req: Request, res: Response) => {
  try {
    const { siteId, docType, page, limit } = req.query;

    const filters: any = {};
    if (siteId) filters.siteId = siteId as string;
    if (docType) filters.docType = docType as string;

    const pagination = {
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 10,
    };

    const result = await documentService.getDocuments(filters, pagination);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a document by ID
export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const document = await documentService.getDocumentById(req.params.id);
    res.status(200).json(document);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Get document download URL
export const getDocumentDownloadUrl = async (req: Request, res: Response) => {
  try {
    const url = await documentService.getDocumentDownloadUrl(req.params.id);
    res.status(200).json({ downloadUrl: url });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Update a document by ID
export const updateDocument = async (req: Request, res: Response) => {
  try {
    const document = await documentService.updateDocument(req.params.id, req.body);
    res.status(200).json(document);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a document by ID
export const deleteDocument = async (req: Request, res: Response) => {
  try {
    await documentService.deleteDocument(req.params.id);
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};