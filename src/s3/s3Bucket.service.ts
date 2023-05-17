import { Media } from "@app/media/entities/media.entity";
import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";

@Injectable()
export class UploadS3Service {
  constructor() {}

  async uploadFileToBucket(
    keyOfFile: string,
    dataBuffer: Buffer,
    bucketName: string
  ) {
    const s3 = new S3();

    s3.config.update({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    console.log(s3.config.credentials.accessKeyId);
    console.log(s3.config.credentials.secretAccessKey);

    const result = await s3
      .upload({
        Bucket: bucketName,
        Body: dataBuffer,
        Key: keyOfFile,
      })
      .promise();

    console.log(result);
  }
}
