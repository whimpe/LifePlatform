/**
 * Check if the current user is us, the founders of the site aeterna
 * @param userId 
 */
export const checkIfAdmin = (userId: string) => {

    //TODO: better name for function
    if (userId !== "8a72758f-46f4-4f2f-8a78-edbf4999f391") {
        throw new Error("Not the right permission")
    }

}

