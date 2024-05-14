import AppWindowManager from "@/lib/apps/index/AppWindowManager";
import { getAppsData } from "@/api/appManager/app";
import Apps from "@/lib/apps/Apps";
import appManagerSocket from "@/lib/connection/appManagerSocket";
import ClientAppV2 from "./ClientAppV2";

/**
 * App manager
 */
export default async function App({
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
    const appsManager = new Apps(appsData, appManagerSocket());
    appsManager.defaultAppsView();
    const appsView = appsManager.getAppsView();
    
    const runAnyApp = (appInfo: any) => {
        // appsManager.runApp(appInfo);
    }
    
    // Run app server action
    async function runApp(appInfo: any) {
        "use server";
        
        console.log(`Update app info: `, appInfo);
        
        // You can't run functions that don't have "use server"
        // runAnyApp(appInfo);
    }
    
    return(
        <div>
            <ClientAppV2
                apps={appsView}
                appWindowManager={appWindowManager.toType()}
                runApp={runApp}
            ></ClientAppV2>
        </div>
    );
}
