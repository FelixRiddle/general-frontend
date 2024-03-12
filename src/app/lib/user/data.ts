// Get user data endpoint
'use server';

import UserData from "@/types/UserData";
import API from "felixriddle.good-roots-ts-api";
import { cookies } from "next/headers";

/**
 * Get user data
 */
export default async function userDataRoute(): Promise<UserData | undefined> {
    try {
        const api = new API.ExpressAuthentication();
        
        const cookieStore = cookies();
        const userCookie = cookieStore.get("_token");
        
        if(!userCookie) {
            return undefined;
        }
        
        const token = userCookie.value;
        
        const authApi = await api.userApi(token);
        
        return authApi.userData;
    } catch(err) {
        console.error(err);
        return undefined;
    }
}
