import { Arg, Ctx, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { STATUS } from '../constants';
import { CommentMedia } from "../entities/Comment";
import { Condolatie } from "../entities/Condolatie";
import { HerdenkingsPagina } from '../entities/HerdenkingsPagina';
import { Herinnering } from "../entities/Herinnering";
import { Media, MediaCondolatie, MediaHerinnering, MediaMessage, MediaPersonalMessage } from "../entities/Media";
import { PersonalMessage } from "../entities/PersonalMessage";
// import { Updoot } from "../entities/Updoot";
import { User } from "../entities/User";
import { isAuthJWT } from "../middleware/isAuthJWT";
import { MyContext } from "../types";
import { checkIfCanCreateMedia } from '../utils/checkIfCanCreate/checkIfCanCreateMedia';
import { checkPermission } from '../utils/checkPermission';
import { deleteMediaFromAmazonS3Bucket } from '../utils/deleteFromAmazon';



@InputType()
class MediaInput {
    @Field({ nullable: true })
    title?: string
    @Field({ nullable: true })
    text?: string
    @Field({ nullable: true })
    datumVanMedia?: Date
    @Field()
    urlFile!: string
    @Field()
    mediaType!: string
    @Field()
    objectSize!: number
}



// @ObjectType()
// class PaginatedMediaCondolatie {
//     @Field(() => [MediaCondolatie])
//     mediameervoud: MediaCondolatie[];

//     @Field()
//     hasMore: boolean;
// }



@Resolver(Media)
export class MediaResolver {


    // Dataloader batches all the queries into a single function call!
    @FieldResolver(() => User)
    creator(@Root() media: Media,
        @Ctx() { userLoader }: MyContext) {
        return userLoader.load(media.creatorId);
    }

    @FieldResolver(() => [CommentMedia])
    async comments(@Root() med: Media) {

        const comment = await getConnection()
            .getRepository(CommentMedia)
            .createQueryBuilder("comment")
            .where("comment.mediaId =:id ", { id: med.id })
            .getMany();

        return comment;
    }

    @Query(() => Media, { nullable: true })  // ongeacht voor condolatie/herinnering
    @UseMiddleware(isAuthJWT)
    mediaById(
        @Arg('id') id: string): Promise<Media | undefined> {
        return Media.findOne(id);
    }


    //TODO:FIX MUTATION (pageid)
    @Mutation(() => Media, { nullable: true })  // type graphql
    @UseMiddleware(isAuthJWT)
    async updateMedia(
        @Arg('id') id: string,
        @Arg('title') title: string,
        @Arg('text') text: string,
        @Arg('datumVanMedia') datumVanMedia: Date,
        @Ctx() { payload }: MyContext
    ): Promise<Media | null> {

        // checkPermission(payload!.statusList[paginaId],STATUS.CoOwner,media.creatorId,payload!.userId );


        const mediaUpload = await getConnection()
            .createQueryBuilder()
            .update(Media)
            .set({ title, text, datumVanMedia })
            .where('id =:id and "creatorId" = :creatorId',
                { id, creatorId: payload!.userId })
            .returning("*")
            .execute();

        // console.log("post; ", post);

        return mediaUpload.raw[0];

    }


    @Mutation(() => Boolean, { nullable: true })  // type graphql
    @UseMiddleware(isAuthJWT)
    async deleteMedia(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext): Promise<Boolean | undefined> {

        const media = await Media.findOne(id);
        if (!media) {
            throw new Error("Could noit find media")
        }

        checkPermission(payload!.statusList[paginaId],STATUS.CoOwner,media.creatorId,payload!.userId );


        if (media.creatorId === payload!.userId || payload!.statusList[paginaId] > 3) {

            let mediaUrls: any[] = [{"Key" :media.urlFile.split("amazonaws.com/")[1]}];

            await deleteMediaFromAmazonS3Bucket(mediaUrls);
            await getConnection().createQueryBuilder()
            .update(HerdenkingsPagina)
            .where({ id: paginaId })
            .set({ number_of_media: () => "number_of_media - 1" })
            .set({ number_of_bytes: () => `number_of_bytes - ${media.objectSize}` })
            .execute()
            // await Updoot.delete({ postId: id });
            await Media.delete({ id });


            return true;

        }else{
            throw new Error('not authorized');
        }

     

    }


    // @Mutation(() => Media)  // type graphql
    // @UseMiddleware(isAuthJWT)
    // async createMedia(
    //     @Arg('input') input: MediaInput,
    //     @Arg('paginaId') paginaId: string,
    //     @Ctx() { payload }: MyContext,
    //     @Arg('objectId') objectId: string,
    //     @Arg('objectType') objectType: string,

    // ): Promise<Media| undefined> {   //TYPE TYPESCRIPT
    //     // 2 sql queries   
    //     checkPermission(payload!.statusList[paginaId],STATUS.Pending);

    //     let media;
    //     switch(objectType) {
    //         case "herinnering":
    //             media = await MediaHerinnering.create({
    //                 ...input,
    //                 creatorId: payload!.userId,
    //                 herinneringId: objectId,
    //             }).save();
    //             break;

    //         case "condolatie":
    //             media = await MediaCondolatie.create({
    //                 ...input,
    //                 creatorId: payload!.userId,
    //                 condolatieId: objectId,
    //             }).save();
    //             break;

    //         case "persoonlijkeboodschap":
    //             media = await MediaPersonalMessage.create({
    //                 ...input,
    //                 creatorId: payload!.userId,
    //                 persoonlijkeboodschapId: objectId,
    //             }).save();
    //             break;

    //     }



    //     return media as Media;

    // }




}






@Resolver(MediaCondolatie)
export class MediaCondolatieResolver extends MediaResolver {


    @FieldResolver(() => Condolatie)
    condolatie(@Root() mediacondo: MediaCondolatie,
        @Ctx() { condolatieLoader }: MyContext) {
        console.log('condolatieLoader', condolatieLoader);
        return condolatieLoader.load(mediacondo.condolatieId);
    }


    @Query(() => MediaCondolatie, { nullable: true })  // ongeacht voor condolatie/herinnering
    @UseMiddleware(isAuthJWT)
    mediaCondolatieById(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,): Promise<MediaCondolatie | undefined> {


        if (payload!.statusList[paginaId] < STATUS.Approved) {
            throw new Error("Kan geen media opvragen");
        }

        return MediaCondolatie.findOne(id);
    }

    @Mutation(() => MediaCondolatie)  // type graphql
    @UseMiddleware(isAuthJWT)
    async createMediaCondolatie(
        @Arg('input') input: MediaInput,
        @Arg('paginaId') paginaId: string,        
        @Ctx() { payload }: MyContext,
        @Arg('condolatieId') condolatieId: string,

    ): Promise<MediaCondolatie> {   //TYPE TYPESCRIPT
        // 2 sql queries   

        let pagina = await HerdenkingsPagina.findOne({
            where: {
                id:paginaId
            }
        });
        if(!pagina){
            throw new Error("could not find page")
        }

        await checkIfCanCreateMedia(pagina,payload!.statusList[paginaId],input.objectSize);


        return MediaCondolatie.create({
            ...input,
            creatorId: payload!.userId,
            condolatieId: condolatieId,
        }).save();

    }
}


@Resolver(MediaPersonalMessage)
export class MediaPersonalMessageResolver extends MediaResolver {


    @FieldResolver(() => PersonalMessage)
    personalMessage(@Root() mediapmessage: MediaPersonalMessage,
        @Ctx() { personalmessageLoader }: MyContext) {

        return personalmessageLoader.load(mediapmessage.persoonlijkeboodschapId);
    }


    @Query(() => MediaPersonalMessage, { nullable: true })  // ongeacht voor condolatie/herinnering
    mediaPersonalMessageById(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,): Promise<MediaPersonalMessage | undefined> {

        if (payload!.statusList[paginaId] < STATUS.Approved) {
            throw new Error("Kan geen media opvragen");
        }

        return MediaPersonalMessage.findOne(id);
    }

    @Mutation(() => MediaPersonalMessage)  // type graphql
    @UseMiddleware(isAuthJWT)
    async createMediaPersonalMessage(
        @Arg('input') input: MediaInput,
        @Arg('paginaId') paginaId: string,       
        @Arg('pmessageId') pmessageId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<MediaPersonalMessage> {   //TYPE TYPESCRIPT
        // 2 sql queries

        let pagina = await HerdenkingsPagina.findOne({
            where: {
                id:paginaId
            }
        });
        if(!pagina){
            throw new Error("could not find page")
        }

        await checkIfCanCreateMedia(pagina,payload!.statusList[paginaId],input.objectSize);

       
        await getConnection().createQueryBuilder()
            .update(HerdenkingsPagina)
            .where({ id: paginaId })
            .set({ number_of_media: () => "number_of_media + 1" })
            .set({ number_of_bytes: () => `number_of_bytes + ${input.objectSize}` })
            .execute()


        return MediaPersonalMessage.create({
            ...input,
            creatorId: payload!.userId,
            persoonlijkeboodschapId: pmessageId,
        }).save();

    }




}


@Resolver(MediaMessage)
export class MediaMessageResolver extends MediaResolver {


    @FieldResolver(() => MediaMessage)
    message(@Root() mediapmessage: MediaMessage,
        @Ctx() { messageLoader }: MyContext) {

        return messageLoader.load(mediapmessage.messageId);
    }


    @Query(() => MediaMessage, { nullable: true })  // ongeacht voor condolatie/herinnering
    mediaMessageById(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,): Promise<MediaMessage | undefined> {

        if (payload!.statusList[paginaId] < STATUS.Approved) {
            throw new Error("Kan geen media opvragen");
        }

        return MediaMessage.findOne(id);
    }

    @Mutation(() => MediaMessage)  // type graphql
    @UseMiddleware(isAuthJWT)
    async createMediaMessage(
        @Arg('input') input: MediaInput,
        @Arg('paginaId') paginaId: string,       
        @Arg('messageId') messageId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<MediaMessage> {   //TYPE TYPESCRIPT
        // 2 sql queries

        let pagina = await HerdenkingsPagina.findOne({
            where: {
                id:paginaId
            }
        });
        if(!pagina){
            throw new Error("could not find page")
        }

        await checkIfCanCreateMedia(pagina,payload!.statusList[paginaId],input.objectSize);



        return MediaMessage.create({
            ...input,
            creatorId: payload!.userId,
            messageId: messageId,
        }).save();

    }




}



@Resolver(MediaHerinnering)
export class MediaHerinneringResolver extends MediaResolver {


    @FieldResolver(() => Herinnering)
    herinnering(@Root() mediaherr: MediaHerinnering,
        @Ctx() { herinneringLoader }: MyContext) {
        return herinneringLoader.load(mediaherr.herinneringId);
    }



    @Query(() => MediaHerinnering, { nullable: true })  // ongeacht voor condolatie/herinnering
    mediaHerinneringById(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,): Promise<MediaHerinnering | undefined> {

        if (payload!.statusList[paginaId] < STATUS.Approved) {
            throw new Error("Kan geen media opvragen");
        }

        return MediaHerinnering.findOne(id);
    }


    @Mutation(() => MediaHerinnering)  // type graphql
    @UseMiddleware(isAuthJWT)
    async createMediaHerinnering(
        @Arg('input') input: MediaInput,
        @Arg('paginaId') paginaId: string,        
        @Ctx() { payload }: MyContext,
        @Arg('herinneringId') herinneringId: string,

    ): Promise<MediaHerinnering> {   //TYPE TYPESCRIPT
        // 2 sql queries   

        let pagina = await HerdenkingsPagina.findOne({
            where: {
                id:paginaId
            }
        });
        if(!pagina){
            throw new Error("could not find page")
        }

        await checkIfCanCreateMedia(pagina,payload!.statusList[paginaId],input.objectSize);


        const media = await MediaHerinnering.create({
            ...input,
            creatorId: payload!.userId,
            herinneringId: herinneringId,
        }).save();

        console.log("media : ", media);

        return media;

    }

}