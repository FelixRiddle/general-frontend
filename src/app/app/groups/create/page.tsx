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
    // Fetch apps
    const query = searchParams?.query || "";
    
    // There's a query, get apps that match it
    const appNames = await getApps(query)
        .then((res) => {
            return res?.apps;
        })
        .catch((err) => {
            console.error(err);
        });
    
    /**
     * Fetch apps
     * 
     * @returns 
     */
    const fetchApps = async () => {
        const currentPage = Number(searchParams?.page) || 1;
        
        // Items window
        const itemsWindowInfo = itemsWindow(appNames.length, currentPage);
        console.log(`Items window info: `, itemsWindowInfo);
        
        // Fetch apps
        const windowAppsName = appsInPaginationWindow(appNames, itemsWindowInfo);
        console.log(`Window apps: `, windowAppsName);
        
        const windowAppsInfo = await fetchAppsData(windowAppsName);
        console.log(`Window apps: `, windowAppsInfo);
        
        return windowAppsInfo;
    };
    const apps = await fetchApps();
    console.log(`New apps: `, apps);
    
    // Get total pages
    const pages = totalPages(appNames.length);
    
    return (
        <div>
            <AppCustomNavbar />
            
            <h1 className={"m-1 p-1 mb-4 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white"}>App groups</h1>
            <p>
                Apps can be grouped together to manage them together.
            </p>
            
            {/* No joke, it's really hard to program this thing */}
            
            {/* Simple create group form */}
            {/* Different from create group form, the pagination and app information is fetch on the backend */}
            <SimpleCreateGroupForm
                apps={apps}
                searchParams={searchParams}
                pages={pages}
            />
        </div>
    );
}
