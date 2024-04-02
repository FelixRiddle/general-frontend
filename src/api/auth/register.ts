'use server';

import RegisterResultType from "@/types/auth/RegisterResultType";
import { ExpressAuthentication, RegisterInputType } from "felixriddle.good-roots-ts-api";

/**
 * Function to authenticate
 * 
 */
export async function register(userData: RegisterInputType): Promise<RegisterResultType> {
    try {
        const api = new ExpressAuthentication();
        
        const authApi = api.authApi();
        
        const registerResponse = await authApi.registerUser(userData);
        
        return registerResponse;
    } catch(error: any) {
        console.error(error);
        
        throw error
    }
}
