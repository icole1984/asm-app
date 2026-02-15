"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const env_1 = require("../utils/env");
class DocumentService {
    constructor() {
        this.s3 = new aws_sdk_1.default.S3({
            accessKeyId: env_1.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env_1.env.AWS_SECRET_ACCESS_KEY,
            region: env_1.env.AWS_REGION,
        });
    }
    async uploadDocument(fileName, fileContent) {
        const params = {
            Bucket: env_1.env.AWS_S3_BUCKET,
            Key: fileName,
            Body: fileContent,
            ContentType: 'application/octet-stream',
        };
        try {
            const data = await this.s3.upload(params).promise();
            return data.Location;
        }
        catch (err) {
            throw new Error(`Failed to upload document: ${err.message}`);
        }
    }
    async deleteDocument(fileUrl) {
        try {
            const key = fileUrl.split('/').slice(-2).join('/');
            await this.s3.deleteObject({
                Bucket: env_1.env.AWS_S3_BUCKET,
                Key: key,
            }).promise();
        }
        catch (err) {
            throw new Error(`Failed to delete document: ${err.message}`);
        }
    }
    async getSignedUrl(fileName) {
        try {
            return this.s3.getSignedUrl('getObject', {
                Bucket: env_1.env.AWS_S3_BUCKET,
                Key: fileName,
                Expires: 3600, // URL expires in 1 hour
            });
        }
        catch (err) {
            throw new Error(`Failed to generate signed URL: ${err.message}`);
        }
    }
}
exports.default = new DocumentService();
//# sourceMappingURL=documentService.js.map