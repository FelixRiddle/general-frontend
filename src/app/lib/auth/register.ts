'use server';

import API, { RegisterInputType } from "felixriddle.good-roots-ts-api";

/**
 * Function to authenticate
 * 
 */
export async function register(userData: RegisterInputType) {
    try {
        const api = new API.ExpressAuthentication();
        console.log(`Express authentication API: `, api);
        
        const authApi = api.authApi(userData);
        
        const registerResponse = await authApi.registerUser();
        console.log(`Register: `, registerResponse);
        
        return registerResponse;
    } catch(error: any) {
        console.error(error);
        
        if (error) {
            switch (error.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.'
            default:
                return 'Something went wrong.'
            }
        }
        
        throw error
    }
}
