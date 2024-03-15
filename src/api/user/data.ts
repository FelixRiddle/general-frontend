// Get user data endpoint
'use server';

import API, { CompleteUserData } from "felixriddle.good-roots-ts-api";
import { cookies } from "next/headers";

/**
 * Get user data
 */
export default async function userDataRoute(): Promise<CompleteUserData | undefined> {
    try {
        const api = new API.ExpressAuthentication();
        
        const cookieStore = cookies();
        const userCookie = cookieStore.get("_token");
        
        if(!userCookie) {
            console.log(`No user cookie found!`);
            return undefined;
        }
        
        const token = userCookie.value;
        
        const userAPI = await api.userApi(token);
        const userData: CompleteUserData = await userAPI.getUserData();
        
        return userData;
    } catch(err) {
        console.error(err);
        return undefined;
    }
}
