import AppWindowManager from "@/lib/apps/index/AppWindowManager";
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
    await appWindowManager.update();
    
    return(
        <div>
            <ClientAppV2
                appWindowManager={appWindowManager.toType()}
            ></ClientAppV2>
        </div>
    );
}
