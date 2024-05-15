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
    
    const appsData = await getAppsData();
    
    return(
        <div>
            <ClientAppV2
                apps={appsData}
                appWindowManager={appWindowManager.toType()}
                
            ></ClientAppV2>
        </div>
    );
}
