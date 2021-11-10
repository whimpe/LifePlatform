import React from "react";
import { BsTrashFill } from "react-icons/bs";
import {
    MeQuery
} from "../../generated/graphql";
import { useGetStringFromUrl } from "../../utils/useGetIntFromUrl";

interface GenericDeleteButtonProps {
  id: string;
  creatorId: string;
  deleteObjectMutation: any;
  naamObject: string; //Moet: bevatten
  meData: MeQuery;

}

export const GenericDeleteButton: React.FC<GenericDeleteButtonProps> = ({
  id,
  creatorId,
  deleteObjectMutation,
  naamObject,
  meData
}) => {
  const public_token = useGetStringFromUrl("public_token");
 

  if (creatorId === meData!.me!.user!.id || meData!.me!.status > 3) {
    <button
      className="delete_comment_btn"
      type="button"
      onClick={async () => {
        await deleteObjectMutation({
          variables: { id, paginaId: public_token },
          update: (cache: any) => {
            cache.evict({ id: naamObject + id });
          },
        });
      }}
    >
      <BsTrashFill className="delete_comment_icon" /> Verwijder 
    </button>;
  }

  return null;
};
