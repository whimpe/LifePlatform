import { PARTNER_TYPE } from "../constants";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne,  PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";



@ObjectType()
@Entity()
export class PartnerData extends BaseEntity {

    //Dit is volgens mij niet nodig maar typeorm klaagt dusja
    @Field()  
    @PrimaryGeneratedColumn('uuid')
    id!: string;  

    @OneToOne(() => User)
    @JoinColumn()
    user: User;


    /** 
     * Type of partner we are dealing with
    */
    @Field()
    @Column({ nullable: false })
    partner_type: PARTNER_TYPE;

    @Field()
    @Column({ nullable: false })
    mobile_phone: string;

    /** 
     * Name of company
    */
    @Field()
    @Column({ nullable: false })
    name_partner: string;

    @Field()
    @Column({ nullable: false })
    vat_number: string;

    @Field()
    @Column({ nullable: false })
    street: string;

    @Field()
    @Column({ nullable: false })
    street_number: string;

    @Field()
    @Column({ nullable: false })
    city: string;

    @Field()
    @Column({ nullable: false })
    city_postcode: string;

    @Field()
    @Column({ nullable: false })
    country: string;



}