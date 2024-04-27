import AppData from "@/types/AppData";
import { getApps } from "@/api/appManager/apps";
import ClientApp from "./ClientApp";
import { getAppData } from "@/api/appManager/app";
import { io } from "socket.io-client";
import useApps from "@/hooks/app/useApps";
import Link from "next/link";
import CustomNavbar from "@/components/customNavbar/CustomNavbar";

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

/**
 * App manager
 */
export default async function App() {
    return(
        <div>
            <ClientApp apps={await getAppsData()}></ClientApp>
        </div>
    );
}
