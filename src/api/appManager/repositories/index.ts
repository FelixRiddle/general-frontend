import { AppResponse } from "@/api/appManager/app";
import AppData from "@/types/AppData";

/**
 * Function to authenticate
 * 
 * @param formData 
 */
export async function getAppData(appName: string): Promise<AppData | undefined> {
    try {
        const location = "http://localhost:24000";
        const url = `${location}/app/repository/javascript?name=${appName}`;
        console.log(`[GET] ${url}`);
        
        const res = await fetch(url, {
            method: 'GET'
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
