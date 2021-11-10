import React from "react";
import { BsFillPersonFill, BsFolderFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { useAllPartnersQuery, useVerifyAccountMutation, useVerifyPartnerMutation } from "../generated/graphql";
import { useIsAdmin } from "../utils/useIsAdmin";
import { WithApollo } from "../utils/withApollo";


interface aeternaProps {}


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

export const aeterna: React.FC<aeternaProps> = ({}) => {
  
  
  useIsAdmin();

  const { data, error, loading} = useAllPartnersQuery();
  const [verify] = useVerifyPartnerMutation();


  console.log("data", data);

  return <>
 
  <div>
  AETERNA-BEHEER  

  </div>

  <div className="edit_page_container">
          <table className="contact_list_table">
            <>
              <thead></thead>
              <tbody>
                {data?.allPartners.map((partner) => 
                  (
                
                  <tr className="contact_list_table" key={partner.id}>
                    <td className="contact_list_icon_container"> {icon_options[0]} </td>
                    <td className="partner_table_name_container" style={{ backgroundColor: color_options[1] }} >                      
                      <div className="contact_list_name"> {partner.username} </div>
                    </td>
                    <td className="partner_table_text_container" style={{ backgroundColor: color_options[1], }} > {partner.vat_number} </td>
                    <td className="partner_table_options_container" style={{ backgroundColor: color_options[1] }} >
                      <button className="partner_table_options_btn"
                            onClick={async (e:any)=>{await verify({variables:{partnerId:partner.userId}})  
                          // TODO: dialoog
                          }
                     }>Verifieer</button>
                      </td>

                      </tr>
                ))}
              </tbody>
              <tfoot></tfoot>
            </>
          </table>
        </div>

  <div>

      
</div>
  
  </>;





};
export default WithApollo({ ssr: false })(aeterna);