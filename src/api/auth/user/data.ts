import { cookies } from "next/headers";

import SERVER_URL_MAPPINGS from "@/mappings/env/SERVER_URL_MAPPINGS";

/**
 * Fetch user data
 */
export async function data(token: string): Promise<Response> {
    // Server url
    const endpoint = "/user/data";
    const url = `${SERVER_URL_MAPPINGS.AUTHENTICATION}${endpoint}`;
    console.log(`Url: `, url);
        
    // Get token
    const cookieStore = cookies();
    const storeToken = cookieStore.get("_token");
    console.log(`Store token: `, storeToken);
    
    // Send request
    const result = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            // "Accept": "application/json"
        }
    });
    
    return result;
}
