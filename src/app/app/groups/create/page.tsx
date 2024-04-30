import { getApps } from "@/api/appManager/apps";
import { fetchAppsData } from "@/api/appManager/repositories";
import appsInPaginationWindow from "@/lib/app/appsWindow";
import { itemsWindow, totalPages } from "@/lib/pagination";
import AppCustomNavbar from "../../AppCustomNavbar";
import SimpleCreateGroupForm from "./SimpleCreateGroupForm";

/**
 * Create group
 */
export default async function CreateGroupPage({
    searchParams,
}: {
    searchParams: {
        query?: string;
        page?: string;
    }
}) {
    
    const apps = await getApps()
        .then((res) => {
            return res?.apps;
        })
        .catch((err) => {
            console.error(err);
        });
    
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    
    // Items window
    const itemsWindowInfo = itemsWindow(apps.length, currentPage);
    
    // Fetch apps
    const pages = totalPages(apps.length);
    
    console.log(`Items window info: `, itemsWindowInfo);
    
    const lastWindowInfo = itemsWindow(apps.length, 7);
    console.log(`Last window info: `, lastWindowInfo);
    
    const windowAppsName = appsInPaginationWindow(apps, itemsWindowInfo);
    console.log(`Window apps: `, windowAppsName);
    
    const windowAppsInfo = await fetchAppsData(windowAppsName);
    
    return (
        <div>
            <AppCustomNavbar />
            
            <h1>App groups</h1>
            <p>
                Apps can be grouped together to manage them together.
            </p>
            
            {/* No joke, it's really hard to program this thing */}
            
            {/* Simple create group form */}
            {/* Different from create group form, the pagination and app information is fetch on the backend */}
            <SimpleCreateGroupForm apps={windowAppsInfo} searchParams={searchParams} pages={pages} />
        </div>
    );
}
