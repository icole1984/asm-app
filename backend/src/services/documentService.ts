import AWS from 'aws-sdk';

class DocumentService {
  constructor() {
    this.s3 = new AWS.S3();
  }

  async uploadDocument(fileName, fileContent) {
    const params = {
      Bucket: 'your-bucket-name', // Replace with your S3 bucket name
      Key: fileName,
      Body: fileContent,
      ContentType: 'application/octet-stream',
    };

    try {
      const data = await this.s3.upload(params).promise();
      return data.Location;
    } catch (err) {
      throw new Error(`Failed to upload document: ${err.message}`);
    }
  }

  // Additional document handling methods can be added here
}

export default new DocumentService();
