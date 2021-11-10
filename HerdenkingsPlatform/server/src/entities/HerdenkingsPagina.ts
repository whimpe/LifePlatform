
import { Field, Float, Int, ObjectType } from "type-graphql";
import { AfterLoad, BaseEntity, Column, CreateDateColumn, Entity, Generated, getConnection, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PAYMENT_PLAN, PAYMENT_STATUS,DESIGN_TYPE } from "../constants";
import { AccessRequest } from "./AccessRequest";
import { Condolatie } from "./Condolatie";
import { Herinnering } from "./Herinnering";
import { PersonalMessage } from "./PersonalMessage";
import { User } from "./User";


/**
 * HerdenkingsPagina is the main object of the platform
 * all objects are connected to a herdenkingspagina
 * 
 */

@ObjectType()
@Entity()
export class HerdenkingsPagina extends BaseEntity {

    /**
     * public_token is (part of) the url that doesn't give you acces
     */
    @Field()
    @PrimaryGeneratedColumn("uuid")     
    id!: string;

    /**
     * private_token is (part of) the url that automatically grants you access (status=2)
     */
    @Field()
    @Column({ unique: true })
    @Generated("uuid")
    private_token!: string;

    /**
     * name_of_page doesn't have to be unique as two people with the same name exists
     */
    @Field()                                   
    @Column({ type: 'text', unique: false })
    name_of_page!: string;


    /**
     * status of the paying plan, valid if the payment requirements are met,
     *  expiring if the payment is delayed and archive if the page has been archived
     */
    @Field()
    @Column({ default: PAYMENT_STATUS.Valid })
    Payment_status!: PAYMENT_STATUS;    
    
    /**
     * free , basic or premium, funeral
     * 
     * */
     @Field()
     @Column({ default: PAYMENT_PLAN.Free })
    Payment_plan!: PAYMENT_PLAN;   

    /**
     * Decides wether users can see, create condolance objects on the page
     */
    @Field()
    @Column({ default: true })
    condoleance_active!: boolean;

    
    /**
     * When control_before is true, all created memories, will initially only be visible to the the administrators of the page.
     * -> The created herinneringen objects will automatically have Herinnering.prive=true
     * TODO: condolances?
     */
    @Field()
    @Column()
    control_before!: boolean;

    /**
     * This attribute will determine who can view the page, if false only the creator will be able to view the page online.
     * If true multiple other users will be able to view and add memories
     */
    @Field()
    @Column({ default: false })             
    shareable!: boolean;                     

    /**
     * This attribute will determine if the page is accessible to the owner, it could become inaccessible if it the owner moved data to ice storage
     */
    @Field()
    @Column({ default: true })
    accessible!: boolean;         
    //TODO: misschien nbiet meer nodig aangezien status_page = archive automatisch wil zeggen dat ze er niet meer aankunnen          
    
    /**
     * The original owner/creator of the page
     */
    @Field()
    @Column()
    ownerId: string;

    @Field(() => User)
    @ManyToOne(() => User, user => user.herdenkingsPaginaTheUserOwns)
    owner: User;

    /**
     * url pointing to the profile-picture
     * 
     */
    // TODO: investigate if afterInsert will be better to add media
    @Field()           
    @Column({ nullable: true })
    mediaUrl: string;

    @Field()
    @Column({ nullable: true })
    text: string;

    /**Date of Birth */
    @Field(() => String)
    @Column({ type: 'date', nullable: true })
    DoB: Date;

    /**Date of Death (can be null)*/
    @Field(() => String, { nullable: true })  
    @Column({ type: 'date', nullable: true })
    DoD?: Date;

    /**
     * The date when the page will expire, credit on the page is counted in days
    */
    @Field(() => String)
    @Column({ type: 'date', nullable: true })
    ValidUntil: Date;

    /**
     * The COLOURSCHEME
    */
    @Field()
    @Column({nullable: false, default: DESIGN_TYPE.Golden_sun})    
    DesignType: DESIGN_TYPE;



    @Field()
    @Column({default :0})    
    number_of_memories: number;


    @Field()
    @Column({default :0})    
    number_of_messages: number;

    @Field()
    @Column({default :0})    
    number_of_personal_messages: number;

    @Field()
    @Column({default :0})
    number_of_condolances: number;

    @Field()
    @Column({default :0})    
    number_of_media: number;

    @Field()
    @Column({default :0})   
    number_of_people: number;

    @Field()
    @Column({default :0})    
    number_of_bytes: number;

    // @Field()
    // @Column({default :0})    
    // number_of_notifications: number;

    
    
    @Field(() => [Herinnering])
    @OneToMany(() => Herinnering, herr => herr.pagina)
    herinneringen: Herinnering[];

    @Field(() => [Condolatie])
    @OneToMany(() => Condolatie, condo => condo.pagina)
    condolaties: Condolatie[];



    @Field(() => [AccessRequest])
    @OneToMany(() => AccessRequest, arequests => arequests.paginaId)
    accessrequests: AccessRequest[];

    @Field(() => [PersonalMessage])
    @OneToMany(() => PersonalMessage, pmessage => pmessage.pagina)
    persoonlijkeBerichten: PersonalMessage[];





    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;



    
    @AfterLoad()
    async checkValidUntil() {
        let validUntil = new Date(this.ValidUntil);
        let validUntilInOneMonth = new Date(validUntil.setMonth(validUntil.getMonth()+1));
        let today = new Date();

        if(this.Payment_status === PAYMENT_STATUS.Expiring && validUntilInOneMonth < today){
            // TODO: delete page
        }


        if (validUntil < today && this.Payment_plan > PAYMENT_PLAN.Free){
            await getConnection()
            .createQueryBuilder()
            .update(HerdenkingsPagina)
            .set({ Payment_status : PAYMENT_STATUS.Expiring , shareable: false})
            .where("id = :id", { id: this.id })
            .execute();
              
        }


        
            
            //TODO: In dit simpele geval zullen we als basic of premium en validUntil < nu dan kan je het met niemand meer delen
            // Ofwel gaat de persoon terug naar free, betaalt ze, naar archive of ze doen niks en het wordt verwijdert
    }
   

   

    


}
