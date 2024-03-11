// Get user data endpoint
'use server';

import UserData from "@/types/UserData";
import ExpressAuthentication from "good-roots-ts-api/src/api/auth/ExpressAuthentication";
import { cookies } from "next/headers";

/**
 * Get user data
 */
export default async function userDataRoute(): Promise<UserData | undefined> {
    try {
        const api = new ExpressAuthentication();
        
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
