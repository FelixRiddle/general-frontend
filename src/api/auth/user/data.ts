import SERVER_URL_MAPPINGS from "@/mappings/env/SERVER_URL_MAPPINGS";

/**
 * Fetch user data
 */
export async function data(): Promise<Response> {
    // Server url
    const endpoint = "/user/data";
    const url = `${SERVER_URL_MAPPINGS.AUTHENTICATION}${endpoint}`;
    console.log(`Url: `, url);
    
    // Send request
    const result = await fetch(url, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    
    return result;
}
