import argon2 from "argon2";
import { verify } from "jsonwebtoken";
import { isAuthJWT } from "../middleware/isAuthJWT";
import { Arg, Ctx, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware, InputType } from "type-graphql";
import { getConnection } from "typeorm";
import { v4 } from 'uuid';
import { ACCOUNT_STATUS, FORGET_PASSWORD_PREFIX, PARTNER_TYPE, __prod__ } from "../constants";
import { HerdenkingsPagina } from "../entities/HerdenkingsPagina";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { createAccessToken, createRefreshToken } from "../utils/JWTAuth";
import { sendEmail } from "../utils/email_templates/sendEmail";
import { verifyEmail } from "../utils/email_templates/verifyEmail";
import { sendRefreshToken } from "../utils/sendRefreshToken";
import { validateRegister } from "../utils/validateRegister";
import { SendMessage } from "../utils/email_templates/sendMessage";
import { SendPdfEmail } from "../utils/email_templates/SendPdfEmail";
import { PartnerData } from "../entities/PartnerData";
import { DigitizeEmail } from "../utils/email_templates/DigitizeEmail";
import { checkIfAdmin } from "../utils/checkIfAdmin";
// import { UsernamePasswordInput } from "./UsernamePasswordInput";





const { GoogleSpreadsheet } = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('../../aeterna_klanten.json');
const doc = new GoogleSpreadsheet('1eIwZuMH8jBfusIsY8QDDxe5jNlOtJfnbJaCQbFZ8yBg');






//google auth
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
//facebook auth
const fetch = require('node-fetch');
var google_verifier = require('google-id-token-verifier');


@ObjectType()
class MeResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field()
  status: number;

  @Field({ nullable: true })
  partner_type?: PARTNER_TYPE;
}

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class PartnerDataInput {
  @Field()
  mobile_phone: string;

  @Field()
  name_partner: string;

  @Field()
  vat_number: string;

  @Field()
  street: string;
  

  @Field()
  street_number: string;

  @Field()
  city: string;

  @Field()
  city_postcode: string;

  @Field()
  country: string;

}



@ObjectType()
class LoginResponse {
  @Field({ nullable: true })
  accessToken?: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}


@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}


@ObjectType()  // objecttype is used for returns <->  inputtype is used for arguments
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;   // the ?  is for undefined
}


@ObjectType()  
class PartnerResponse {
  @Field()
  id: string; 

  @Field()
  username: string;   

  @Field()
  email: string; 

  @Field()
  vat_number: string; 

  @Field()
  mobile_phone: string; 

  @Field()
  userId: string;
}


@Resolver(User)
export class UserResolver {



  @FieldResolver(() => HerdenkingsPagina)
  herdenkingsPaginaTheUserOwns(@Root() user: User,
    @Ctx() { herdenkingsPaginaLoader }: MyContext) {
    return herdenkingsPaginaLoader.load(user.id);
  }

  @FieldResolver(() => String)
  @UseMiddleware(isAuthJWT)
  email(@Root() user: User, @Ctx() { payload }: MyContext) {
    // this is the current user a,nd its okay to show own email ????
    if (payload!.userId === user.id) {
      return user.email;
    }
    // current user wants to see someine elses email
    return "";

  }



  @Query(() => MeResponse, { nullable: true })
  async me(
    @Ctx() context: MyContext,
    @Arg("paginaId", { nullable: true }) paginaId?: string) {
    const authorization = context.req.headers["authorization"];

    var status;
    let user;
    let partner_type;
    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      var status;
      user = await User.findOne(payload.userId);
      const partnerdata = await PartnerData.findOne({ where: { user: payload.userId } });

      if (!partnerdata) {
        partner_type = -1;
      } else {
        partner_type = partnerdata.partner_type;
      }

      if (!paginaId) {
        status = 0;
      }
      else {
        const status_response = payload!.statusList[paginaId];
        if (!status_response) {
          status = 0;
        } else {
          status = status_response;
        }


      }
    } catch (err) {
      console.log(err);
      return null;
    }

