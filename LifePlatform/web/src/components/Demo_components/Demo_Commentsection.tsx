import { Stack } from "@chakra-ui/core";
  import { Form, Formik } from "formik";
  import React, { useState } from "react";
  import { Herinnering, useCreateCommentHerinneringMutation, useDeleteCommentMutation, useMeQuery, useUpdateCommentMutation } from "../../generated/graphql";
  import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";
  import { GenericDeleteButton } from "../edit_delete/GenericDeleteButton";
  import {formatDate_text} from "../../utils/FormatDate";
  import { BsTrashFill } from "react-icons/bs";
  
  interface Demo_CommentsectionProps {
    herinnering: Herinnering;
    public_token:string;
    candelete:boolean;
  }
  
  export const Demo_Commentsection: React.FC<Demo_CommentsectionProps> = ({
    herinnering: herr,
    public_token:public_token,
    candelete:candelete
  }) => {
    // useIsAuth(2);
    const [comm, setcomm] = useState('');
    const [createComment] = useCreateCommentHerinneringMutation();
    const [updateComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();
  

  
  
    return (
      <Formik
        initialValues={{ comment: '' }}
        onSubmit={async (values) => {
         alert('Je kan geen berichten toevoegen aan een test-account')
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
                //disabled={isValidating}
                //readOnly={isValidating}
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
  
  
  
  
  
  