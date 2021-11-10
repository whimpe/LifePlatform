import { UsernamePasswordInput } from "src/resolvers/user";


export const validateRegister =  (options : UsernamePasswordInput) => {
    console.log('validateRegister',options);
    if (!options.email.includes('@')) {
        return [
            {
                field: "email",
                message: "Email moet een @ teken bevatten"
            },
        ];      

    }
    
    if (options.username.length <= 3) {
        return [
            {
                field: "username",
                message: "Gebruikersnaam moet groter zijn dan 3 tekens"
            },
        ];         
    }
     

    if (options.username.includes('@') ) {
        return [{
                field: "username",
                message: "Gebruikersnaam mag geen @ bevatten"
            }];
    }

    if (options.password.length <= 3) {
        return[{
                field: "password",
                message: "Wachtwoord moet meer dan 3 tekens hebben"
            }];
    }

    return null;

}