"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteController = void 0;
const siteService_1 = require("../services/siteService");
exports.siteController = {
    async createSite(req, res) {
        try {
            const siteData = req.body;
            const site = await siteService_1.siteService.createSite(siteData);
            res.status(201).json(site);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async getAllSites(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await siteService_1.siteService.getAllSites(page, limit);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async getSiteById(req, res) {
        try {
            const { id } = req.params;
            const site = await siteService_1.siteService.getSiteById(id);
            res.status(200).json(site);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    async updateSite(req, res) {
        try {
            const { id } = req.params;
            const siteData = req.body;
            const site = await siteService_1.siteService.updateSite(id, siteData);
            res.status(200).json(site);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async deleteSite(req, res) {
        try {
            const { id } = req.params;
            await siteService_1.siteService.deleteSite(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async getSitesByManager(req, res) {
        try {
            const { managerId } = req.params;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await siteService_1.siteService.getSitesByManager(managerId, page, limit);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
//# sourceMappingURL=siteController.js.map