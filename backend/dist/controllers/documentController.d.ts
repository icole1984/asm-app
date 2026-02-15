import { Request, Response } from 'express';
export declare const documentController: {
    getAllDocuments(req: Request, res: Response): Promise<void>;
    getDocumentById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    createDocument(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateDocument(req: Request, res: Response): Promise<void>;
    deleteDocument(req: Request, res: Response): Promise<void>;
};
//# sourceMappingURL=documentController.d.ts.map