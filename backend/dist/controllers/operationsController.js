"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operationsController = void 0;
const operationsService_1 = require("../services/operationsService");
exports.operationsController = {
    // Create New Operation
    async createOperation(req, res) {
        try {
            const operation = await operationsService_1.operationsService.createOperation(req.body);
            res.status(201).json(operation);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Get Operations by Site
    async getOperationsBySite(req, res) {
        try {
            const operations = await operationsService_1.operationsService.getOperationsBySite(req.params.siteId);
            res.status(200).json(operations);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Get Operation by ID
    async getOperationById(req, res) {
        try {
            const operation = await operationsService_1.operationsService.getOperationById(req.params.id);
            if (!operation) {
                return res.status(404).json({ error: 'Operation not found' });
            }
            res.status(200).json(operation);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Update Operation
    async updateOperation(req, res) {
        try {
            const operation = await operationsService_1.operationsService.updateOperation(req.params.id, req.body);
            res.status(200).json(operation);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    // Delete Operation
    async deleteOperation(req, res) {
        try {
            await operationsService_1.operationsService.deleteOperation(req.params.id);
            res.status(200).json({ message: 'Operation deleted successfully!' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
//# sourceMappingURL=operationsController.js.map