import { Request, Response } from 'express';
export declare const operationsController: {
    createOperation(req: Request, res: Response): Promise<void>;
    getOperationsBySite(req: Request, res: Response): Promise<void>;
    getOperationById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateOperation(req: Request, res: Response): Promise<void>;
    deleteOperation(req: Request, res: Response): Promise<void>;
};
//# sourceMappingURL=operationsController.d.ts.map