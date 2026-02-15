import AWS from 'aws-sdk';
import { env } from '../utils/env';

class DocumentService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      region: env.AWS_REGION,
    });
  }

  async uploadDocument(fileName: string, fileContent: Buffer): Promise<{ fileUrl: string; fileKey: string }> {
    const params = {
      Bucket: env.AWS_S3_BUCKET,
      Key: fileName,
      Body: fileContent,
      ContentType: 'application/octet-stream',
    };

    try {
      const data = await this.s3.upload(params).promise();
      return {
        fileUrl: data.Location,
        fileKey: fileName,
      };
    } catch (err: any) {
      throw new Error(`Failed to upload document: ${err.message}`);
    }
  }

  async deleteDocument(fileKey: string): Promise<void> {
    try {
      await this.s3.deleteObject({
        Bucket: env.AWS_S3_BUCKET,
        Key: fileKey,
      }).promise();
    } catch (err: any) {
      throw new Error(`Failed to delete document: ${err.message}`);
    }
  }

  async getSignedUrl(fileName: string): Promise<string> {
    try {
      return this.s3.getSignedUrl('getObject', {
        Bucket: env.AWS_S3_BUCKET,
        Key: fileName,
        Expires: 3600, // URL expires in 1 hour
      });
    } catch (err: any) {
      throw new Error(`Failed to generate signed URL: ${err.message}`);
    }
  }
}

export default new DocumentService();
