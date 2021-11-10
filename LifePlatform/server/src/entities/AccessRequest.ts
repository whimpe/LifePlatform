import { STATUS } from "../constants";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { HerdenkingsPagina } from "./HerdenkingsPagina";
import { User } from "./User";


/**
AccessRequest manages the status a user has to a page


**/

@ObjectType()  
@Entity()
@Unique(["requestorId", "paginaId"])
export class AccessRequest extends BaseEntity {

  @Field()  
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  
  @Field()
  @PrimaryColumn('uuid')   //ForeignKey()
  requestorId!: string;

  @Field()
  @PrimaryColumn('uuid')   //ForeignKey()
  paginaId!: string;


  @Field()
  @Column()   
  requesttext!: string;

  @Field()
  @Column()   
  status!: STATUS; 

  
  @Field(() => User)
  @ManyToOne(() => User, user => user.accessrequests)
  requestor: User;


  @Field(() => HerdenkingsPagina)
  @ManyToOne(() => HerdenkingsPagina, pag => pag.accessrequests)
  pagina: HerdenkingsPagina;


  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  

}