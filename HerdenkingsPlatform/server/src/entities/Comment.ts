import { Field, ObjectType } from "type-graphql";
import { BaseEntity, ChildEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";
import { Herinnering } from "./Herinnering";
import { Media } from "./Media";
import { Message } from "./Message";
import { User } from "./User";

/**
Comment is a comment left behind on either a herinnering or a media
TODO: extend to personalmessages

**/

@ObjectType()
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Comment extends BaseEntity {


  @Field() 
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  comment!: string;

  @Field()
  @Column()
  creatorId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.comments) 
  creator!: User;


  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;


  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;



}

@ObjectType()
@ChildEntity()
export class CommentHerinnering extends Comment {

  @Field()
  @Column()
  herinneringId: string;

  @Field(() => Herinnering)
  @ManyToOne(() => Herinnering, herinnering => herinnering.comments, { onDelete: 'CASCADE' })
  herinnering: Herinnering;

}

@ObjectType()
@ChildEntity()
export class CommentMedia extends Comment {

  @Field()
  @Column()
  mediaId: string;

  @Field(() => Media)
  @ManyToOne(() => Media, media => media.comments)
  media: Media;

}

@ObjectType()
@ChildEntity()
export class CommentMessage extends Comment {

  @Field()
  @Column()
  messageId: string;

  @Field(() => Message)
  @ManyToOne(() => Message, mess => mess.comments)
  message: Message;

}