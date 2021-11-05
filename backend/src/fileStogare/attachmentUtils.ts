import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('AttachmentUtils')
export class AttachmentUtils{

    constructor(
        private readonly s3 = new XAWS.S3({
            signatureVersion: 'v4'}),
        private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
        private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION) { }

        async getUploadUrl(todoId: string): Promise<string> {
            logger.info(`Generating upload URL`)
            return this.s3.getSignedUrl('putObject', {
              Bucket: this.bucketName,
              Key: todoId,
              Expires: Number(this.urlExpiration)
            })        
          }

          async getUrl(todoId: string): Promise<string> {
              return `https://${this.bucketName}.s3.amazonaws.com/${todoId}`
          }
}
