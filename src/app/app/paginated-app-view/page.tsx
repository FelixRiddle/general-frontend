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
    
    // Data here is correctly shown but it's not updated on the frontend
	// const appsInWindow = appWindowManager.apps.map((app) => app.packageJson && app.packageJson.name);
    // console.log(`Apps in window: `, appsInWindow);
    
    return(
        <div>
            <ClientAppV2
                appWindowManager={appWindowManager.toType()}
            ></ClientAppV2>
        </div>
    );
}
