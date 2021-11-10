
import { SubscriptionStatus } from "@mollie/api-client";

export const __prod__ = process.env.NODE_ENV === 'production'
export const COOKIE_NAME = "qid";
export const FORGET_PASSWORD_PREFIX = "change-password:";
export const PRIVATE_LINK = "prive-link:";
export const PUBLIC_LINK = "publieke-link:";

// Limits for free
export const MAX_AMOUNT_OF_PERSONAL_MESSAGES_FREE = 2;
export const MAX_AMOUNT_OF_MEMORIES_FREE = 10;
export const MAX_AMOUNT_OF_CONDOLANCES_FREE = Infinity;
export const MAX_AMOUNT_OF_MESSAGES_FREE = Infinity;
export const MAX_AMOUNT_OF_MEDIA_FREE = 20;
export const MAX_AMOUNT_OF_PEOPLE_FREE = 1;
export const MAX_AMOUNT_OF_BYTES_FREE =   2*1024*1024*1024;   //2 GB
export const MAX_AMOUNT_OF_BYTES_FREE_GB = 2;  

// Limits for basic
export const MAX_AMOUNT_OF_PERSONAL_MESSAGES_BASIC = 5;
export const MAX_AMOUNT_OF_MEMORIES_BASIC = 20;
export const MAX_AMOUNT_OF_CONDOLANCES_BASIC = 50;
export const MAX_AMOUNT_OF_MESSAGES_BASIC = 2;
export const MAX_AMOUNT_OF_MEDIA_BASIC = 200;
export const MAX_AMOUNT_OF_PEOPLE_BASIC = 100;
export const MAX_AMOUNT_OF_BYTES_BASIC = 20*1024*1024*1024; //20GB
export const MAX_AMOUNT_OF_BYTES_BASIC_GB = 20; //20GB




export const AMOUNT_OF_MEMORIES_PLAN: number[] = [MAX_AMOUNT_OF_MEMORIES_FREE,MAX_AMOUNT_OF_MEMORIES_BASIC,Infinity ];
export const AMOUNT_OF_PERSONAL_MESSAGES_PLAN: number[] = [MAX_AMOUNT_OF_PERSONAL_MESSAGES_FREE,MAX_AMOUNT_OF_PERSONAL_MESSAGES_BASIC,Infinity ];
export const AMOUNT_OF_MESSAGES_PLAN: number[] = [MAX_AMOUNT_OF_MESSAGES_FREE,MAX_AMOUNT_OF_MESSAGES_BASIC,Infinity ];
export const AMOUNT_OF_CONDOLANCES_PLAN: number[] = [MAX_AMOUNT_OF_CONDOLANCES_FREE,MAX_AMOUNT_OF_CONDOLANCES_BASIC,Infinity ];
export const AMOUNT_OF_MEDIA_PLAN: number[] = [MAX_AMOUNT_OF_MEDIA_FREE,MAX_AMOUNT_OF_MEDIA_BASIC,Infinity ];
export const AMOUNT_OF_PEOPLE_PLAN: number[] = [MAX_AMOUNT_OF_PEOPLE_FREE,MAX_AMOUNT_OF_PEOPLE_BASIC,Infinity ];
export const AMOUNT_OF_BYTES_PLAN: number[] = [ MAX_AMOUNT_OF_BYTES_FREE, MAX_AMOUNT_OF_BYTES_BASIC, Infinity ];




export const WHITELIST_FILE_EXTENSIONS = new Set(["png", "mp4", "jpeg","jpg","gif", "avi", "mp3", "mov","MOV","quicktime", "wmv", "mpg", "wav","m4a", "mpeg"]);
//TODO: moet er nog iets bij?

export enum STATUS {
    Denied = -1,
    None = 0,
    Pending = 1,
    Approved = 2,
    Intimate = 3,
    CoOwner = 4,
    Owner = 5,  
    Partner=6,
}

/**
 * Extra info about the user
 */
export enum ACCOUNT_STATUS {
    NOT_VERIFIED,
    VERIFIED,
    PAYING_CUSTOMER,
    VERIFIED_PARTNER
}
/**
 * Type of partner: FUNERAL_UNDERTAKER, FUNERAL_INSURANCE or DIGITALIZER
 * can be extended
 */
export enum PARTNER_TYPE{
    FUNERAL_UNDERTAKER,
    FUNERAL_INSURANCE,
    DIGITALIZER
}

export enum Categories {
    Familie = 1,
    Vrienden,
    Reizen,
    Sport,
    Jeugd,
    Werk,
    Hobby,
    Gelegenheid
}


export enum DESIGN_TYPE {
    
    Golden_sun,
    Nature,
    Soft_pink,
    Beige,
    White
}

export enum PAYMENT_STATUS {
    Expiring,
    Valid,
    Archive
}

/**
 * Free, basic, premium, funeral and forever?
 */
export enum PAYMENT_PLAN {
    Free ,
    Basic,
    Premium,
    Funeral,
    Forever
}



export enum Payment_Term {
    Recurring,
    One_Year,
    Five_Years,
    Ten_Years,
    Forever,
}


/**
 * Prices when choosing the basic package for monthly subscriptiuon, 1,5 and 10 years respe
 */
export const PAYMENT_BASIC_PLAN: number[] = [5,50,200,250];


/**
 * Prices when choosing the premium package for monthly subscriptiuon, 1,5 and 10 years respe
 */
export const PAYMENT_PREMIUM_PLAN: number[] = [5,50,400,500];

/**
 * Prices when choosing the funeral package for monthly subscriptiuon, 1,5 and 10 years respe
 * TODO: change when extra funeral features are added
 */
 export const PAYMENT_FUNERAL_PLAN: number[] = [5,50,400,500];