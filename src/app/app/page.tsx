import AppWindowManager from "@/lib/apps/index/AppWindowManager";
import ClientApp from "./ClientApp";
import { getAppsData } from "@/api/appManager/app";
import Apps from "@/lib/apps/Apps";
import appManagerSocket from "@/lib/connection/appManagerSocket";

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
    
    return(
        <div>
            <ClientApp
                apps={appsData}
                appWindowManager={appWindowManager.toType()}
            ></ClientApp>
        </div>
    );
}
