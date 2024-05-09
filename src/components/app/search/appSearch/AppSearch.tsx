import { Suspense } from "react";

import Search from "@/app/ui/search";
import TableAppsSkeleton from "@/app/ui/skeletons/TableAppsSkeleton";
import ShowApps from "@/components/app/selectableAppView/ShowApps";
import { AppWindowManagerType } from "@/lib/apps/index/AppWindowManager";
import AppData from "@/types/AppData";
import Pagination from "./Pagination";

/**
 * 
 */
export default function AppSearch({
    appWindowManager,
}: {
    appWindowManager: AppWindowManagerType;
}) {
    return (
        <div>
            {/* Navbar outside the form */}
            <div>
                {/* Search and select an app */}
                <Search placeholder="Search apps" />
                <Suspense key={appWindowManager.queryInfo.query + appWindowManager.queryInfo.page} fallback={<TableAppsSkeleton />}>
                    {/* Show apps here */}
                    <ShowApps apps={appWindowManager.apps}/>
                </Suspense>
                
                <Pagination
                    totalPages={appWindowManager.pages}
                />
            </div>
        </div>
    );
}
