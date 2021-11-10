
import { createReadStream  } from "fs";

export namespace ApolloServerFileUploads {

  export type File = {
    filename: string;
    mimetype: string;
    encoding: string;
    extensionType:string;
    createReadStream?: typeof createReadStream ;
  }
  
  export type UploadedFileResponse = {
    filename: string;
    mimetype: string;
    encoding: string;
    url: string;
  }

  // export type DeletedFileResponse = {
  //   filename: string;
  //   result: boolean;
  // }
  
  export interface IUploader {
    singleFileUploadResolver: (parent, { file, folder } : { file: File, folder:String }) => Promise<UploadedFileResponse>;
    multipleUploadsResolver: (parent, { files ,folder} : { files: File[], folder:String }) => Promise<UploadedFileResponse[]>;
  }

  // export interface IDeleter {
  //   singleFileDeleteResolver: (parent, { file, folder } : { file: File, folder:Number }) => Promise<DeletedFileResponse>;
  //   multipleDeleteResolver: (parent, { files ,folder} : { files: File[], folder:Number }) => Promise<DeletedFileResponse[]>;
  // }


}