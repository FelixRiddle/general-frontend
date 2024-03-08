import SERVER_URL_MAPPINGS from "@/mappings/env/SERVER_URL_MAPPINGS";
import LoginInputType from "@/types/auth/LoginInputType";

/**
 * Login user
 */
export async function login(userData: LoginInputType): Promise<Response> {
    if(!userData) {
        throw Error("Form data not given");
    }
    
    // Server url
    const endpoint = "/auth/login";
    const url = `${SERVER_URL_MAPPINGS.AUTHENTICATION}${endpoint}`;
    console.log(`Url: `, url);
    
    // Get data
    const body = JSON.stringify(userData);
    
    // Send request
    const result = await fetch(url, {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" }
    });
    
    return result;
}
