import Link from "next/link";

import { getApps } from "@/api/appManager/apps";
import AppCustomNavbar from "../AppCustomNavbar";
import { itemsWindow, totalPages } from "@/lib/pagination";
import appsInPaginationWindow from "@/lib/app/appsWindow";
import { fetchAppsData } from "@/api/appManager/repositories";
import { getAppGroups } from "@/api/appManager/group/group";

// const apps = await getApps()
//     .then((res) => {
//         return res?.apps;
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// const query = searchParams?.query || "";
// const currentPage = Number(searchParams?.page) || 1;

// // Items window
// const itemsWindowInfo = itemsWindow(apps.length, currentPage);

// // Fetch apps
// const pages = totalPages(apps.length);

// console.log(`Items window info: `, itemsWindowInfo);

// const lastWindowInfo = itemsWindow(apps.length, 7);
// console.log(`Last window info: `, lastWindowInfo);

// const windowAppsName = appsInPaginationWindow(apps, itemsWindowInfo);
// console.log(`Window apps: `, windowAppsName);

// const windowAppsInfo = await fetchAppsData(windowAppsName);

/**
 * App groups page
 */
export default async function GroupsPage({
    searchParams,
}: {
    searchParams: {
        query?: string;
        page?: string;
        perPage?: string;
    }
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const perPage = Number(searchParams?.perPage) || 10;
    
    // Fetch app groups
    const appGroups = await getAppGroups(query, currentPage, perPage);
    console.log(`App groups: `, appGroups);
    
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

