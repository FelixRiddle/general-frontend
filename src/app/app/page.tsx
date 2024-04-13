import AppData from "@/types/AppData";
import { getApps } from "@/api/appManager/apps";
import ClientApp from "./ClientApp";
import { getAppData } from "@/api/appManager/app";

/**
 * Get apps
 * 
 * Do get all apps
 */
async function getAppsData(): Promise<AppData[]> {
    const apps = await getApps();
    if(!apps) {
        return [];
    };
    
    let appsData: Array<AppData> = [];
    for(let app of apps.apps) {
        const appPath = `${apps.path}/${app}`;
        const appData = await getAppData(appPath);
        if(appData) {
            appsData.push(appData);
        }
    }
    
    return appsData;
}

/**
 * App manager
 */
export default async function App() {
    const apps = await getAppsData();
    
    return(
        <div>
            App manager
            <ClientApp apps={apps}></ClientApp>
        </div>
    );
}
