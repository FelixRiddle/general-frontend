'use server';

import { cookies } from "next/headers";

import API from "felixriddle.good-roots-ts-api";
import LoginInputType from "@/types/auth/LoginInputType";

/**
 * Function to authenticate
 * 
 * @param formData 
 */
export async function login(userData: LoginInputType) {
    try {
        
        const api = new API.ExpressAuthentication();
        
        const authApi = api.authApi();
        const loginResponse = await authApi.loginGetJwt(userData);
        
        if(!loginResponse) {
            throw Error("Login response, not given");
        }
        
        // Get cookie
        if(!loginResponse.token) {
            console.log(`Couldn't log in`);
            return loginResponse;
        }
        
        const cookieStore = cookies();
        const tokenKeyword = "_token";
        cookieStore.set(tokenKeyword, loginResponse.token);
        
        // const token = cookieStore.get(tokenKeyword);
        // console.log(`Token from Next store: `, token);
    } catch(error: any) {
        console.log(`Error when trying to log in`);
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
