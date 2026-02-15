import { Router } from 'express';
import multer from 'multer';
import { documentController } from '../controllers/documentController';
import { authMiddleware, roleMiddleware } from '../middleware/auth';
import { paginationValidation } from '../utils/validation';

const router = Router();

// Configure multer for file uploads (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow common document types
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, images, and office documents are allowed.'));
    }
  },
});

// All routes require authentication
router.use(authMiddleware);

// Get all documents with pagination and optional site filter
router.get('/', paginationValidation, documentController.getAllDocuments);

// Get document by ID
router.get('/:id', documentController.getDocumentById);

// Upload new document
router.post('/', upload.single('file'), documentController.createDocument);

// Update document metadata
router.put('/:id', documentController.updateDocument);

// Delete document (ADMIN or MANAGER only)
router.delete('/:id', roleMiddleware(['ADMIN', 'MANAGER']), documentController.deleteDocument);

export default router;
