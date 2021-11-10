import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useRouter } from "next/router";
import { default as React, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { BsFillPersonFill, BsFolderFill } from "react-icons/bs";
import { FaCheck, FaQuestion, FaUser, FaUserCheck, FaUserEdit, FaUserFriends, FaUserTimes } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import MetaTags from "../../components/general/MetaTags";
import Features from "../../components/landing_page/features";
import Navbar_LP from "../../components/landing_page/Navbar_LP";
import CreatePagePartner from "../../components/modal_components/CreatePagePartner";
import ErrorModal from "../../components/modal_components/ErrorModal";
import { OrderDigitization } from "../../components/modal_components/OrderDigitization";
import { ACCOUNT_STATUS, STATUS } from "../../constants";
import { useAccessRequestsByUserIdQuery, useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { useIsPartner } from "../../utils/useIsPartner";
import { WithApollo } from "../../utils/withApollo";
import JsonData from './../../../assets/static_text.json'

const color_options = [
  "transparent",
  "transparent",
  "#fff",
  "#fff",
  "#E0EBD8",
  "#F8E5BB",
  "#f0ce7f",
];

const icon_options = [
  <BsFolderFill color="#D0D0D0" className="contact_list_icon" />,
  <BsFillPersonFill color="#F77777" className="contact_list_icon" />,
  <FaCheck color="#F1CC76" className="contact_list_icon" />,

];

interface CustomerListProps {}

export const CustomerList : React.FC<CustomerListProps> = ({
  
}) => {

  const router = useRouter();
  const [NewPageClick, setNewPageClick] = useState(false);
  const [Error_value, setError_value] = useState(false);
  const [customerdata, setcustomerdata] = useState({'name':'','page_id':''});
  const [digitizeModal, setdigitizeModal] = useState(false);
  const handleClose = () => {setdigitizeModal(!digitizeModal)}

  const { data: meData, loading: Meloading, error: MeError, } = useMeQuery({ skip: isServer(), });
  const { data: accessRequests, error: accessRequestsError, loading: accessRequestsLoading, } = useAccessRequestsByUserIdQuery({ skip: isServer() });

  const StartNewPage = (e: any) => {
    if (meData?.me?.user?.account_status !== ACCOUNT_STATUS.VERIFIED_PARTNER ) {
      setError_value(true);
    } else {
      setNewPageClick(true);
    }
  };


  let status_verified;
  if(meData?.me?.user?.account_status === ACCOUNT_STATUS.VERIFIED_PARTNER){
    status_verified =  (<div>Partner is geverifieerd</div>)
  }else{
    status_verified =  (<div>Nog niet geverifieerd, verifieer je voordat je herdenkingspaginas kan opstarten als partner</div>)
  }



  return (
    <>
   
     



        <div className="add_page_container">
          <div className="all_pages_textbox"> LEVENSVERHALEN KLANTEN</div>


          <div className="add_page_container_btn" onClick={(e: any) => { StartNewPage(e); }}>
          
            <div className="add_page_btn">START LEVENSVERHAAL VOOR KLANT</div>
            <img src="/img/icons/add_btn.svg" alt="Aeterna" className="add_btn_icon" />
          </div>
        </div>



        <div className="edit_page_container">
          <table className="contact_list_table">
            <>
              <thead></thead>
              <tbody>
                {accessRequests?.accessRequestsByUserId.map((access_req:any) => 
                  ((access_req.requesttext!=='Begrafenisondernemer') || (access_req.status===STATUS.Partner)) ? null : (
                
                  <tr className="contact_list_table" key={access_req.id}>
                    <td className="contact_list_icon_container"> {icon_options[0]} </td>
                    <td className="partner_table_name_container" style={{ backgroundColor: color_options[1] }} >                      
                      <div className="contact_list_name"> {access_req.pagina.name_of_page} </div>
                    </td>
                    <td className="partner_table_text_container" style={{ backgroundColor: color_options[1], }} > {access_req.requesttext} </td>
                    <td className="partner_table_options_container" style={{ backgroundColor: color_options[1] }} >
                      <button className="partner_table_options_btn"
                            onClick={(e:any)=>{
                              setcustomerdata({'name':access_req.pagina.name_of_page,'page_id':access_req.paginaId}); 
                              setdigitizeModal(true);}
                     }>Bestel Digitalisatie</button>
                      </td>

                      </tr>
                ))}
              </tbody>
              <tfoot></tfoot>
            </>
          </table>
        </div>



      
        <OrderDigitization customerdata={customerdata} open={digitizeModal} handleClose={handleClose} />

       

      
    </>
  );
};
