import { lowerCase, lowerFirst } from "lodash";
import { ACCOUNT_STATUS, PARTNER_TYPE } from "../constants";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AccessRequest } from "./AccessRequest";
import { Comment } from "./Comment";
import { Condolatie } from "./Condolatie";
import { HerdenkingsPagina } from "./HerdenkingsPagina";
import { Herinnering } from "./Herinnering";
import { Media } from "./Media";
import { Message } from "./Message";
import { PersonalMessageAccess } from "./PersonalMessageAccess";

/**
 * User object who will be responsiblke for all the actions
 */
@ObjectType()  
@Entity()
export class User extends BaseEntity {

  @Field()  
  @PrimaryGeneratedColumn('uuid')
  id!: string;  

 
  //force email to lowercase in registration and login mutation 
  @Field()
  @Column({type: 'text', unique: true})
  email!: string;

  /** Used for safety reason, so that if the password is changed sessions with previous password will be invalidated */
  @Field()
  @Column('int',{default:0})
  tokenVersion : number;

  @Field()
  @Column({type: 'text', unique: true, nullable: true})
  mollieCustomerId!: string;


  @Field()
  @Column({ unique: true, nullable: true})
  GoogleId?: string;

  @Field()
  @Column({ unique: true, nullable: true})
  FacebookId?: string;

  @Field()
  @Column({type: 'text', unique: false})
  username!: string;

  /** Nullable in case socials are used?
   * TODO: check if correct
  */
  @Column({type: 'text', nullable: true})   
  password?: string;


  /** Nullable in case socials are used?
   * TODO: check if correct
  */
  @Field()
  @Column({nullable: false, default:ACCOUNT_STATUS.NOT_VERIFIED})   
  account_status?: ACCOUNT_STATUS;

  
  @Field(() => Condolatie)
  @OneToMany(() => Condolatie, condolaties => condolaties.creator)
  condolaties: Condolatie[];

  @Field(() => Message)
  @OneToMany(() => Message, messages => messages.creator)
  messages: Message[];

  @Field(() => Herinnering)
  @OneToMany(() => Herinnering, herinnering => herinnering.creator)
  herinneringen: Herinnering[];

  @Field(() => Media)
  @OneToMany(() => Media, mediaUploads => mediaUploads.creator)
  mediaUploads: Media[];

  @Field(() => Comment)
  @OneToMany(() => Comment, comments => comments.creator)
  comments: Comment[];

  @Field(() => HerdenkingsPagina)
  @OneToMany(() => HerdenkingsPagina, paginas => paginas.owner)
  herdenkingsPaginaTheUserOwns: HerdenkingsPagina[];

  
  @Field(() => [AccessRequest])
  @OneToMany(() => AccessRequest, arequests => arequests.requestorId)
  accessrequests: AccessRequest[];


  @Field(() => [PersonalMessageAccess])
  @OneToMany(() => PersonalMessageAccess, pmaccess => pmaccess.userThatHasAccess)
  personalMessages: PersonalMessageAccess[]; 
  
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  

}

// @ObjectType()  
// @Entity()
// export class Partner extends User {

//   /** 
//    * Type of partner we are dealing with
//   */
//   @Field()
//   @Column({nullable: false})   
//   partner_type: PARTNER_TYPE;

//   @Field()
//   @Column({nullable: false})   
//   mobile_phone: string;

//   /** 
//    * Name of company
//   */
//   @Field()
//   @Column({nullable: false})   
//   name_partner: string;

//   @Field()
//   @Column({nullable: false})   
//   vat_number: string;

//   @Field()
//   @Column({nullable: false})   
//   street: string;

//   @Field()
//   @Column({nullable: false})   
//   street_number: string;

//   @Field()
//   @Column({nullable: false})   
//   city: string;

//   @Field()
//   @Column({nullable: false})   
//   city_postcode: string;

//   @Field()
//   @Column({nullable: false})   
//   country: string;

  
  

// }