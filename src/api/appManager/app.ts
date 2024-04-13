'use server';

import AppData from "@/types/AppData";
import { Status } from "felixriddle.good-roots-ts-api";

export interface AppResponse {
    app: AppData;
    messages: Array<Status>;
}

/**
 * Function to authenticate
 * 
 * @param formData 
 */
export async function getAppData(appPath: string): Promise<AppData | undefined> {
    try {
        console.log(`Seding request with path: `, appPath);
        const res = await fetch('http://localhost:24000/app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                path: appPath,
            })
        });
        const data: AppResponse = await res.json();
        
        return data.app;
    } catch(error: any) {
        console.log(`[GET App] Error when trying to fetch data`);
        console.error(error);
        return undefined;
    }
}
