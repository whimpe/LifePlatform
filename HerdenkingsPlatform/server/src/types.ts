
import { Request, Response } from 'express';
import { Redis } from "ioredis";
import { createCondolatieLoader } from "./utils/fieldresolverloaders/createCondolatieLoader";
import { createHerdenkingsPaginaLoader } from './utils/fieldresolverloaders/createHerdenkingsPaginaLoader';
import { createHerinneringLoader } from './utils/fieldresolverloaders/createHerinneringLoader';
import { createMediaLoader } from './utils/fieldresolverloaders/createMediaLoader';
import { createMessageLoader } from './utils/fieldresolverloaders/createMessageLoader';
import { createPersonalMessageLoader } from './utils/fieldresolverloaders/createPersonalMessageLoader';
import { createUserLoader } from './utils/fieldresolverloaders/createUserLoader';

interface Dictionary {
    [Key: string]: number;
  }

export type MyContext = {
    req: Request;  // define the type
    res: Response;
    redis: Redis;
    payload?: { userId: string, statusList: Dictionary };
    userLoader: ReturnType<typeof createUserLoader>    
    mediaLoader: ReturnType<typeof createMediaLoader>
    herinneringLoader: ReturnType<typeof createHerinneringLoader>
    condolatieLoader: ReturnType<typeof createCondolatieLoader>
    herdenkingsPaginaLoader: ReturnType<typeof createHerdenkingsPaginaLoader>
    personalmessageLoader: ReturnType<typeof createPersonalMessageLoader>
    messageLoader: ReturnType<typeof createMessageLoader>
    
    
};
