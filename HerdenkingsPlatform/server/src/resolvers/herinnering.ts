import { checkDemoAccess } from "../utils/checkDemoAccess";
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { STATUS,Categories, ACCOUNT_STATUS } from "../constants";
import { CommentHerinnering } from "../entities/Comment";
import { HerdenkingsPagina } from "../entities/HerdenkingsPagina";
import { Herinnering } from "../entities/Herinnering";
import { MediaHerinnering } from "../entities/Media";
import { User } from "../entities/User";
import { isAuthJWT } from "../middleware/isAuthJWT";
import { MyContext } from "../types";
import { checkIfCanCreateMemory } from "../utils/checkIfCanCreate/checkIfCanCreateMemory";
import { checkPermission } from "../utils/checkPermission";
import { deleteMediaFromAmazonS3Bucket } from "../utils/deleteFromAmazon";




@InputType()
class HerinneringInput {
    @Field()
    title: string
    @Field({ nullable: true })
    text?: string
    @Field({ nullable: true })
    categorie?: Categories

    @Field({ nullable: true })
    datumVanHerinnering?: Date

    @Field()
    on_timeline: boolean;   // alleen intieme kring kan zien


}



@ObjectType()
class PaginatedHerinneringen {
    @Field(() => [Herinnering])
    herinneringen: Herinnering[];

    @Field()
    hasMore: boolean;
}


@ObjectType()
class HerinneringTimeline {
    @Field(() => Herinnering)
    herinnering: Herinnering;

    @Field()
    row_number: number;
}


@ObjectType()
class PaginatedMediaHerinneringen {
    @Field(() => [MediaHerinnering])
    mediaHerinneringen: MediaHerinnering[];

    @Field()
    hasMore: boolean;
}



@Resolver(Herinnering)
export class HerinneringResolver {


    // fIELD RESOLVERS RUN WHEN THE WEB .graphql call this field
    @FieldResolver(() => String) // this is a graphgql thing
    textSnippet(
        @Root() root: Herinnering
    ) {
        return root?.text?.slice(0, 50);
    }

    // n+1 problem

    // Dataloader batches all the queries into a single function call!
    @FieldResolver(() => User)
    creator(@Root() herinnering: Herinnering,
        @Ctx() { userLoader }: MyContext) {
        return userLoader.load(herinnering.creatorId);
    }

    
    @FieldResolver(() => [MediaHerinnering])
    async media(@Root() herinnering: Herinnering) {

        const media = await getConnection()
            .getRepository(MediaHerinnering)
            .createQueryBuilder("media")
            .where("media.herinneringId =:id ", { id: herinnering.id })
            .getMany();

        return media;
    }

    @FieldResolver(() => [CommentHerinnering])
    async comments(@Root() herinnering: Herinnering) {

        const comment = await getConnection()
            .getRepository(CommentHerinnering)
            .createQueryBuilder("comment")
            .where("comment.herinneringId =:id ", { id: herinnering.id })
            .getMany();

        return comment;
    }




    
    @Query(() => PaginatedHerinneringen)  // type graphql
    @UseMiddleware(isAuthJWT)
    async herinneringen(
        @Arg('paginaId') paginaId: string,
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,       
        @Ctx() { payload }: MyContext,
    ): Promise<PaginatedHerinneringen> {   //TYPE TYPESCRIPT

        const accessstatus =payload!.statusList[paginaId]

        if (accessstatus < STATUS.Approved) {
            throw new Error("You dont have permission to view memories")
        }

        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;
        const pagina_id = paginaId;
        const replacements: any[] = [pagina_id, realLimitPlusOne, payload!.userId,accessstatus];


        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }

        // Als owner -> toon alles


        // Als creator -> toon publieke en eigen



        const herinneringen = await getConnection().query(`
        
        select h.*
        from herinnering h        
        where 
               
        (
            (h."paginaId" = $1 AND h."creatorId" = $3 ) OR (h."paginaId" = $1  AND   h."status" <= $4 )               
       
        
        
        
        ${cursor ? ` AND  h."createdAt" < $5  ` : ""}
       
        )
        

        order by h."createdAt" DESC

        limit $2;

        `,
            replacements
        );

        

