// operationsController.ts

import { Request, Response } from 'express';
import { Operation } from '../models/Operation'; // Import your Operation model

// Create New Operation
export const createOperation = async (req: Request, res: Response) => {
    try {
        const operation = new Operation(req.body);
        await operation.save();
        res.status(201).send(operation);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get Operations by Site
export const getOperationsBySite = async (req: Request, res: Response) => {
    try {
        const operations = await Operation.find({ siteId: req.params.siteId });
        res.status(200).send(operations);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get Operation by ID
export const getOperationById = async (req: Request, res: Response) => {
    try {
        const operation = await Operation.findById(req.params.id);
        if (!operation) {
            return res.status(404).send();
        }
        res.status(200).send(operation);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update Operation
export const updateOperation = async (req: Request, res: Response) => {
    try {
        const operation = await Operation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!operation) {
            return res.status(404).send();
        }
        res.status(200).send(operation);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete Operation
export const deleteOperation = async (req: Request, res: Response) => {
    try {
        const operation = await Operation.findByIdAndDelete(req.params.id);
        if (!operation) {
            return res.status(404).send();
        }
        res.status(200).send({ message: 'Operation deleted successfully!' });
    } catch (error) {
        res.status(500).send(error);
    }
};
