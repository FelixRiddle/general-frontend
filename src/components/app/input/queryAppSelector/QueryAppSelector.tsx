import { Suspense } from "react";

import Search from "@/app/ui/search";
import TableAppsSkeleton from "@/app/ui/skeletons/TableAppsSkeleton";
import { AppWindowManagerType } from "@/lib/apps/index/AppWindowManager";
import AppData from "@/types/AppData";
import QueryPagination from "./QueryPagination";
import ShowApps from "../../appViews/selector/ShowApps";

/**
 * 
 */
export default function QueryAppSelector({
    appWindowManager,
    groupApps,
    clickToggleAppsSelectionCb,
    clickDeselectAppCb,
}: {
    appWindowManager: AppWindowManagerType;
    groupApps: AppData[];
    clickToggleAppsSelectionCb: (event: any, appName: string) => void;
    clickDeselectAppCb: (event: any, appName: string) => void;
}) {
    const titleClasses = "m-1 p-1 mb-4 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    
    return (
        <div>
            {/* Navbar outside the form */}
            <div>
                <label htmlFor="selectedApps" className="m-1">Select apps in the group</label>
                
                {/* Search and select an app */}
                <Search placeholder="Search apps" />
                <Suspense key={appWindowManager.queryInfo.query + appWindowManager.queryInfo.page} fallback={<TableAppsSkeleton />}>
                    {/* Show apps here */}
                    <ShowApps apps={appWindowManager.apps} selectClickCb={clickToggleAppsSelectionCb} appsGroup={groupApps}/>
                </Suspense>
                
                <QueryPagination
                    totalPages={appWindowManager.pages}
                />
                
                {/* Show selectd apps */}
                {groupApps.length > 0 && (
                    <div>
                        <h3 className={titleClasses}>Selected apps</h3>
                        <p>
                            Click an app to deselect
                        </p>
                        <ShowApps apps={groupApps} selectClickCb={clickDeselectAppCb} appsGroup={groupApps} />
                    </div>
                )}
            </div>
        </div>
    );
}
