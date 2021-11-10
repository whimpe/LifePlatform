
import { sign } from "jsonwebtoken";
import { User } from "../entities/User";
import { AccessRequest } from "../entities/AccessRequest";

// zou ideaal zijn als key niet bestaat om 0 te retourneren ipv undefined

interface Dictionary{
  [Key: string]: number;
   
}
// TODO: add variable for value stay logged in
export const createAccessToken = async (user: User) => {
  console.log("create accessToken");
  // If no status

  const arequest = await AccessRequest.find({ where: { requestorId: user.id }, });   
  console.log("arequest", arequest);



  if(arequest.length ===0 ){  // is lege array

    let dict : Dictionary = {};
    let token = {userId: user.id, statusList: dict };  
    return sign(token, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m", });


  }else{   

    let dict : Dictionary = {};    
    arequest.map(value => dict[value.paginaId]=value.status )   
    let token = {userId: user.id, statusList: dict };    
    return sign(token, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m", });
  }

  
};


export const createRefreshToken = (user: User) => {

  console.log("create refresh token");

  let token = { userId: user.id, tokenVersion: user.tokenVersion, };  
  return sign( token, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "10000d" } );


};

// // mag dit async zijn?
// export const createAccessToken = async (user: User, paginaId?:string, status?: number) => {


//   // If no status
//   if(!status){
//     const arequest = await AccessRequest.findOne({where:{
//       userId: user.id,
//       pageId: paginaId
//     }})

//     status =arequest?.status
//   }
//   else{
//     status = 0; // er is geen status meegegeven en geen accessrequest
//   }

//   return sign({ userId: user.id, pageId: paginaId, status: status }, process.env.ACCESS_TOKEN_SECRET!, {
//     expiresIn: "15m",

//   });
// };
