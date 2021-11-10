import { STATUS } from "../constants";
import { checkPermission } from "../utils/checkPermission";
import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Comment, CommentHerinnering, CommentMedia } from "../entities/Comment";
import { Herinnering } from "../entities/Herinnering";
import { User } from "../entities/User";
import { isAuthJWT } from "../middleware/isAuthJWT";
import { MyContext } from "../types";


@Resolver(Comment)
export class CommentResolver {

    @FieldResolver(() => User)
    creator(@Root() comment: Comment,
        @Ctx() { userLoader }: MyContext) {
        return userLoader.load(comment.creatorId);
    }

    @Query(() => Comment, { nullable: true })
    commentById(
        @Arg('id') id: number): Promise<Comment | undefined> {
        return Comment.findOne(id);
    }

    @Mutation(() => Boolean, { nullable: true })  // type graphql
    @UseMiddleware(isAuthJWT)
    async updateComment(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Arg('comment') comment: string,
        @Ctx() { payload }: MyContext
    ): Promise<Boolean | null> {

        let replacements = [id, comment, paginaId, payload!.userId];

        try {
            await getConnection().transaction(
                async (tm) => {
                    await tm.query(
                        `
                
                    UPDATE  comment c
                    SET     c.comment = $2
                    FROM    comment c
                        INNER JOIN herinnering h
                        ON h.id = c."herinneringId"
                    
                    WHERE c.id === $1 AND c."creatorId" === $4 AND c."paginaId" === $3 ;
                    
                    
                    
                    `
                        , replacements);
                }

            );
            return true;
        } catch (err) {
            return false;
        }

    }


    /**
     * Delete the comment
     */
    @Mutation(() => Boolean)
    @UseMiddleware(isAuthJWT)
    async deleteComment(
        @Arg('id') id: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,
    ): Promise<Boolean> {

        const comment = await Comment.findOne({ where: { id: id } });

        if (!comment) {
            throw new Error("Could not find comment")
        }

        checkPermission(payload!.statusList[paginaId], STATUS.CoOwner, comment.creatorId, payload!.userId);


        await comment.remove();
        return true;

    }
}


@Resolver(CommentMedia)
export class CommentMediaResolver extends CommentResolver {

    //TODO: make
}

@Resolver(CommentHerinnering)
export class CommentHerinneringResolver extends CommentResolver {

    @Mutation(() => CommentHerinnering)  // type graphql
    @UseMiddleware(isAuthJWT)
    async createCommentHerinnering(
        @Arg('comment') comment: string,
        @Arg('herinneringId') herinneringId: string,
        @Arg('paginaId') paginaId: string,
        @Ctx() { payload }: MyContext,

    ): Promise<CommentHerinnering> {   //TYPE TYPESCRIPT
        // 2 sql queries   

        const herr = await Herinnering.findOne(herinneringId);

        if (!herr) {
            throw new Error("Can't find herinnering")
        }

        if (herr.creatorId === payload!.userId || herr.status <= payload!.statusList[paginaId]) {

            return CommentHerinnering.create({
                comment: comment,
                creatorId: payload!.userId,
                herinneringId: herinneringId,
            }).save();

        }
        else {
            throw new Error("geen toegang")

        }

    }


}
