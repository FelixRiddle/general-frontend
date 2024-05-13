import Link from "next/link";

import AppCustomNavbar from "../AppCustomNavbar";
import { getAppGroups } from "@/api/appManager/group/group";
import GroupsView from "@/components/group/shallow/GroupsView";

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
    // Search params are used for pagination and search
    // For showing a single group of apps use dynamic routes
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const perPage = Number(searchParams?.perPage) || 10;
    
    // Fetch app groups
    const appGroups = await getAppGroups(query, currentPage, perPage);
    
    const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    
    return (
        <div>
            <AppCustomNavbar />
            
            <h1 className={titleClasses}>App groups</h1>
            <p className="m-1 p-1">
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
            
            {/* Groups view */}
            <GroupsView groups={appGroups} />
        </div>
    );
}

