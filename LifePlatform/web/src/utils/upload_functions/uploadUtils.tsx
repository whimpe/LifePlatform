import { gql, useMutation } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";



export const SINGLE_UPLOAD = gql`
  mutation($file: Upload!,$folder:String!) {
    singleUpload(file: $file, folder:$folder) {
      filename
      mimetype
      encoding
      url
    }
  }
`;


export const MUTIPLE_UPLOAD = gql`
  mutation($files: [Upload!]!,$folder:String!) {
    multipleUpload(files: $files, folder:$folder) {
      filename
      mimetype
      encoding
      url
    }
  }
`;

export const UploadFile = () => {
  const [lastUploaded, setLastUploaded] = useState({});
  const [mutate, { loading, error, data }] = useMutation(SINGLE_UPLOAD);
  
  const onChange = ({ target: { validity, files: [file] }
  }: any) => validity.valid && mutate({ variables: { file } });

  useEffect(() => {
    if (data) setLastUploaded(data.singleUpload);
  }, [data]);

  if (loading) return <CircularProgress color="secondary"  />;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;
  

  return (
    <React.Fragment>
      <input type="file" required onChange={onChange} />
      <br/>
      {Object.keys(lastUploaded).length !== 0 && (
        <div>
          {" "}
          Last uploaded details : {JSON.stringify(lastUploaded, null, 2)}{" "}
        </div>
      )}
    </React.Fragment>
  );
};