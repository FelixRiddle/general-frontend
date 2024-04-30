import { getApps } from "@/api/appManager/apps";
import AppCustomNavbar from "../AppCustomNavbar";
import CreateGroupForm from "./create/CreateGroupForm";
import { itemsWindow, totalPages } from "@/lib/pagination";
import appsInPaginationWindow from "@/lib/app/appsWindow";
import SimpleCreateGroupForm from "./create/SimpleCreateGroupForm";
import { fetchAppsData } from "@/api/appManager/repositories";
import Link from "next/link";

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
            
            <h1 className="text-height">App groups</h1>
            <p>
                Apps can be grouped together to manage them together.
            </p>
            
            {/* Create group form */}
            <div className="mt-4">
                <Link
                    href="/app/groups/create"
                    className={`border rounded border-purple-600 bg-purple-500 active:bg-purple-400 p-2 m-2 mt-5 hover:bg-purple-400 hover:border-purple-500`}
                >
                    Create group
                </Link>
            </div>
        </div>
    );
}

