// Get user data endpoint
'use server';

import { ExpressAuthentication, MyPropertiesPageResultType } from "felixriddle.good-roots-ts-api";

import { cookies } from "next/headers";

/**
 * Get user data
 */
export default async function adminRangedFetch(pageNumber: number = 1): Promise<MyPropertiesPageResultType | undefined> {
    try {
        const api = new ExpressAuthentication();
        
        const cookieStore = cookies();
        const userCookie = cookieStore.get("_token");
        
        if(!userCookie) {
            console.log(`No user cookie found!`);
            return undefined;
        }
        
        const token = userCookie.value;
        
        const userApi = await api.userApi(token);
        const propertyApi = userApi.propertyApi();
        const result = await propertyApi.userProperties(pageNumber);
        
        return result;
    } catch(err) {
        console.error(err);
        return undefined;
    }
}
