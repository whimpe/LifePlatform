// import { Media } from "../entities/Media";

import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { STATUS } from "../constants";
import { CommentMessage } from "../entities/Comment";
import { HerdenkingsPagina } from "../entities/HerdenkingsPagina";
import { MediaMessage } from "../entities/Media";
import { Message } from "../entities/Message";
// import { Updoot } from "../entities/Updoot";
import { User } from "../entities/User";
import { isAuthJWT } from "../middleware/isAuthJWT";
import { MyContext } from "../types";
import { checkDemoAccess } from "../utils/checkDemoAccess";
import { checkIfCanCreateMessage } from "../utils/checkIfCanCreate/checkIfCanCreateMessage";
import { checkPermission } from "../utils/checkPermission";
import { deleteMediaFromAmazonS3Bucket } from "../utils/deleteFromAmazon";



@InputType()
class MessageInput {
   
    @Field({ nullable: false })
    text: string

    @Field({ nullable: true })
    status: STATUS

}



@ObjectType()
class PaginatedMessages {
    @Field(() => [Message])
    berichten: Message[];

    @Field()
    hasMore: boolean;
}


@Resolver(Message)
export class MessageResolver {

    @FieldResolver(() => User)
    creator(@Root() message: Message,
        @Ctx() { userLoader }: MyContext) {
        return userLoader.load(message.creatorId);
    }

    @FieldResolver(() => [MediaMessage])
    async media(@Root() message: Message) {

        const media = await getConnection()
            .getRepository(MediaMessage)
            .createQueryBuilder("media")
            .where("media.messageId =:id ", { id: message.id })
            .getMany();

        return media;
    }

    @FieldResolver(() => [CommentMessage])
    async comments(@Root() message: Message) {

        const comment = await getConnection()
            .getRepository(CommentMessage)
            .createQueryBuilder("comment")
            .where("comment.messageId =:id ", { id: message.id })
            .getMany();

        return comment;
    }



    @Query(() => Message, { nullable: false })  // type graphql
    @UseMiddleware(isAuthJWT)
    async message(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<Message | undefined> {   //TYPE TYPESCRIPT

        const bericht = await Message.findOne({
            where:
            {
                id: id,
            }
        });

        if(!bericht){
            throw new Error("Could not find message")
        }

        checkPermission(payload!.statusList[paginaId],STATUS.Approved,bericht.creatorId,payload!.userId );



        return bericht;


    }

    /**
     * Queries the messages that are personal from the user to the person 
     * No one except the user can see this
     * @param limit 
     * @param paginaId 
     * @param cursor 
     * @param param3 
     * @returns 
     */
    @Query(() => PaginatedMessages)  // type graphql
    @UseMiddleware(isAuthJWT)   
    async ownMessages(      // altijd voor tijdlijn
        @Arg('limit', () => Int) limit: number,
        @Arg('paginaId') paginaId: string,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,       
        @Ctx() { payload }: MyContext,
    ): Promise<PaginatedMessages> {   //TYPE TYPESCRIPT
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;

        const accessstatus = payload!.statusList[paginaId];

        if (accessstatus < STATUS.Approved) {
            throw new Error("You dont have permission to view messages")
        }

        const replacements: any[] = [paginaId, realLimitPlusOne, payload!.userId];
        
        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }

        const messages = await getConnection().query(`
        
        select m.*
        from message m
        
        where        
             
        (
            (m."text" IS NOT NULL) 
            
            AND
            
            (m."paginaId" = $1 AND m."creatorId" = $3 AND m."status" = 5 )  
                            
            ${cursor ? ` AND  m."createdAt" < $4  ` : ""}       
        )       

        order by m."createdAt" DESC

        limit $2;

        `,
            replacements
        );

        

        return {
            berichten: messages.slice(0, realLimit),
            hasMore: messages.length === realLimitPlusOne
        };


    }

    /**
     * Queries messages except the personal ones
     *
     */
     @Query(() => PaginatedMessages)  // type graphql
     @UseMiddleware(isAuthJWT)   
     async messages(      // altijd voor tijdlijn
         @Arg('limit', () => Int) limit: number,
         @Arg('paginaId') paginaId: string,
         @Arg('cursor', () => String, { nullable: true }) cursor: string | null,       
         @Ctx() { payload }: MyContext,
     ): Promise<PaginatedMessages> {   //TYPE TYPESCRIPT
         const realLimit = Math.min(50, limit);
         const realLimitPlusOne = realLimit + 1;
 
         const accessstatus = payload!.statusList[paginaId];
 
         if (accessstatus < STATUS.Approved) {
             throw new Error("You dont have permission to view messages")
         }
 

         //TODO: replace confusing owner status! -> here owner means the owner of the message so 
         // 5 here means that only the author of the message is allowed to get the message, even not the owner of the page can see these messages
         const replacements: any[] = [paginaId, realLimitPlusOne, payload!.userId,accessstatus];
         
         if (cursor) {
             replacements.push(new Date(parseInt(cursor)));
         }
 
         const messages = await getConnection().query(`
         
         select m.*
         from message m
         
         where        
              
         (
             (m."status" <> 5 ) 
             
             AND
             
             ((m."paginaId" = $1 AND m."creatorId" = $3 ) OR (m."paginaId" = $1  AND   m."status" <= $4 )  )
                             
             ${cursor ? ` AND  m."createdAt" < $5  ` : ""}       
         )       
 
         order by m."createdAt" ASC
 
         limit $2;
 
         `,
             replacements
         );

         
         return {
             berichten: messages.slice(0, realLimit),
             hasMore: messages.length === realLimitPlusOne
         };
 
 
    }


