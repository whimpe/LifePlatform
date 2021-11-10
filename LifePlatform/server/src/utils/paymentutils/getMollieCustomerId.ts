import { User } from "../../entities/User"

/**
 * Gets the mollie customerId from the user and if it doesn't exist creates
 * a new one and updates the user
 *  
 */
export const getMollieCustomerId = async (MollieClient: any, userId: string):Promise<String> => {


    const user = await User.findOne({
        where: {
            id: userId
        }
    })

    if (!user) {
        throw new Error("Could not find user")
    }

    let MolliecustomerId;
    if(!user.mollieCustomerId){


        const customer = await MollieClient.customers.create({
            name: user.username,
            email: user.email,
        });
        await User.update(
            { id: userId },
            { mollieCustomerId: customer.id });

            MolliecustomerId = customer.id;
    }else{
        MolliecustomerId = user.mollieCustomerId;
    }


    

    return MolliecustomerId;
}