
//global variable where we can access the token from


export let accessToken = "";

export const setAccessToken =  (token: string) => {   
    accessToken = token;
}

export const getAccessToken = () => accessToken;


