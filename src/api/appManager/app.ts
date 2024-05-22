'use server';

import AppData from "@/types/AppData";
import { Status } from "felixriddle.good-roots-ts-api";
import { getApps } from "./apps";
import { APP_MANAGER_URL } from "./appManagerUrl";

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
        const res = await fetch(`${APP_MANAGER_URL}/app`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                path: appPath,
            }),
            cache: 'no-store',
        });
        const data: AppResponse = await res.json();
        const app = data.app;
        
        return app;
    } catch(error: any) {
        console.log(`[GET App] Error when trying to fetch data`);
        console.error(error);
        return undefined;
    }
}

/**
 * Get apps
 * 
 * Do get all apps
 */
export async function getAppsData(): Promise<AppData[]> {
    const apps = await getApps();
    if(!apps) {
        return [];
    };
    
    // Get array of apps data
    let appsData: Array<AppData> = [];
    for(let app of apps.apps) {
        // App path
        const appPath = `${apps.path}/${app}`;
        
        try {
            // Get app data
            const appData = await getAppData(appPath);
            
            if(appData) {
                appsData.push(appData);
            }
        } catch(err) {
            // Ignore errors
            continue;
        }
    }
    
    return appsData;
}

