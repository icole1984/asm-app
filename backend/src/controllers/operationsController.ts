import { Request, Response } from 'express';
import { operationsService } from '../services/operationsService';

export const operationsController = {
    // Create New Operation
    async createOperation(req: Request, res: Response) {
        try {
            const operation = await operationsService.createOperation(req.body);
            res.status(201).json(operation);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    // Get Operations by Site
    async getOperationsBySite(req: Request, res: Response) {
        try {
            const operations = await operationsService.getOperationsBySite(req.params.siteId);
            res.status(200).json(operations);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get Operation by ID
    async getOperationById(req: Request, res: Response) {
        try {
            const operation = await operationsService.getOperationById(req.params.id);
            if (!operation) {
                return res.status(404).json({ error: 'Operation not found' });
            }
            res.status(200).json(operation);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update Operation
    async updateOperation(req: Request, res: Response) {
        try {
            const operation = await operationsService.updateOperation(req.params.id, req.body);
            res.status(200).json(operation);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    // Delete Operation
    async deleteOperation(req: Request, res: Response) {
        try {
            await operationsService.deleteOperation(req.params.id);
            res.status(200).json({ message: 'Operation deleted successfully!' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
};
