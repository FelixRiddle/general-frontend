'use server';

import queryString from "query-string";
import { cookies } from "next/headers";

import API from "good-roots-ts-api/src/index";
import LoginInputType from "@/types/auth/LoginInputType";

/**
 * Get the first of all cookies by a given name
 * 
 * Utility because getting a cookie involes so many turns
 * 
 * @param name 
 * @param request 
 */
function getFirstCookieByName(name: string, response: Response) {
    const headers: Headers = response.headers;
    
    // Al these turns to get a single cookie
    const headerCookies = headers.getSetCookie();
    if(headerCookies.length === 0) {
        throw Error("No cookie received");
    }
    const unparsedCookie = headerCookies[0].split(";")[0];
    const cookieParsed = queryString.parse(unparsedCookie);
    const cookie = cookieParsed[name];
    
    return cookie;
}

/**
 * Function to authenticate
 * 
 * @param formData 
 */
export async function login(userData: LoginInputType) {
    try {
        const api = new API.ExpressAuthentication();
        console.log(`App api: `, api);
        
        const authApi = api.authApi(userData);
        console.log(`Auth api: `, authApi);
        const loginResponse = await authApi.loginGetJwt();
        console.log(`Login response: `, loginResponse);
        
        if(!loginResponse) {
            throw Error("Login response, not given");
        }
        
        // Get cookie
        const cookieStore = cookies();
        const tokenKeyword = "_token";
        cookieStore.set(tokenKeyword, loginResponse.token);
        
        const token = cookieStore.get(tokenKeyword);
        console.log(`Token from Next store: `, token);
        
        
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
