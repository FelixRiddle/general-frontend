import { AppResponse } from "@/api/appManager/app";
import AppData from "@/types/AppData";
import { APP_MANAGER_URL } from "../appManagerUrl";

/**
 * Function to authenticate
 * 
 * @param formData 
 */
export async function getAppData(appName: string): Promise<AppData | undefined> {
    try {
        const location = APP_MANAGER_URL;
        const url = `${location}/app/repository/javascript/folder?name=${appName}`;
        
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
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
 * Get app data by name
 */
export async function getAppDataByName(name: string): Promise<AppData | undefined> {
    try {
        const location = APP_MANAGER_URL;
        const url = `${location}/app/repository/javascript/name?name=${name}`;
        
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
        });
        const data: AppResponse = await res.json();
        const app = data.app;
        
        return app;
    } catch(err: any) {
        console.error(err);
        return undefined;
    }
}

/**
 * Fetch apps data
 * 
 * Fetch apps data in folder ~/Repositories/Javascript
 */
export async function fetchAppsData(apps: string[]): Promise<Array<AppData>> {
    // Get array of apps data
    let appsData: Array<AppData> = [];
    for(let appName of apps) {
        try {
            // Get app data
            const appData = await getAppData(appName);
            
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

/**
 * Fetch apps data by name
 */
export async function fetchAppsDataByName(apps: string[]): Promise<Array<AppData>> {
    // Get array of apps data
    let appsData: Array<AppData> = [];
    for(let appName of apps) {
        try {
            // Get app data
            const appData = await getAppDataByName(appName);
            
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