    return { user, status, partner_type }
  }


  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {

    const user = await User.findOne(
      { where: { email: email.toLowerCase() } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "that email doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password!, password);  // hash the password
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "password is incorrect",
          },
        ],
      };

    }


    // creer jwt 
    const inhoud = await createAccessToken(user);

    // creer refresh token? -> store in cookie?
    // name cookie, value of token and
    sendRefreshToken(res, createRefreshToken(user));



    // req.session.userId = user.id;
    // ! voor undefined ofzo
    // console.log("session login: ", req.session);
    return {
      accessToken: inhoud, user
    };
  }

  //Blijkbaar niet zo veilig
  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId") userId: string) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }


  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '')

    return true
  }


  @Mutation(() => Boolean)
  // @UseMiddleware(isAuthJWT)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, res }: MyContext
  ): Promise<Boolean> {
    if (newPassword.length <= 3) {
      //"password length must be greater than 3"
      return (false);
    };

    const key = FORGET_PASSWORD_PREFIX + token
    const userId = await redis.get(key);
    if (!userId) {
      //"je moet een nieuwe verander wachtwoord email aanvragen"
      return (false);
    }

    const user = await User.findOne(userId);

    if (!user) {

      return (false)
      // TODO: verander door error
      // throw new Error("Geen gebruiker gevonden")
    }
    console.log(user);
    const tokenversionValue = user.tokenVersion + 1;

    //if change passwords works -> means email is succesfully sent and therefore account is verified
    if (user.account_status === ACCOUNT_STATUS.NOT_VERIFIED) {
      user.account_status = ACCOUNT_STATUS.VERIFIED;
      await user.save();
    }



    await User.update({ id: userId }, { password: await argon2.hash(newPassword), tokenVersion: tokenversionValue });


    // creer refresh token? -> store in cookie?
    // name cookie, value of token and
    sendRefreshToken(res, createRefreshToken(user));

    await redis.del(key);
    // "Het nieuwe wachtwoord is geïnstalleerd"
    return (true);
  }

  @Mutation(() => Boolean)
  // @UseMiddleware(isAuthJWT)
  async validateOwnership(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, res }: MyContext
  ): Promise<Boolean> {

    const key = token
    const userId = await redis.get(key);
    if (!userId) {
      return (false); //link vervallen
    }

    const user = await User.findOne(userId);
    if (!user) {
      return (false) //geen gebruiker
    }

    // sendRefreshToken(res, createRefreshToken(user));
    // await redis.del(key);
    // "Het nieuwe wachtwoord is geïnstalleerd"
    return (true);
  }



  @Mutation(() => Boolean)
  @UseMiddleware(isAuthJWT)
  async requestToVerifyAccount(
    @Arg('email') email: string,
    @Ctx() { redis, payload }: MyContext,

  ): Promise<Boolean> {

    if (__prod__) {
      if (!payload?.userId) {
        throw new Error("Geen gebruiker gevonden!");
      }
      const user = await User.findOne(payload?.userId);
      if (!user) {

        throw new Error("Geen gebruiker gevonden!");
        return false;
      }

      const token = v4();

      console.log("token nodig:    ", "VERIFY_ACCOUNT" + token);

      await redis.set(
        "VERIFY_ACCOUNT" + token,
        user.id,
        "ex",
        1000 * 60 * 60 * 24 * 3
      ); // 3 days

      //TODO: email sturen!!

      await verifyEmail(email, token);


      return (true);
    } else {
      return (true)//email not send when in development
    }

  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthJWT)
  async verifyAccount(
    @Arg('token') token: string,
    @Ctx() { redis, }: MyContext
  ): Promise<Boolean> {

    const key = token;
    const userId = await redis.get(key);
    if (!userId) {
      //"je moet een nieuwe verander wachtwoord email aanvragen"
      // throw new Error("Geen gebruiker gevonden!");
      return (false);
    }

    const user = await User.findOne(userId);
    if (!user) {
      //"je moet een nieuwe verander wachtwoord email aanvragen"
      // throw new Error("Geen gebruiker gevonden!");
      return (false);
    } else {
      if (user.account_status === ACCOUNT_STATUS.NOT_VERIFIED) {
        user.account_status = ACCOUNT_STATUS.VERIFIED;
        await user.save();
      }
      return true;

    }

  }


  @Mutation(() => Boolean)
  @UseMiddleware(isAuthJWT)
  async UpdatePassword(
    @Arg('oldpassword') oldPassword: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { payload, res }: MyContext
  ): Promise<Boolean> {


    if (!payload?.userId) {
      throw new Error("Geen gebruiker gevonden!");
    }

    if (newPassword.length <= 3) {
      //"password length must be greater than 3"
      return (false);
    };
    const user = await User.findOne(payload.userId);
    if (user) {
      const valid = await argon2.verify(user.password!, oldPassword);  // hash the password

      if (valid) {
        const tokenversionValue = user.tokenVersion + 1;
        await User.update({ id: payload.userId }, { password: await argon2.hash(newPassword), tokenVersion: tokenversionValue });
        sendRefreshToken(res, createRefreshToken(user));
        return (true);

      }
    } else {
      throw new Error("Geen gebruiker gevonden!");
    }
    return false;
  }




  @Mutation(() => Boolean)
  // @UseMiddleware(isAuthJWT)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // the email is not in the db
      return false;
    }

    const token = v4();

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    ); // 3 days

    await sendEmail(
      email,
      token
    );

    return true;
  }







  @Mutation(() => Boolean)
  async subscribe(
    @Arg("name") name_input: string,
    @Arg("email") email_input: string,
    @Arg("tel") tel_input: string,
    @Arg("boodschap") boodschap_input: string,
  ): Promise<Boolean> {
    try {
      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
      });

      await doc.loadInfo(); // loads document properties and worksheets
      console.log(doc.title);
      const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
      console.log(sheet.title);
      console.log(sheet.rowCount);
      // console.log(sheet[0])
      const row = {
        naam: name_input,
        email: email_input,
        tel: tel_input,
        boodschap: boodschap_input
      };


      await sheet.addRow(row);
      await SendMessage(name_input, email_input, tel_input, boodschap_input);


      return true;


    } catch (err) {
      return false;
    }
  }
  @Mutation(() => Boolean)
  async digitize_request(
    @Arg("name") name_input: string,
    @Arg("email") email_input: string,
    @Arg("tel") tel_input: string,
    @Arg("address") address_input: string,
    @Arg("boodschap") boodschap_input: string,
  ): Promise<Boolean> {
    try {
      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
      });

      await doc.loadInfo(); // loads document properties and worksheets
      console.log(doc.title);
      const sheet = doc.sheetsByIndex[2]; // or use doc.sheetsById[id]
      console.log(sheet.title);
      console.log(sheet.rowCount);
      // console.log(sheet[0])
      const row = {
        naam: name_input,
        email: email_input,
        tel: tel_input,
        adres: address_input,
        bericht: boodschap_input
      };


      await sheet.addRow(row);
      await SendMessage(name_input, email_input, tel_input, address_input + '-----' + boodschap_input);
      return true;


    } catch (err) {
      return false;
    }
  }


  @Mutation(() => Boolean)
  async email_collecter(
    @Arg("email") email_input: string,
    @Arg("sheet_index") sheet_index: number,
  ): Promise<Boolean> {
    try {
      await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
      });
      await doc.loadInfo(); // loads document properties and worksheets
      const sheet = doc.sheetsByIndex[sheet_index]; // or use doc.sheetsById[id]
      const row = { email: email_input };
      await sheet.addRow(row);
      await SendPdfEmail(email_input);
      return true;
    } catch (err) {
      return false;
    }
  }


  @Mutation(() => Boolean)
  async digitize_confirmation(
    @Arg("name_of_page") name_of_page: string,
    @Arg("page_id") page_id: string,
    @Ctx() { payload }: MyContext,

  ): Promise<Boolean> {
    const user = await User.findOne(payload?.userId);

    try {
      if (user) {
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key,
        });
        await doc.loadInfo(); // loads document properties and worksheets
        const sheet = doc.sheetsByIndex[2]; // or use doc.sheetsById[id]
        const row = { naam: name_of_page, email: user.email, bericht: `page_id = ${page_id}` };
        await sheet.addRow(row);
        await DigitizeEmail(user?.email, name_of_page, page_id);
        return true;
      } else {
        return false
      }

    } catch (err) {
      return false;
    }
  }




  @Mutation(() => Boolean)
  async feedback(
    @Arg("userId") userId: string,
    @Arg("feedback") feedback: string,
  ): Promise<Boolean> {
    try {

      const user = await User.findOne(userId);
      if (user?.id !== 'null') {
        await SendMessage(user!.username, user!.email, feedback, "");
        await doc.useServiceAccountAuth({ client_email: creds.client_email, private_key: creds.private_key, });
        await doc.loadInfo(); // loads document properties and worksheets
        const sheet = doc.sheetsById[1]; // or use doc.sheetsById[id]
        const row = {
          naam: user!.username,
          email: user!.email,
          categorie: 'cat_input',
          boodschap: feedback
        };
        await sheet.addRow(row);
      } else {
        await SendMessage('anoniem', 'anoniem_email', feedback, "");

      }

      return true;


    } catch (err) {
      return false;
    }
  }



  @Mutation(() => Boolean, { nullable: true })
  @UseMiddleware(isAuthJWT)
  async updateUser(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Ctx() { payload }: MyContext,

  ): Promise<Boolean | undefined> {

    if (!payload?.userId) {
      throw new Error("Geen gebruiker gevonden!");
    }

    const user = await User.findOne(payload?.userId);
    if (user) {
      const result = await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ username, email })
        .where('id = :id ', {
          id: payload?.userId,
        })
        .returning("*")
        .execute();
      return true;
    } else {
      throw new Error("Geen gebruiker gevonden!");
    }
    return false;

  }


  @Mutation(() => LoginResponse)
  async register(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { res }: MyContext,
  ): Promise<LoginResponse> {
    console.log(options);
    const errors = validateRegister(options);
    if (errors !== null) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);  // hash the password
    let user;
    try {
      const result = await getConnection().createQueryBuilder().insert().into(User).values(
        {
          username: options.username,
          // facebookId: options.facebookId,
          // googleId: options.googleId,
          password: hashedPassword,
          email: options.email.toLocaleLowerCase()    //emails are case INsensitive
        }
      ).returning("*").execute();

      user = result.raw[0];
    } catch (err) {
      console.log('err', err)
      if (err.detail.includes("already exists")) { // || err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "Dit emailadres is al in gebruik.",

            },
            {
              field: "email",
              message: "Dit emailadres is al in gebruik.",

            },
          ],

          // duplictae username error
        };

      }
    }

    // creer jwt 
    const accessToken = await createAccessToken(user);

    // creer refresh token? -> store in cookie?
    // name cookie, value of token and
    sendRefreshToken(res, createRefreshToken(user));
    // {__prod__ ?  this.requestToVerifyAccount(options.email) : null}
    // console.log('session voor', req.session);
    // req.session.userId = user.id;


    // console.log('session na', req.session);
    return { user, accessToken };
  }

  @Mutation(() => LoginResponse)
  async googleLogin(
    @Arg('googleId') googleId: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    //verify google ID
    const response = await client.verifyIdToken({
      idToken: googleId,
      requiredAudience: client,
    });

    const { email_verified, name, email } = response.payload;
    let user;
    user = await User.findOne({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      try {
        const result = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            username: name,
            GoogleId: googleId,
            email: email.toLocaleLowerCase(),
            account_status: 1,
          })
          .returning('*')
          .execute();
        user = result.raw[0];
        const inhoud = await createAccessToken(user);

        // creer refresh token
        sendRefreshToken(res, createRefreshToken(user));

        return {
          accessToken: inhoud,
          user,
        };
      } catch (err) {
        return {
          errors: [
            {
              field: 'username',
              message: 'Dit emailadres is al in gebruik.',
            },
            {
              field: 'email',
              message: 'Dit emailadres is al in gebruik.',
            },
          ],
        };
      }
    } else {
      // creer jwt
      const inhoud = await createAccessToken(user);

      // creer refresh token
      sendRefreshToken(res, createRefreshToken(user));

      return {
        accessToken: inhoud,
        user,
      };
    }
  }

  @Mutation(() => LoginResponse)
  async facebookLogin(
    @Arg('accessToken') accessToken: string,
    @Arg('userID') userID: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    //fetch response from facebook
    let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
    const response = await fetch(urlGraphFacebook, {
      method: 'GET',
    })
      .then((res: any) => res.json())
      .then((res: any) => {
        return res;
      });

    const { id, email, name } = response;
    let user;
    user = await User.findOne({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      try {
        const result = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            username: name,
            FacebookId: userID,
            // googleId: options.googleId,
            email: email.toLocaleLowerCase(),
            account_status: 1,
          })
          .returning('*')
          .execute();
        user = result.raw[0];
        const inhoud = await createAccessToken(user);

        // creer refresh token
        sendRefreshToken(res, createRefreshToken(user));

        return {
          accessToken: inhoud,
          user,
        };
      } catch (err) {
        return {
          errors: [
            {
              field: 'username',
              message: 'Dit emailadres is al in gebruik.',
            },
            {
              field: 'email',
              message: 'Dit emailadres is al in gebruik.',
            },
          ],
        };
      }
    } else {
      // creer jwt
      const inhoud = await createAccessToken(user);

      // creer refresh token
      sendRefreshToken(res, createRefreshToken(user));

      return {
        accessToken: inhoud,
        user,
      };
    }
  }



  @Mutation(() => Boolean)
  @UseMiddleware(isAuthJWT)
  async verifyPartner(
    @Arg('partnerId') partnerId: string,
    @Ctx() { payload }: MyContext,
  ){

    
    checkIfAdmin(payload?.userId!);

    
    const partner = User.findOne({id:partnerId});
    if(!partner){
      throw new Error("Could not find partner");
    }

    // console.log("dsfdsdfqsdfqdfqsdf");
    // console.log("dsfdsdfqsdfqdfqsdf");
    // console.log("dsfdsdfqsdfqdfqsdf");
    // console.log("dsfdsdfqsdfqdfqsdf");

    console.log("partnerId", partnerId);

    await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({ 
        account_status : ACCOUNT_STATUS.VERIFIED_PARTNER
    })
    .where(
        {
            id: partnerId
        })
    .execute();

 
    return true;


  }

  


  
  @Query(() => [PartnerResponse])
  @UseMiddleware(isAuthJWT)
  async allPartners(
    @Ctx() { payload }: MyContext,
  ){

    // Id van info@aeterna
    checkIfAdmin(payload?.userId!);
    
    const partners = await getConnection().query(`
   
        select u.*, pd.*
        from "user" u
        INNER JOIN "partner_data" AS pd ON u."id"=pd."userId";
      
        `,

    ) ;


    console.log("partners", partners);

    return partners;


  }



}




