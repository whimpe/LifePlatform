// import { Media } from "../entities/Media";
import { checkDemoAccess } from "../utils/checkDemoAccess";
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { STATUS } from "../constants";
import { HerdenkingsPagina } from "../entities/HerdenkingsPagina";
import { MediaPersonalMessage } from "../entities/Media";
import { PersonalMessage } from "../entities/PersonalMessage";
import { PersonalMessageAccess } from "../entities/PersonalMessageAccess";
import { isAuthJWT } from "../middleware/isAuthJWT";
import { MyContext } from "../types";
import { checkIfCanCreatePersonalMessage } from "../utils/checkIfCanCreate/checkIfCanCreatePersonalMessage";
import { deleteMediaFromAmazonS3Bucket } from "../utils/deleteFromAmazon";



@InputType()
class PersonalMessageInput {
    @Field()
    title: string
    @Field()
    text: string

    @Field({ nullable: true })
    dateAvailable?: Date
}



@ObjectType()
class PaginatedPersonalMessages {
    @Field(() => [PersonalMessage])
    PersonalMessages: PersonalMessage[];

    @Field()
    hasMore: boolean;
}



@Resolver(PersonalMessage)
export class PersonalMessageResolver {


    @FieldResolver(() => [MediaPersonalMessage])
    async media(@Root() personalMessageId: PersonalMessage) {
        const media = await getConnection()
            .getRepository(MediaPersonalMessage)
            .createQueryBuilder("media")
            .where('media."persoonlijkeboodschapId" =:id ', { id: personalMessageId.id })
            .getMany();

        console.log("media in personalmessage fieldresolver", media);

        return media;
    }




    @Query(() => PaginatedPersonalMessages)  // type graphql
    @UseMiddleware(isAuthJWT)
    //@UseMiddleware(accessibleOrShareable)
    async personalMessages(
        @Arg('limit', () => Int) limit: number,
        @Arg('paginaId') paginaId: string,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
        @Ctx() { payload }: MyContext,
    ): Promise<PaginatedPersonalMessages> {   //TYPE TYPESCRIPT

        const accessstatus = payload!.statusList[paginaId];
        if (accessstatus < STATUS.CoOwner) {
            throw new Error("You dont have permission to view memories")
        }
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;

        const pagina_id = paginaId;


        const replacements: any[] = [pagina_id, realLimitPlusOne];


        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }


        const PersonalMessagges = await getConnection().query(`
        
        select p.*
        from personal_message p
        
        where p."paginaId" = $1
        ${cursor ? ` AND  p."createdAt" < $3` : ""}

        order by p."createdAt" DESC

        limit $2

        `,
            replacements
        );

        console.log("PersonalMessagges server:", PersonalMessagges);

        return {
            PersonalMessages: PersonalMessagges.slice(0, realLimit),
            hasMore: PersonalMessagges.length === realLimitPlusOne
        };

    }



    @Query(() => PersonalMessage, { nullable: false })  // type graphql
    @UseMiddleware(isAuthJWT)
    // //@UseMiddleware(accessibleOrShareable)
    async personalmessage(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<PersonalMessage | undefined> {   //TYPE TYPESCRIPT

        //Only the owners and the recepient of the pessage can see this 

        let cansee = false;

        const pmaccess = await PersonalMessageAccess.find({where:{pageId: paginaId, personalMessageId:id}})

        const personalmessage = await PersonalMessage.findOne({
            where:
            {
                id: id,
            }
        });

        //Als het beheerder of medebeheerder is mag je het zien
        if(payload!.statusList[paginaId] >= STATUS.Owner){
            cansee = true;
        }
        
        //Als je een van de personen bent voor wie de booschap bestemd is mag je het zien
        else{
            pmaccess.map((accessrequest) => {
                if(accessrequest.userThatHasAccessId === payload?.userId){
                    cansee = true;
                }
        })        
        }

        if(cansee){
            personalmessage!.dateAvailable = new Date( personalmessage!.dateAvailable);
            return personalmessage
            // {date:new Date(personalmessage?.dateAvailable) , id:personalmessage?.id ,text:personalmessage?.text, title:personalmessage?.title ,media:personalmessage?.media};
        }else{
            throw new Error("You can't view this personal message")
        }

    }


    @Query(() => PersonalMessage, { nullable: false })  // type graphql
    async personalmessage_demo(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,        
    ): Promise<PersonalMessage | undefined> {   //TYPE TYPESCRIPT

        checkDemoAccess(paginaId);

        const personalmessage = await PersonalMessage.findOne({
            where:
            {
                id: id,
            }
        });

        if(!personalmessage){
            throw new Error("Can not find personalmessage")
        }else{
            return personalmessage;
        }
    }

   
    @Mutation(() => PersonalMessage)  // type graphql
    @UseMiddleware(isAuthJWT)
   // @UseMiddleware(canInsert("personal_message"))
    async createPersonalMessage(
        @Arg('input') input: PersonalMessageInput,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext
    ): Promise<PersonalMessage> {   //TYPE TYPESCRIPT
        // 2 sql queries

        let pagina = await HerdenkingsPagina.findOne({
            where: {
                id:paginaId
            }
        });
        if(!pagina){
            throw new Error("could not find page")
        }
        await checkIfCanCreatePersonalMessage(pagina,payload!.statusList[paginaId])

               
        return PersonalMessage.create({
            ...input,
            paginaId: paginaId
        }).save();
    }


    @Mutation(() => PersonalMessage, { nullable: true })  // type graphql
    @UseMiddleware(isAuthJWT)
    async updatePersonalMessage(
        @Arg('id') id: string,
        @Arg('title') title: string,
        @Arg('text') text: string,
        @Arg('dateAvailable', { nullable: true }) dateAvailable: Date,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext
    ): Promise<PersonalMessage | null> {

       //Alleen de eigenaar mag dit maken, wijzigen en verwijderen
       const accessstatus = payload!.statusList[paginaId];

       if (accessstatus < STATUS.Owner) {
           throw new Error("No permission to delete personal messages")
       }

        const pmess = await getConnection()
            .createQueryBuilder()
            .update(PersonalMessage)
            .set({ title, text,dateAvailable })
            .where('id =:id',
                { id })
            .returning("*")
            .execute();

        return pmess.raw[0];


    }

    @Mutation(() => Boolean)  // type graphql
    @UseMiddleware(isAuthJWT) // alleen owner mag dit kunnen aanpassen 
    async deletePersonalMessage(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext): Promise<Boolean> {


        //Alleen de eigenaar mag dit maken, wijzigen en verwijderen
        const accessstatus = payload!.statusList[paginaId];

        if (accessstatus < STATUS.Owner) {
            throw new Error("No permission to delete personal messages")
        }

        const pmess = await PersonalMessage.findOne({
            where:
            {
                id: id,
                
            }
        });
        if (!pmess) {
            return false;
        }
       
        
       
        // Not cascade way
        

        const mediapersonalMessagesToDelete = await MediaPersonalMessage.find({
            where:{
                persoonlijkeboodschapId:id
            }
        });

        let mediaUrls: any[] = [];
        mediapersonalMessagesToDelete.map((medpm)  => {
            mediaUrls.push({"Key" :medpm.urlFile.split("amazonaws.com/")[1]});
        });

        // console.log("mediaUrls",mediaUrls);



        
        await deleteMediaFromAmazonS3Bucket(mediaUrls);


        // await Updoot.delete({ postId: id });
        await PersonalMessage.delete({ id });

        // Cascade way
        // await Post.delete({ id, creatorId: req.session.userId});

        // also CHANGE THE ENTITY

        return true;
    }


    // CRUD create read update delete


}



