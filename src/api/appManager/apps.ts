'use server';

import { Status } from "felixriddle.good-roots-ts-api";
import { APP_MANAGER_URL } from "./appManagerUrl";

export interface ServerResponse {
    path: string;
    apps: any;
    messages: Array<Status>;
}

/**
 * Get apps name
 * 
 * @param formData 
 */
export async function getApps(query: string = ""): Promise<ServerResponse | undefined> {
    try {
        const url = APP_MANAGER_URL;
        const res = await fetch(`${url}/apps?query=${query}`, {
            // Don't cache this thing
            // On release, maybe this should be cached
            cache: 'no-store',
        });
        const data = await res.json();
        return data;
    } catch(error: any) {
        console.log(`[GET Apps] Error when trying to fetch data`);
        console.error(error);
        return undefined;
    }
}