        return {
            herinneringen: herinneringen.slice(0, realLimit),
            hasMore: herinneringen.length === realLimitPlusOne
        };

    }



    @Query(() => PaginatedHerinneringen)  // type graphql
    async herinneringen_demo(
        @Arg('paginaId') paginaId: string,
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,  
    ): Promise<PaginatedHerinneringen> {   //TYPE TYPESCRIPT

        checkDemoAccess(paginaId);
        const accessstatus = STATUS.CoOwner;

        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;
        const pagina_id = paginaId;
        const replacements: any[] = [pagina_id, realLimitPlusOne, accessstatus];


        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }

        const herinneringen = await getConnection().query(`
        
        select h.*
        from herinnering h
        
        where       
             
        (

      (h."text" IS NOT NULL) 
      
      AND

        (
           (h."paginaId" = $1  AND   h."status" <= $3 )               
       
        
        )
        
        ${cursor ? ` AND  h."createdAt" < $4  ` : ""}
       
        )

        order by h."createdAt" DESC

        limit $2;

        `,
            replacements
        );

        

        return {
            herinneringen: herinneringen.slice(0, realLimit),
            hasMore: herinneringen.length === realLimitPlusOne
        };

    }





    @Query(() => PaginatedMediaHerinneringen)  // type graphql
    @UseMiddleware(isAuthJWT)
    async herinneringen_gallerij(
        @Arg('paginaId') paginaId: string,
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,        
        @Ctx() { payload }: MyContext,
    ): Promise<PaginatedMediaHerinneringen> {   //TYPE TYPESCRIPT

       
        const accessstatus =payload!.statusList[paginaId]

        if (accessstatus < STATUS.Approved) {
            throw new Error("You dont have permission to view memories")
        }
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;

        const pagina_id = paginaId;


        const replacements: any[] = [pagina_id, realLimitPlusOne, payload!.userId,accessstatus];


        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }

   
        const mediaHerinneringen = await getConnection().query(`

        select m.*
        from media m
        where 
        
        (m."herinneringId" IN 
        
            (select h.id
            
            from herinnering h
            
            where 
        
                (
                    (h."paginaId" = $1 AND h."creatorId" = $3 ) OR (h."paginaId" = $1  AND   h."status" <= $4 )  
                
                )
            )


        ${cursor ? ` AND  m."createdAt" < $5  ` : ""}
       
        )
        

        order by m."createdAt" DESC

        limit $2;

        `,
            replacements
        );

        console.log("mediaHerinneringen (sliced" ,mediaHerinneringen.slice(0, realLimit) )

        
        return {
            mediaHerinneringen: mediaHerinneringen.slice(0, realLimit),
            hasMore: mediaHerinneringen.length === realLimitPlusOne
        };

    }


    @Mutation(() => [MediaHerinnering])  // type graphql
    @UseMiddleware(isAuthJWT)
    async mediaForVideoSlideshow(
        @Arg('paginaId') paginaId: string,    
        @Ctx() { payload }: MyContext,
    ): Promise<MediaHerinnering[]> {   //TYPE TYPESCRIPT

        // console.log("paginaId", paginaId);

       
        const accessstatus =payload!.statusList[paginaId]

        // if (accessstatus < STATUS.Intimate) {  //TODO zet hier de begrafenisondernemer ook bij (of enkel de begrafenisondernemer)
        //     throw new Error("You can't generate this")
        // }
        
        const begrafenisondernemer = await User.findOne({where: {id: payload!.userId}});

        if(!begrafenisondernemer){
            throw new Error("Could not find user")
        }

        if(begrafenisondernemer?.account_status !== ACCOUNT_STATUS.VERIFIED_PARTNER){
            throw new Error("No permission to generate this powerpoint")
        }

        const pagina_id = paginaId;
        const replacements: any[] = [pagina_id, accessstatus];      //TODO mag de begrafenisondernemer alles zien?
   

        //TODO sorteer per datum


        const mediaHerinneringen = await getConnection().query(`

        SELECT m.*
        FROM media m
        WHERE 
        
        (m."mediaType" = 'image')
        
        AND
        
        (m."herinneringId" IN 
        
            (SELECT h.id
            
            FROM herinnering h
            
            WHERE 
        
                (
                    (h."paginaId" = $1  AND   h."status" <= $2 )  
                
                )

                ORDER BY h."datumVanHerinnering" 
            
            )    
                    
        )
        
        order by m."createdAt" DESC


        `,
            replacements
        );


        //ORDER BY CASE WHEN h."datumVanHerinnering" IS NULL THEN 1 ELSE 0 END, h."datumVanHerinnering"

        console.log("mediaHerinneringen " ,mediaHerinneringen )

        
        return mediaHerinneringen;

    }



    @Query(() => PaginatedMediaHerinneringen)  // type graphql    
    async herinneringen_gallerij_demo(
        @Arg('paginaId') paginaId: string,
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null, 
    ): Promise<PaginatedMediaHerinneringen> {   //TYPE TYPESCRIPT

        checkDemoAccess(paginaId)
        const accessstatus = STATUS.CoOwner;

        
        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;

        const pagina_id = paginaId;

        const replacements: any[] = [pagina_id, realLimitPlusOne, accessstatus];


        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }
   
        const mediaHerinneringen = await getConnection().query(`

        select m.*
        from media m
        where 
        
        (m."herinneringId" IN 
        
            (select h.id
            
            from herinnering h
            
            where 
        
                (
                    (h."paginaId" = $1  AND   h."status" <= $3 )  
                
                )
            )

        ${cursor ? ` AND  m."createdAt" < $4  ` : ""}       
        )        

        order by m."createdAt" DESC
        limit $2;

        `,
            replacements
        );
        
        return {
            mediaHerinneringen: mediaHerinneringen.slice(0, realLimit),
            hasMore: mediaHerinneringen.length === realLimitPlusOne
        };

    }


 
    @Query(() => [Herinnering])  // type graphql
    @UseMiddleware(isAuthJWT)    
    async herinneringenByDate(            
        @Arg('paginaId') paginaId: string,       
        @Ctx() { payload }: MyContext,
    ): Promise<Herinnering[]> {   //TYPE TYPESCRIPT
     

        const accessstatus = payload!.statusList[paginaId];

        if (accessstatus < STATUS.Approved) {
            throw new Error("You dont have permission to view memories")
        }



        // checkPermission(accessstatus,STATUS.Approved);

       
        const replacements: any[] = [paginaId, payload!.userId,accessstatus];
        
        
        
        const herinneringen = await getConnection().query(`

        
        select h.*
        from herinnering h
        where
           
            (h."on_timeline" = true AND h."datumVanHerinnering" IS NOT NULL AND h."paginaId" = $1)  
            AND
            ( h."creatorId" = $2 OR  h."status" <= $3 )
    
        order by h."datumVanHerinnering" ASC, h."createdAt" ASC
      
        
        `,
            replacements
        ) as  Herinnering[];
        


        console.log("herinneringen server by Date:", herinneringen);
        
        // herinneringen.map((herr) => {
        //     console.log(herr.title, herr.datumVanHerinnering)
        // })

        return herinneringen;


    }


    @Query(() => [Herinnering])  // type graphql   
    async herinneringenByDate_demo(            
        @Arg('paginaId') paginaId: string, 
    ): Promise<Herinnering[]> {   //TYPE TYPESCRIPT
     
        checkDemoAccess(paginaId);
        

        const replacements: any[] = [paginaId];
        
                
        const herinneringen = await getConnection().query(`

        
        select h.*
        from herinnering h
        where
           
            (h."on_timeline" = true AND h."datumVanHerinnering" IS NOT NULL AND h."paginaId" = $1)  
           
    
        order by h."datumVanHerinnering" ASC, h."createdAt" ASC
      
        
        `,
            replacements
        ) as  Herinnering[];
              

        return herinneringen;


    }



    @Query(() => Herinnering, { nullable: false })  // type graphql
    @UseMiddleware(isAuthJWT)  
    async herinnering(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<Herinnering | undefined> {   //TYPE TYPESCRIPT

        const herinnering = await Herinnering.findOne({
            where:
            {
                id: id,
            }
        });
        if(!herinnering){
            throw new Error("Could not find memory")
        }

        checkPermission(payload!.statusList[paginaId],STATUS.Approved,herinnering.creatorId,payload!.userId );


        return herinnering;


    }

    @Query(() => Herinnering, { nullable: false })  // type graphql
    async herinnering_demo(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
    ): Promise<Herinnering | undefined> {   //TYPE TYPESCRIPT

        checkDemoAccess(paginaId);
        const herinnering = await Herinnering.findOne({
            where:
            {
                id: id,
            }
        });
        if(!herinnering){
            throw new Error("Could not find memory")
        }


        return herinnering;


    }


   

    @Mutation(() => Herinnering)  // type graphql
    @UseMiddleware(isAuthJWT)
    async createHerinnering(
        @Arg('input') input: HerinneringInput,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
        @Arg('status', { nullable: true }) status?: number,
    ): Promise<Herinnering> {   //TYPE TYPESCRIPT
        // 2 sql queries

       
        let pagina = await HerdenkingsPagina.findOne({
            where: {
                id:paginaId
            }
        });
        if(!pagina){
            throw new Error("could not find page")
        }

        await checkIfCanCreateMemory(pagina,payload!.statusList[paginaId]);
      

        if(pagina?.control_before === true || payload!.statusList[paginaId] <2 ){
            status = 4;
        }

        return Herinnering.create({
            ...input,
            status: status,
            creatorId: payload!.userId,
            paginaId: paginaId
        }).save();
    }

    @Mutation(() => Herinnering, { nullable: true })  
    @UseMiddleware(isAuthJWT)       
    async changeMemoryStatus(
        @Arg('id') id: string,
        @Arg('status') status: number,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<Herinnering | null> {


        let herinnering = await Herinnering.findOne({where:{id: id}});

        if (!herinnering) {
            throw new Error("Could not find memory")
        }

        checkPermission(payload!.statusList[paginaId],STATUS.CoOwner,herinnering!.creatorId,payload!.userId);

        herinnering.status = status;
        await herinnering.save();

        return herinnering;

    }


    @Mutation(() => Herinnering, { nullable: true })
    @UseMiddleware(isAuthJWT)      
    async changeMemoryOnTimelineState(
        @Arg('id') id: string,
        @Arg('status', () => Boolean) status: boolean,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<Herinnering | null> {

        const on_timeline = status;


        let herinnering = await Herinnering.findOne({where:{id: id}});

        if (!herinnering) {
            throw new Error("Could not find memory")
        }

        checkPermission(payload!.statusList[paginaId],STATUS.CoOwner,herinnering!.creatorId,payload!.userId);

        if(!herinnering.datumVanHerinnering){
            throw new Error('Cant put on timeline without date')
        }

        herinnering.on_timeline = on_timeline;
        await herinnering.save();

    

        return herinnering;

    }



    @Mutation(() => Herinnering, { nullable: true }) 
    @UseMiddleware(isAuthJWT)
    async updateHerinnering(
        @Ctx() { payload }: MyContext,
        @Arg('id') id: string,
        @Arg('title') title : string,
        @Arg('paginaId') paginaId: string,
        @Arg('text', { nullable: true }) text?: string,
        @Arg('categorie', { nullable: true }) categorie?: Categories,
        @Arg('datumVanHerinnering', { nullable: true }) datumVanHerinnering?: Date,
        @Arg('ontimeline', { nullable: true }) ontimeline?: boolean,
        @Arg('status', { nullable: true }) status?: number,


    ): Promise<Herinnering | null> {


        const herinnering = await Herinnering.findOne({where:{id: id}});

        if (!herinnering) {
            throw new Error("Could not find memory")
        }

        checkPermission(payload!.statusList[paginaId],STATUS.CoOwner,herinnering.creatorId,payload!.userId );
        
        if(title){
            herinnering.title = title;
        }
        if(text){
            herinnering.text = text;
        }
        if(categorie){
            herinnering.categorie = categorie;
        }
        if(datumVanHerinnering){
            herinnering.datumVanHerinnering = datumVanHerinnering;
        }
        if(ontimeline !== undefined){
            herinnering.on_timeline = ontimeline;
        }
        if(status){
            herinnering.status = status;
        }
        

        await herinnering.save();        
        return herinnering;

    }



    @Mutation(() => Boolean)  
    @UseMiddleware(isAuthJWT)
    async deleteHerinnering(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext): Promise<Boolean> {
        
        

        const herinnering = await Herinnering.findOne({
            where: {
                id: id,
            }
        });
        if (!herinnering) {
            return false;
        }

        checkPermission(payload!.statusList[paginaId],STATUS.CoOwner,herinnering.creatorId,payload!.userId );
        
      

        const mediaHerrToDelete = await MediaHerinnering.find({
            where:{
                herinneringId:id
            }
        });

        let mediaUrls: any[] = [];
        mediaHerrToDelete.map((medherr)  => {
            mediaUrls.push({Key: medherr.urlFile.split("amazonaws.com/")[1]});
        });
  
        await deleteMediaFromAmazonS3Bucket(mediaUrls);

        await getConnection().createQueryBuilder()
        .update(HerdenkingsPagina)
        .where({ id: paginaId })
        .set({ number_of_memories: () => "number_of_memories - 1" })
        .execute();
    
        await Herinnering.delete({ id });


        return true;
    }


    // CRUD create read update delete


}


