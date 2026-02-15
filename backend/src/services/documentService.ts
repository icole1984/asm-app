import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '../utils/env';

class DocumentService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY ? {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      } : undefined,
    });
  }

  async uploadDocument(fileName: string, fileContent: Buffer): Promise<{ fileUrl: string; fileKey: string }> {
    const command = new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: fileName,
      Body: fileContent,
      ContentType: 'application/octet-stream',
    });

    try {
      await this.s3Client.send(command);
      const fileUrl = `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${fileName}`;
      return {
        fileUrl,
        fileKey: fileName,
      };
    } catch (err: any) {
      throw new Error(`Failed to upload document: ${err.message}`);
    }
  }

  async deleteDocument(fileKey: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: fileKey,
    });

    try {
      await this.s3Client.send(command);
    } catch (err: any) {
      throw new Error(`Failed to delete document: ${err.message}`);
    }
  }

  async getSignedUrl(fileName: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: fileName,
    });

    try {
      return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    } catch (err: any) {
      throw new Error(`Failed to generate signed URL: ${err.message}`);
    }
  }
}

export default new DocumentService();