@Resolver(UserResolver)
export class PartnerResolver extends UserResolver {

  @Mutation(() => LoginResponse)
  async register_partner(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Arg('partnerdata', () => PartnerDataInput) partnerdata: PartnerDataInput,
    @Ctx() { res }: MyContext,
    @Arg('partner_type') partner_type: PARTNER_TYPE,
  ): Promise<LoginResponse> {
    const errors = validateRegister(options);
    if (errors !== null) {
      return { errors };
    }

    // TODO: Is het erg dat een emailadres zowel kan gebruikt worden als user en als partner
    // Niet ideaal als we dezelfde login willen grbuiken 
    // const user = await User.findOne({ where: { email: options.email } });
    // if (!user) {

    // } else {
    //   return {
    //     errors: [
    //       {
    //         field: "email",
    //         message: "Dit emailadres is al in gebruik bij de gebruikers van Aeterna.",

    //       },
    //     ],


    //   };
    // }


    const hashedPassword = await argon2.hash(options.password);  // hash the password

    let user;
    let partner;
    try {

      const result = await getConnection().createQueryBuilder().insert().into(User).values(
        {
          username: options.username,
          // facebookId: options.facebookId,
          // googleId: options.googleId,
          password: hashedPassword,
          email: options.email.toLocaleLowerCase()    //emails are case INsensitive
        }
      ).returning("*").execute();

      user = result.raw[0];

      const result2 = await getConnection().createQueryBuilder().insert().into(PartnerData).values(
        {
          user: user,
          partner_type: partner_type,
          mobile_phone: partnerdata.mobile_phone,
          vat_number: partnerdata.vat_number,
          country: partnerdata.country,
          name_partner: partnerdata.name_partner,
          city_postcode: partnerdata.city_postcode,
          city: partnerdata.city,
          street: partnerdata.street,
          street_number: partnerdata.street_number,

        }
      ).returning("*").execute();
      partner = result2.raw[0];
    } catch (err) {
      console.log('err', err)
      if (err.detail.includes("already exists")) { // || err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "Dit emailadres is al in gebruik.",

            },
            {
              field: "email",
              message: "Dit emailadres is al in gebruik.",

            },
          ],

          // duplictae username error
        };

      }
    }

    // creer jwt 
    const accessToken = await createAccessToken(partner);

    // creer refresh token? -> store in cookie?
    // name cookie, value of token and
    sendRefreshToken(res, createRefreshToken(partner));
    // {__prod__ ?  this.requestToVerifyAccount(options.email) : null}
    // console.log('session voor', req.session);
    // req.session.userId = user.id;


    // console.log('session na', req.session);
    return { user: partner, accessToken };
  }




}


