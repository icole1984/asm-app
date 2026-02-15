"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const documentController_1 = require("../controllers/documentController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
// Configure multer for file uploads (memory storage)
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
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
        }
        else {
            cb(new Error('Invalid file type. Only PDF, images, and office documents are allowed.'));
        }
    },
});
// All routes require authentication
router.use(auth_1.authMiddleware);
// Get all documents with pagination and optional site filter
router.get('/', validation_1.paginationValidation, documentController_1.documentController.getAllDocuments);
// Get document by ID
router.get('/:id', documentController_1.documentController.getDocumentById);
// Upload new document
router.post('/', upload.single('file'), documentController_1.documentController.createDocument);
// Update document metadata
router.put('/:id', documentController_1.documentController.updateDocument);
// Delete document (ADMIN or MANAGER only)
router.delete('/:id', (0, auth_1.roleMiddleware)(['ADMIN', 'MANAGER']), documentController_1.documentController.deleteDocument);
exports.default = router;
//# sourceMappingURL=documentRoutes.js.map