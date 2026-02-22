import { Router } from 'express';
import multer from 'multer';
import {
  uploadDocument,
  getAllDocuments,
  getDocumentById,
  getDocumentDownloadUrl,
  updateDocument,
  deleteDocument,
} from '../controllers/documentController';
import { authenticate, authorize } from '../middleware/auth';
import { createDocumentValidation, paginationValidation, idValidation } from '../utils/validation';
import { validationResult } from 'express-validator';

const router = Router();

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow specific file types
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, PDFs, and Office documents are allowed.'));
    }
  },
});

// Middleware to handle validation errors
const handleValidationErrors = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// All document routes require authentication
router.use(authenticate);

// Upload document
router.post(
  '/',
  upload.single('file'),
  createDocumentValidation,
  handleValidationErrors,
  uploadDocument
);

// Get all documents
router.get(
  '/',
  paginationValidation,
  handleValidationErrors,
  getAllDocuments
);

// Get document by ID
router.get(
  '/:id',
  idValidation,
  handleValidationErrors,
  getDocumentById
);

// Get document download URL
router.get(
  '/:id/download',
  idValidation,
  handleValidationErrors,
  getDocumentDownloadUrl
);

// Update document
router.put(
  '/:id',
  authorize(['ADMIN', 'MANAGER', 'OFFICE_ADMIN']),
  idValidation,
  handleValidationErrors,
  updateDocument
);

// Delete document
router.delete(
  '/:id',
  authorize(['ADMIN', 'MANAGER', 'OFFICE_ADMIN']),
  idValidation,
  handleValidationErrors,
  deleteDocument
);

export default router;
