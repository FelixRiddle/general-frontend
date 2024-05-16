import AppWindowManager from "@/lib/apps/index/AppWindowManager";
import ClientApp from "./ClientApp";
import { getAppsData } from "@/api/appManager/app";

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
    // The apps are handled with 'useApps' hook on the client side
    const appsData = await getAppsData();
    // const appsManager = new Apps(appsData, appManagerSocket());
    // appsManager.defaultAppsView();
    
    return(
        <div>
            <ClientApp
                apps={appsData}
                appWindowManager={appWindowManager.toType()}
            ></ClientApp>
        </div>
    );
}
