import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { MediaCondolatie } from "../entities/Media";
import { HerdenkingsPagina } from "./HerdenkingsPagina";
import { User } from "./User";


/**
Condolatie is an object that is used as a way to express sympathy and compassion
 

**/

@ObjectType()  
@Entity()
export class Condolatie extends BaseEntity {

  @Field() 
  @PrimaryGeneratedColumn('uuid')
  id!: string; 
  
  @Field()
  @Column()
  text!: string;

  @Field()
  @Column()
  creatorId: string;
 
  @Field(() => User)
  @ManyToOne(() => User, user => user.condolaties)
  creator: User;


  @Field(() => [MediaCondolatie])
  @OneToMany(() => MediaCondolatie, mediacondolatie => mediacondolatie.condolatie)
  media: MediaCondolatie[];

  @Field()
  @Column()
  paginaId: string;
 
  @Field(() => HerdenkingsPagina)
  @ManyToOne(() => HerdenkingsPagina, pagina => pagina.herinneringen)
  pagina: HerdenkingsPagina;


  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;


}