import AWS from "aws-sdk";



export const deleteMediaFromAmazonS3Bucket = async (mediaUrls :  {Key: string}[]  ) => {

     // proberen verwijderen uit amazon
     AWS.config = new AWS.Config();
     AWS.config.update({
         region: "eu-west-2", //config.region ||
         accessKeyId: process.env.AWS_ACCESS_KEY,
         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
     });
     var s3 = new AWS.S3();
    //  

     var params = {
        Bucket: process.env.AWS_BUCKET_NAME, 
        Delete: { // required
          Objects: mediaUrls
        },
      };

   

     // nog checken voor cors origin ofzo?
     
    
    //  console.log("media.urlFile", mediaUrls);
    //  console.log("geraak ik ervoor??");
     s3.deleteObjects(params, function (err, data) {
         if (err) console.log(err, err.stack);  // error
         else console.log(data);                 // deleted
     });
    //  console.log("geraak ik erna??");

}