    /**
     * Queries messages except the personal ones
     *
     */
     @Query(() => PaginatedMessages)  // type graphql
     async messages_demo(      // altijd voor tijdlijn
         @Arg('limit', () => Int) limit: number,
         @Arg('paginaId') paginaId: string,
         @Arg('cursor', () => String, { nullable: true }) cursor: string | null,  
     ): Promise<PaginatedMessages> {   //TYPE TYPESCRIPT

        checkDemoAccess(paginaId);

         const realLimit = Math.min(50, limit);
         const realLimitPlusOne = realLimit + 1;         
 
         const replacements: any[] = [paginaId, realLimitPlusOne];
         
         if (cursor) {
             replacements.push(new Date(parseInt(cursor)));
         }
 
         const messages = await getConnection().query(`
         
         select m.*
         from message m
         
         where        
              
         (
            
             (m."paginaId" = $1 )
                             
             ${cursor ? ` AND  m."createdAt" < $3  ` : ""}       
         )       
 
         order by m."createdAt" ASC
 
         limit $2;
 
         `,
             replacements
         );
 
         
 
         return {
             berichten: messages.slice(0, realLimit),
             hasMore: messages.length === realLimitPlusOne
         };
 
 
     }


    @Mutation(() => Message)  // type graphql
    @UseMiddleware(isAuthJWT)
    async createMessage(
        @Arg('input') input: MessageInput,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,        
    ): Promise<Message> {   //TYPE TYPESCRIPT
        // 2 sql queries

        let pagina = await HerdenkingsPagina.findOne({
            where: { id:paginaId}});
        if(!pagina){
            throw new Error("could not find page")
        }
       
        await checkIfCanCreateMessage(pagina,payload!.statusList[paginaId]);
               

        // TODO: nieuw veld toevoegen bij herinneringen en boodschappen controle before
        // if(pagina?.control_before === true || payload!.statusList[paginaId] <2
        //      ){
        //     input.status = 4;
        // }
        

        return Message.create({
            ...input,           
            creatorId: payload!.userId,
            paginaId: paginaId
        }).save();
    }


    @Mutation(() => Message, { nullable: true })  
    @UseMiddleware(isAuthJWT)       
    async changeMessageStatus(
        @Arg('id') id: string,
        @Arg('status') status: number,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<Message | null> {


        //TODO: maken dat dit echt voor jezelf is en dat de eigenaar van de pagina dat kan wegdoen als het publiek is
        // maar niet kan zien als het op enkel ik staat -> nieuwe status? 6 of 5?
        let message = await Message.findOne({where:{id: id}});

        if (!message) {
            throw new Error("Could not find memory")
        }

        checkPermission(payload!.statusList[paginaId],STATUS.CoOwner,message!.creatorId,payload!.userId);
        
        message.status = status;
        await message.save();
        
        return message;
        

    }



    @Mutation(() => Boolean)  
    @UseMiddleware(isAuthJWT)
    async deleteMessage(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext): Promise<Boolean> {
        
        let message = await Message.findOne({where:{id: id}});

        if (!message) {
            throw new Error("Could not find memory")
        }

        checkPermission(payload!.statusList[paginaId],STATUS.CoOwner,message!.creatorId,payload!.userId);
        
    
        const mediaMessagesToDelete = await MediaMessage.find({
            where:{
                messageId:id
            }
        });

        let mediaUrls: any[] = [];
        mediaMessagesToDelete.map((mediaMessages)  => {
            mediaUrls.push({Key: mediaMessages.urlFile.split("amazonaws.com/")[1]});
        });
  
        await deleteMediaFromAmazonS3Bucket(mediaUrls);

        await getConnection().createQueryBuilder()
        .update(HerdenkingsPagina)
        .where({ id: paginaId })
        .set({ number_of_memories: () => "number_of_memories - 1" })
        .execute();
    
        await Message.delete({ id });


        return true;
    }



}