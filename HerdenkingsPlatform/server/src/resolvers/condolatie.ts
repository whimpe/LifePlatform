// import { Media } from "../entities/Media";
import { checkIfCanCreateCondolance } from "../utils/checkIfCanCreate/checkIfCanCreateCondolance";
import { Arg, Ctx, Field, FieldResolver, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { STATUS } from "../constants";
import { Condolatie } from "../entities/Condolatie";
import { HerdenkingsPagina } from "../entities/HerdenkingsPagina";
import { MediaCondolatie } from "../entities/Media";
import { User } from "../entities/User";
import { isAuthJWT } from "../middleware/isAuthJWT";
import { MyContext } from "../types";
import { checkIfCanCreate } from "../utils/checkIfCanCreate";
import { checkPermission } from "../utils/checkPermission";
import { deleteMediaFromAmazonS3Bucket } from "../utils/deleteFromAmazon";
import { checkDemoAccess } from "../utils/checkDemoAccess";


@InputType()
class CondolatieInput {
    // @Field()             dit heeft geen titel?
    // title: string
    @Field()
    text: string


    // @Field({nullable:true})
    // mediaId?: number
}



@ObjectType()
class PaginatedCondolaties {
    @Field(() => [Condolatie])
    condolaties: Condolatie[];

    @Field()
    hasMore: boolean;
}



@Resolver(Condolatie)
export class CondolatieResolver {


    // fIELD RESOLVERS RUN WHEN THE WEB .graphql call this field
    @FieldResolver(() => String) // this is a graphgql thing
    textSnippet(
        @Root() root: Condolatie
    ) {
        return root.text.slice(0, 50);
    }

    // n+1 problem

    // Dataloader batches all the queries into a single function call!
    @FieldResolver(() => User)
    creator(@Root() condolatie: Condolatie,
        @Ctx() { userLoader }: MyContext) {
        return userLoader.load(condolatie.creatorId);
    }

    @FieldResolver(() => [MediaCondolatie])
    async media(@Root() condo: Condolatie) {
        const media = await getConnection()
            .getRepository(MediaCondolatie)
            .createQueryBuilder("media")
            .where("media.condolatieId =:id ", { id: condo.id })
            .getMany();

        return media;
    }




    @Query(() => PaginatedCondolaties)  // type graphql
    @UseMiddleware(isAuthJWT)    
    async condolaties(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<PaginatedCondolaties> {   //TYPE TYPESCRIPT


        // Check Permission
        if (payload!.statusList[paginaId] < STATUS.Approved) {
            throw new Error("You dont have permission to view condolances")
        }

        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;

        const replacements: any[] = [paginaId, realLimitPlusOne];


        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }


        const condolaties = await getConnection().query(`
        
        select c.*
        from condolatie c
        
        where c."paginaId" = $1 
        ${cursor ? `AND  c."createdAt" < $3` : ""}

        order by c."createdAt" DESC

        limit $2

        `,
            replacements
        );

        console.log("condolaties server:", condolaties);

        return {
            condolaties: condolaties.slice(0, realLimit),
            hasMore: condolaties.length === realLimitPlusOne
        };

    }

    @Query(() => PaginatedCondolaties)  // type graphql
    async condolaties_demo(
        @Arg('limit', () => Int) limit: number,
        @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
        @Arg('paginaId') paginaId: string,       
    ): Promise<PaginatedCondolaties> {   //TYPE TYPESCRIPT


        // Check Permission
        checkDemoAccess(paginaId);

        const realLimit = Math.min(50, limit);
        const realLimitPlusOne = realLimit + 1;

        const replacements: any[] = [paginaId, realLimitPlusOne];


        if (cursor) {
            replacements.push(new Date(parseInt(cursor)));
        }


        const condolaties = await getConnection().query(`
        
        select c.*
        from condolatie c
        
        where c."paginaId" = $1 
        ${cursor ? `AND  c."createdAt" < $3` : ""}

        order by c."createdAt" DESC

        limit $2

        `,
            replacements
        );

        return {
            condolaties: condolaties.slice(0, realLimit),
            hasMore: condolaties.length === realLimitPlusOne
        };

    }


    @Query(() => Condolatie, { nullable: true })  // type graphql
    @UseMiddleware(isAuthJWT)
    async condolatie(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext): Promise<Condolatie | undefined> {   //TYPE TYPESCRIPT
       
        let condolatie = await Condolatie.findOne({
            where: {
                id:id
            }
        });

        if(!condolatie){
            throw new Error("could not find condolatie")
        }


        checkPermission(payload!.statusList[paginaId],STATUS.Approved,condolatie.creatorId,payload!.userId );
        
    
        return condolatie;
    }

    @Mutation(() => Condolatie)  // type graphql
   @UseMiddleware(isAuthJWT)
    async createCondolatie(
        @Arg('input') input: CondolatieInput,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext
    ): Promise<Condolatie> {   //TYPE TYPESCRIPT
        // 2 sql queries

        let pagina = await HerdenkingsPagina.findOne({
            where: {
                id:paginaId
            }
        });

        if(!pagina){
            throw new Error("could not find page")
        }

        await checkIfCanCreateCondolance(pagina,payload!.statusList[paginaId]);

        

        return Condolatie.create({
            ...input, // media zit hier al in
            creatorId: payload!.userId,
            paginaId: paginaId
        }).save();
    }


    @Mutation(() => Condolatie, { nullable: true })  // type graphql
    @UseMiddleware(isAuthJWT)
    async updateCondolatie(
        @Arg('id') id: string,
        @Arg('text') text: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext
    ): Promise<Condolatie | null> {

        let condolatie = await Condolatie.findOne({
            where: {
                id:id
            }
        });

        if(!condolatie){
            throw new Error("could not find condolatie")
        }


        checkPermission(payload!.statusList[paginaId],STATUS.CoOwner,condolatie.creatorId,payload!.userId );
        
        condolatie.text = text;
        await condolatie.save();

        return condolatie;
      

    }

    @Mutation(() => Boolean)  // type graphql
    @UseMiddleware(isAuthJWT)
    async deleteCondolatie(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext): Promise<Boolean> {


        // Not cascade way
        const condolatie = await Condolatie.findOne({
            where: {
                id: id,
            }
        });
        if(!condolatie){
            throw new Error("Could not find condolance")
        }

        checkPermission(payload!.statusList[paginaId],STATUS.CoOwner,condolatie.creatorId,payload!.userId );

       

        await getConnection().createQueryBuilder()
        .update(HerdenkingsPagina)
        .where({ id: paginaId })
        .set({ number_of_condolances: () => "number_of_condolances - 1" })
        .execute()


        const mediacondolatieToDelete = await MediaCondolatie.find({
            where:{
                condolatieId:id
            }
        });

        let mediaUrls: any[] = [];
        mediacondolatieToDelete.map((medcond)  => {
            mediaUrls.push({"Key" :medcond.urlFile.split("amazonaws.com/")[1]});
        });

               
        await deleteMediaFromAmazonS3Bucket(mediaUrls);

        await Condolatie.delete({ id });


        return true;
    }




}