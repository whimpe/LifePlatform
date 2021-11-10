import {
  Stack
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import {
  Herinnering,
  useCreateCommentHerinneringMutation,
  useDeleteCommentMutation,
  useMeQuery,
  useUpdateCommentMutation
} from "../../generated/graphql";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
import { GenericDeleteButton } from "../edit_delete/GenericDeleteButton";
import {formatDate_text} from "../../utils/FormatDate";
import { BsTrashFill } from "react-icons/bs";

interface CommentSectionProps {
  herinnering: Herinnering;
  public_token:string;
  candelete:boolean;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  herinnering: herr,
  public_token:public_token,
  candelete:candelete
}) => {
  // useIsAuth(2);
  const { data: meData } = useMeQuery({ });
  const [comm, setcomm] = useState('');
  const [createComment] = useCreateCommentHerinneringMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  if(!meData) {
    return (<div>no me present</div>)
  }



  return (
    <Formik
      initialValues={{ comment: '' }}
      onSubmit={async (values) => {
        const newComment = await createComment({
          variables: { herinneringId: herr.id, comment: values.comment,paginaId: public_token },
          update: (cache) => {
            cache.evict({fieldName: "herinnering"});
          },
        });
              
        values.comment = "";
        if (newComment.errors) {
          console.log(newComment.errors);
        }
      }}
    >
      {({ isValidating, setFieldValue,values}) => (
        <Form >
          <Stack spacing={5} align='center' >
            {herr.comments.map((comment) =>
              !comment ? null : (
                <div key={comment.id} className='comment_container'>
                {/* contentEditable={comment.creator.id === meData.me?.id} */}     
                <div className='author_comment_section'> {comment.creator.username}</div> 
                <div className="comment_date">Toegevoegd op {formatDate_text(comment.createdAt)}</div>                  
                <div className='comment_text'>{comment.comment}</div>  
                {candelete ?
                <button className='delete_comment_btn' type='button'
                    onClick={() => {
                      deleteComment({variables: { id:comment.id,paginaId: public_token },
                        update: (cache) => { cache.evict({ id: "CommentHerinnering:" + comment.id });},});
                      // router.reload()
                    }}        
                  > 
                  <BsTrashFill className='delete_comment_icon' /> Verwijder dit Bericht </button>
              :null}

                    {/* <GenericDeleteButton id={comment.id} creatorId={comment.creator.id} deleteObjectMutation={ deleteComment} naamObject={"CommentHerinnering:"} meData={meData} />                    */}
                </div>                
              )
            )}
          </Stack>

        <div className='comment_input_container'>
            <textarea               
              name="comment"
              placeholder="Vertel over deze herinnering"                 
              className='inputfield_comment'
              value={values.comment}
              onChange={(event:any)=> {setFieldValue('comment',event?.target.value)}}
              onKeyPress={() => {
                isValidating = true;}}
            />
            <button className="comment_send_btn" type="submit" onClick={() => {isValidating = true;}}>verzenden </button>

          </div>



        </Form>
      )}
    </Formik>
  );
};





