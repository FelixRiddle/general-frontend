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
    
    const appWindowManager = new AppWindowManager();
    appWindowManager.setPerPage(10);
    appWindowManager.setQueryFromSearchParams(searchParams);
    await appWindowManager.updateAll();
    
    return(
        <div>
            <ClientApp
                apps={await getAppsData()}
                appWindowManager={appWindowManager.toType()}
            ></ClientApp>
        </div>
    );
}
