import { Request, Response } from 'express';
import { siteService } from '../services/siteService';

export const siteController = {
    async createSite(req: Request, res: Response) {
        try {
            const siteData = req.body;
            const site = await siteService.createSite(siteData);
            res.status(201).json(site);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async getAllSites(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const result = await siteService.getAllSites(page, limit);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    async getSiteById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const site = await siteService.getSiteById(id);
            res.status(200).json(site);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    },

    async updateSite(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const siteData = req.body;
            const site = await siteService.updateSite(id, siteData);
            res.status(200).json(site);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteSite(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await siteService.deleteSite(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    async getSitesByManager(req: Request, res: Response) {
        try {
            const { managerId } = req.params;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const result = await siteService.getSitesByManager(managerId, page, limit);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },
};