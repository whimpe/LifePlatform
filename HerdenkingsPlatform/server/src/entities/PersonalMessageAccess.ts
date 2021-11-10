import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { PersonalMessage } from "./PersonalMessage";
import { User } from "./User";


/**
PersonalMessageAccess manages which user can see a personalmessage

**/

@ObjectType()  
@Entity()
@Unique(["userThatHasAccessId", "personalMessageId"])
export class PersonalMessageAccess extends BaseEntity {

  @Field()  
  @PrimaryGeneratedColumn()
  id!: number;
  
  //TODO: this is redundant
  @Field()
  @Column()   
  pageId!: string;  


  @Field()
  @Column()  
  userThatHasAccessId!: string;

  @Field()
  @Column()   
  personalMessageId!: string;  
  
  @Field(() => User)
  @ManyToOne(() => User, user => user.personalMessages)
  userThatHasAccess: User;


  @Field(() => PersonalMessage)
  @ManyToOne(() => PersonalMessage, pmessage => pmessage.personalMessagesAccess)
  personalMessage: PersonalMessage;


  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  

}