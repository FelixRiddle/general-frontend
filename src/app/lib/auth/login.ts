'use server';

import queryString from "query-string";
import { cookies } from "next/headers";

import API from "good-roots-ts-api/src/index";

import { data } from "@/api/auth/user/data";
import { login } from "@/api/auth/login";
import LoginInputType from "@/types/auth/LoginInputType";
import DataResultType from "@/types/auth/user/DataResultType";

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
 * A little redudant
 * 
 * @param _currentState 
 * @param formData 
 */
export async function authenticate(userData: LoginInputType) {
    try {
        const auth = new API.ExpressAuthentication();
        console.log(`Authentication api: `, auth);
        
        console.log(`Data: `, userData);
        const loginResponse = await login(userData);
        
        // Get token
        const token = getFirstCookieByName('_token', loginResponse);
        console.log(`Token: '${token}'`);
        
        // Narrow it down
        if(!(typeof token === 'string')) {
            console.log(`Token not found our couldn't be parsed`);
            return;
        }
        
        // Get cookie
        const cookieStore = cookies();
        cookieStore.set("_token", token);
        
        // Access protected endpoint
        const dataResponse = await data(token);
        
        // Get response
        const responseUserData = await dataResponse.json();
        console.log(`User data: `, responseUserData);
        
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
