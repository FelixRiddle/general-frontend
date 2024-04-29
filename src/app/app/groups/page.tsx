import { getApps } from "@/api/appManager/apps";
import AppCustomNavbar from "../AppCustomNavbar";
import CreateGroupForm from "./CreateGroupForm";
import { itemsWindow, totalPages } from "@/lib/pagination";
import appsInPaginationWindow from "@/lib/app/appsWindow";
import SimpleCreateGroupForm from "./SimpleCreateGroupForm";
import { fetchAppsData } from "@/api/appManager/repositories";

/**
 * App groups page
 */
export default async function GroupsPage({
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
            {/* <CreateGroupForm apps={apps || []} searchParams={searchParams} /> */}
            
            {/* Simple create group form */}
            {/* Different from create group form, the pagination and app information is fetch on the backend */}
            <SimpleCreateGroupForm apps={windowAppsInfo} searchParams={searchParams} />
        </div>
    );
}

