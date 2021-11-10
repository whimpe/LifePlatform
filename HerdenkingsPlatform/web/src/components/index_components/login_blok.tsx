import React from "react";
import { useRouter } from "next/router";
import { FaHandHoldingHeart } from "react-icons/fa";
import { PseudoBox } from "@chakra-ui/core";

interface Login_blokProps {
  public_token: string;
  OpenLoginModal:any;
}

export const Login_blok: React.FC<Login_blokProps> = ({ public_token,OpenLoginModal }) => {
  const router = useRouter();

  return (
    <>
      <div className="index_login_info_container">
        <div className="no_account_title">Inloggen of registreren om het levensverhaal te bekijken en herinneringen te delen.</div>
            <div className="index_login_btn_container">
              <div className='index_btn'  onClick={() => {OpenLoginModal(true)}} > Inloggen</div>
            </div>

          <div className="no_account_text">Hebt u nog geen account?</div> 
          <div className="index_login_btn_container">
            <div className='index_btn' onClick={() => OpenLoginModal(false)}> Registreren</div>
          </div>
          
        </div>
      </>
  );
};
