import DataLoader from "dataloader";
import { User } from "../../entities/User";


// keys are userIds [1,5,12]

// return are the user objects
// [ {id:1, username: ben}, {}, {}]

export const createUserLoader = () => new DataLoader<string, User>(
    async (userIds) => {
        const users = await  User.findByIds(userIds as string[]);
        const userIdToUser: Record<string,User> = {};
        users.forEach((u) => {
            userIdToUser[u.id] = u;
        })
        return userIds.map((userId) => userIdToUser[userId]);
    }
);
