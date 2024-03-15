import queryString from "query-string";

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
