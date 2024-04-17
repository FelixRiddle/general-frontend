'use server';

import { Status } from "felixriddle.good-roots-ts-api";

export interface ServerResponse {
    path: string;
    apps: any;
    messages: Array<Status>;
}

/**
 * Function to authenticate
 * 
 * @param formData 
 */
export async function getApps(): Promise<ServerResponse | undefined> {
    try {
        const res = await fetch('http://localhost:24000/apps');
        const data = await res.json();
        return data;
    } catch(error: any) {
        console.log(`[GET Apps] Error when trying to fetch data`);
        console.error(error);
        return undefined;
    }
}
