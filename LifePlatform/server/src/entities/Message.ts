import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { MediaMessage } from "../entities/Media";
import { CommentMessage } from "./Comment";
import { HerdenkingsPagina } from "./HerdenkingsPagina";
import { User } from "./User";



/**
 * This Object is inteded to represent quick messages
 */
@ObjectType()  
@Entity()
export class Message extends BaseEntity {

  @Field()  
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  
 
  @Field({ nullable: true })
  @Column({nullable:true})
  text?: string;



  /** The status of the message is a measure of the accessability, when the status is 2 everyone who is allowed on the page can view it,
   * if the status is 3 only people who are in the intimate circle (status >=3) (and the creator)
   * if the status is 4 only the administrators and co-administrators will be able 
   * to see it if it is 5 only you are able to see it
   * default is 2
  */
  @Column()
  @Field({defaultValue:2})
  status: number;

 
  @Field(() => [MediaMessage])
  @OneToMany(() => MediaMessage, media => media.message)
  media: MediaMessage[];

  @Field(() => [CommentMessage])
  @OneToMany(() => CommentMessage, mcomment => mcomment.message)
  comments: CommentMessage[];
  

  @Field()
  @Column()
  paginaId: string;
 
  @Field(() => HerdenkingsPagina)
  @ManyToOne(() => HerdenkingsPagina, pagina => pagina.herinneringen)
  pagina: HerdenkingsPagina;


  
  @Field()
  @Column()
  creatorId: string;
 
  @Field(() => User)
  @ManyToOne(() => User, user => user.messages)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

}