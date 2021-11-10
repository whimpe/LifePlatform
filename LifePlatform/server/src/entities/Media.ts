import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity, ChildEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn
} from "typeorm";
import { CommentMedia } from "./Comment";
import { Condolatie } from "./Condolatie";
import { Herinnering } from "./Herinnering";
import { Message } from "./Message";
import { PersonalMessage } from "./PersonalMessage";
import { User } from "./User";


/**
 * This Object contains info about the media linked to a memory, condolance or personal_message
 * 
 */
@ObjectType()  
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Media extends BaseEntity {

  @Field()  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  datumVanMedia?: Date;

  /** Points to the url of the mediaobject on amazon s3 bucket */
  @Field()
  @Column()
  urlFile!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  objectSize: number;

  /** Height of the image, or resolution of the video 
   * TODO: Not necessary anymore!
  */
  // @Field()
  // @Column()
  // height!: number;

  /** Width of the image, or resolution of the video 
   * TODO: Not necessary anymore!
  */
  // @Field()
  // @Column()
  // width!: number;

  /** image,video or audio */
  @Field()
  @Column()
  mediaType!: string;

  @Field()
  @Column()
  creatorId: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.mediaUploads)
  creator: User;

  @Field(() => [CommentMedia])
  @OneToMany(() => CommentMedia, comment => comment.media)
  comments: CommentMedia[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

}


/**
 * Media-Object for herinnering object 
 * 
 */
@ObjectType()
@ChildEntity()
export class MediaHerinnering extends Media {

  @Field()
  @Column()
  herinneringId: string;

  @Field(() => Herinnering)
  @ManyToOne(() => Herinnering, herinnering => herinnering.media, { onDelete: 'CASCADE' })
  herinnering: Herinnering;

}

/**
 * Media-Object for condolance object 
 * 
 */
@ObjectType()
@ChildEntity()
export class MediaCondolatie extends Media {

  @Field()
  @Column()
  condolatieId: string;

  @Field(() => Condolatie)
  @ManyToOne(() => Condolatie, condo => condo.media, { onDelete: 'CASCADE' })
  condolatie: Condolatie;


}

/**
 * Media-Object for Message object 
 * 
 */
 @ObjectType()
 @ChildEntity()
 export class MediaMessage extends Media {
 
   @Field()
   @Column()
   messageId: string;
 
   @Field(() => Message)
   @ManyToOne(() => Message, message => message.media, { onDelete: 'CASCADE' })
   message: Message;
 
 
 }
 

/**
 * Media-Object for personal-message object 
 * 
 */
@ObjectType()
@ChildEntity()
export class MediaPersonalMessage extends Media {

  @Field()
  @Column()
  persoonlijkeboodschapId: string;

  @Field(() => PersonalMessage)
  @ManyToOne(() => PersonalMessage, PersonalMessage => PersonalMessage.media)
  persoonlijkeboodschap: PersonalMessage;


}