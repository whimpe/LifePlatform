import { Categories } from "../constants";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { MediaHerinnering } from "../entities/Media";
import { CommentHerinnering } from "./Comment";
import { HerdenkingsPagina } from "./HerdenkingsPagina";
import { User } from "./User";



/**
 * This Object gather media and text into a memory
 */
@ObjectType()  
@Entity()
export class Herinnering extends BaseEntity {

  @Field()  
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  
  @Field({defaultValue:''})
  @Column()
  title?: string;

  @Field({ nullable: true,defaultValue:'' })
  @Column({nullable:true})
  text?: string;

  /**What aspect of the person' life is the memory about */
  @Field({ nullable: true })
  @Column({ nullable: true })
  categorie?: Categories;


  @Field(() => String,{ nullable: true })
  @Column({type: 'date',nullable:true})
  datumVanHerinnering?: Date;


  /** The status of the memory is a measure of the accessability, when the status is 2 everyone who is allowed on the page can view it,
   * if the status is 3 only people who are in the intimate circle (status >=3) (and the creator)
   * if the status is 4 only the administrators and co-administrators will be able to see it
   * default is 2
  */
  @Column()
  @Field({defaultValue:2})
  status: number;

  /**Wether the memory is added to the timeline-view (only administrators can toggle this) */
  @Column()
  @Field()
  on_timeline: boolean;

 
  @Field(() => [MediaHerinnering])
  @OneToMany(() => MediaHerinnering, media => media.herinnering)
  media: MediaHerinnering[];

  @Field(() => [CommentHerinnering])
  @OneToMany(() => CommentHerinnering, hcomment => hcomment.herinnering)
  comments: CommentHerinnering[];
  

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
  @ManyToOne(() => User, user => user.herinneringen)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

}