import DataLoader from "dataloader";
import { Message } from "../../entities/Message";


// pass [{postid:5, userId:10}, {}, {} ,{} ,{}]
// we then return {PostId:5, userId:10, value:1}

export const createMessageLoader = () => new DataLoader<string, Message>(
    async (messageIds) => {
        const messages = await  Message.findByIds(messageIds as string[]);
        const messageIdToMessage: Record<string,Message> = {};
        messages.forEach((c) => {
            messageIdToMessage[c.id] = c;
        })
        return messageIds.map((messageId) => messageIdToMessage[messageId]);
    }
);