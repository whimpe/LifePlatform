import AWS from "aws-sdk";
// import { createReadStream } from "fs";
import stream from "stream";
import { v4 } from "uuid";
import { WHITELIST_FILE_EXTENSIONS } from "../../constants";
import { ApolloServerFileUploads } from "../ApolloServerFileUploads";



type S3UploadConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  region?: string;
  destinationBucketName: string;
};

type S3UploadStream = {
  writeStream: stream.PassThrough;
  promise: Promise<AWS.S3.ManagedUpload.SendData>;
};

export class AWSS3Uploader implements ApolloServerFileUploads.IUploader {
  private s3: AWS.S3;
  public config: S3UploadConfig;

  constructor(config: S3UploadConfig) {
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: config.region || "ca-central-1",
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
    });

    this.s3 = new AWS.S3();
    this.config = config;
  }

  private createUploadStream(key: string): S3UploadStream {
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: this.config.destinationBucketName,
          Key: key,
          Body: pass
        })
        .promise()
    };
  }

  private createDestinationFilePath(
    fileName: string,
    mimetype: string,
    encoding: string
  ): string {
    return fileName;
  }

  async singleFileUploadResolver(
    parent,
    { file, folder }: { file: ApolloServerFileUploads.File, folder: String }
  ): Promise<ApolloServerFileUploads.UploadedFileResponse> {

    console.log("file", file);

    const {  createReadStream, filename, mimetype, encoding } = await file;


    
    
    var randomFileName = v4();

    console.log("******************************************************")
    console.log("filename",filename);
    console.log("mimetype",mimetype);
    console.log("encoding",encoding);
    console.log("createReadStream",createReadStream);

    if(WHITELIST_FILE_EXTENSIONS.has(mimetype.split('/')[1])){      
      //pass
    }else{
      throw new Error("FileExtension not allowed")
      
    }
    randomFileName = `${folder}/${randomFileName}.${mimetype.split('/')[1]}`;

    const filePath = this.createDestinationFilePath(
      randomFileName,                    // maak de url niet gokbaar?
      mimetype,
      encoding
    );

    if(!createReadStream){
      throw new Error("Could not make readstream")
    }


    const stream1 = createReadStream(filePath);

   

    const uploadStream = this.createUploadStream(filePath);

    

    stream1.pipe(uploadStream.writeStream);
    const result = await uploadStream.promise;

    return { filename, mimetype, encoding, url: result.Location };
  }

  async multipleUploadsResolver(
    parent,
    { files, folder }: { files: ApolloServerFileUploads.File[], folder:String }
  ): Promise<ApolloServerFileUploads.UploadedFileResponse[]> {
    return Promise.all(
      files.map(f => this.singleFileUploadResolver(null, { file: f, folder }))
    );
  }
}