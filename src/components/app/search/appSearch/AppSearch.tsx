import { Suspense } from "react";

import Search from "@/app/ui/search";
import TableAppsSkeleton from "@/app/ui/skeletons/TableAppsSkeleton";
import { AppWindowManagerType } from "@/lib/apps/index/AppWindowManager";
import Pagination from "./Pagination";
import SimpleAppView from "../../appViews/app-view-v1/SimpleAppView";

/**
 * TODO: This
 */
export default function AppSearch({
    appWindowManager,
}: {
    appWindowManager: AppWindowManagerType;
}) {
    const selectClickCb = (event: any, appName: string) => {
        
    }
    
    return (
        <div>
            {/* Navbar outside the form */}
            <div>
                {/* Search and select an app */}
                <Search placeholder="Search apps" />
                <Suspense
                    key={appWindowManager.queryInfo.query + appWindowManager.queryInfo.page}
                    fallback={<TableAppsSkeleton />}
                >
                    {/* Show apps here */}
                    {/* <SimpleAppView
                        apps={appWindowManager.apps}
                    /> */}
                </Suspense>
                
                <Pagination
                    totalPages={appWindowManager.pages}
                />
            </div>
        </div>
    );
}
