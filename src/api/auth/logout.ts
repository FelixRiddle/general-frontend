'use server';

import { cookies } from "next/headers";

/**
 * Logout
 */
export default async function logout() {
    try {
        const cookieStore = cookies();
        const tokenKeyword = "_token";
        cookieStore.delete(tokenKeyword);
        
        return undefined;
    } catch(err) {
        console.error(err);
    }
}
