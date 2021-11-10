import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { MediaPersonalMessage } from "../entities/Media";
import { HerdenkingsPagina } from "./HerdenkingsPagina";
import { PersonalMessageAccess } from "./PersonalMessageAccess";

/**
 * A object to create a last message from a person to people who visit the page
 * Can only be made by administrator or owner (>=4)
 */

@ObjectType() 
@Entity()
export class PersonalMessage extends BaseEntity { 
    

  @Field()  
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  
  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  /** Optional, if the personal message is only available from a future date */
  @Field(() => String,{nullable:true})
  @Column({ type: 'date' ,nullable:true})
  dateAvailable: Date;

  @Field(() => [MediaPersonalMessage])
  @OneToMany(() => MediaPersonalMessage, media => media.persoonlijkeboodschap)
  media: MediaPersonalMessage[]; 

  @Field({nullable:true})
  @Column()
  paginaId: string;

 
  @Field(() => HerdenkingsPagina, {nullable:true})
  @ManyToOne(() => HerdenkingsPagina, pagina => pagina.persoonlijkeBerichten)
  pagina: HerdenkingsPagina;

  @Field(() => [PersonalMessageAccess],{nullable:true})
  @OneToMany(() => PersonalMessageAccess, pmaccess => pmaccess.userThatHasAccess)
  personalMessagesAccess: PersonalMessageAccess[]; 


  // @Field()
  // @Column({default: []})
  // EmailList: String[]; 


  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

}