import {  Payment_Term } from "../../constants";
import { HerdenkingsPagina } from "../../entities/HerdenkingsPagina";


/**
 * determines the new ValidUntil date that has to be set
 *  
 */
export const determineNewValidUntilDate = async (hpagina: HerdenkingsPagina, payment_term: Payment_Term):Promise<Date> => {

  
    const today = new Date(); 

    // const ValidUntilZonderDate =hpagina.ValidUntil;
    // const ValidUntilOriginal = new Date((hpagina.ValidUntil));
    const ValidUntilOriginal = new Date(new Date(hpagina.ValidUntil).getTime());

    let validUntilStart;
    // let validUntilToSet;


    if (today > ValidUntilOriginal) {
        validUntilStart = today;
    } else {
        validUntilStart = ValidUntilOriginal;
    }

    if(payment_term ===Payment_Term.Recurring){
        const validUntilToSet = new Date(validUntilStart.setMonth(validUntilStart.getMonth() + 1));
    // console.log("*********************************************************************");
    // console.log("today : ",today);
    // console.log("today : ",today.toLocaleDateString());
    // // console.log("ValidUntilZonderDate : ",ValidUntilZonderDate);
    // console.log("ValidUntilOriginal : ",ValidUntilOriginal);
    // // console.log("ValidUntilOriginalTime : ",ValidUntilOriginalTime);1
    // console.log("validUntilStart : ",validUntilStart);
    // console.log("validUntilToSet : ",validUntilToSet);
    // console.log("*********************************************************************");
        return validUntilToSet;
    }
    
    else if(payment_term ===Payment_Term.One_Year){
        const validUntilToSet = new Date(validUntilStart.setFullYear(validUntilStart.getFullYear() + 1));
        return validUntilToSet;
    }
    //TODO: 5 make 5 and 10 years possible
    // else if(payment_term ===Payment_Term.Five_Years){
    //     validUntilToSet = new Date(validUntilStart.setFullYear(validUntilStart.getFullYear() + 5));
    // }
    // else if(payment_term ===Payment_Term.Ten_Years){
    //     validUntilToSet = new Date(validUntilStart.setFullYear(validUntilStart.getFullYear() + 10));
    // }
    else {
        throw new Error("Wrong payment details: term does not exist")
    }

    // console.log("*********************************************************************");
    // console.log("today : ",today);
    
    // console.log("ValidUntilOriginal : ",ValidUntilOriginal);
    // console.log("validUntilStart : ",validUntilStart);
    // console.log("validUntilToSet : ",validUntilToSet);
    // console.log("*********************************************************************");

    // return validUntilToSet;


}