import { getAppsData } from "@/api/appManager/app";
import Client from "./Client";
import appManagerSocket from "@/lib/connection/appManagerSocket";
import Apps from "@/lib/apps/Apps";
import AppWindowManager from "@/lib/apps/index/AppWindowManager";

/**
 * 
 */
export default async function AppViewTest({
    searchParams,
}: {
    searchParams: {
        query?: string;
        page?: string;
    }
}) {
    // App window manager
    // For pagination and search
    const appWindowManager = new AppWindowManager();
    appWindowManager.setPerPage(10);
    appWindowManager.setQueryFromSearchParams(searchParams);
    await appWindowManager.updateAll();
    
    // App data
    const appsData = await getAppsData();
    const socket = appManagerSocket();
    const appsManager = new Apps(appsData, socket);
    appsManager.defaultAppsView();
    const appsView = appsManager.getAppsView();
    
    // Run app server action
    async function runApp(appInfo: any) {
        "use server";
        
        console.log(`Update app info: `, appInfo);
        // appsManager.runApp(appInfo);
    }
    
    return (
        <div>
            <Client
                apps={appsView}
                // appWindowManager={appWindowManager.toType()}
                runApp={runApp}
            />
        </div>
    );
}
