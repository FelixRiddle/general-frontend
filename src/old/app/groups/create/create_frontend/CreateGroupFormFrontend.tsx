"use client";

import { Suspense, useState } from "react"

import Button from "@/components/button/Button";
import Search from "@/app/ui/search";
import TableAppsSkeleton from "@/app/ui/skeletons/TableAppsSkeleton";
import Pagination from "./Pagination";
import ShowApps from "@/components/app/selectableAppView/ShowApps";
import AppData from "@/types/AppData";
import useSelectedApps from "@/hooks/app/groups/useSelectedApps";

/**
 * Create group form
 */
export default function CreateGroupFormFrontend({
    apps,
    pages,
    query,
    currentPage,
    setPage,
}: {
    apps: AppData[];
    pages: number;
    query: string;
    currentPage: number;
    setPage: (page: number) => void;
}) {
    const [input, setInput] = useState({});
    
    // Select apps in groups
    const {
        groupApps,
        clickToggleAppsSelectionCb,
        clickDeselectAppCb
    } = useSelectedApps({ apps });
    
    const updateFieldCb = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setInput((values: any) => {
            return {
                ...values,
                [name]: value,
            };
        });
    };
    
    // Create group action
    const createGroupAction = (event: any) => {
        
        console.log(`Input data: `, input);
    };
    
    const titleClasses = "m-1 p-1 mb-4 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    
    return (
        <div>
            <form action="">
                <div>
                    <label htmlFor="name" className="m-1">Group name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="m-1 border rounded border-gray-900 p-1"
                        onChange={(event: any) => {
                            updateFieldCb(event);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="description" className="m-1">Group description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className="m-1 border rounded border-gray-900 p-1"
                        onChange={(event: any) => {
                            updateFieldCb(event);
                        }}
                    />
                </div>
                <Button onClick={createGroupAction}>Create group</Button>
            </form>
            
            {/* Navbar outside the form */}
            {/* Trying to fix the problem of continuous re-render */}
            <div>
                {/* This one take it lightly, because it will take a while to make it actually pleasingly functional */}
                <label htmlFor="selectedApps" className="m-1">Select apps in the group</label>
                
                {/* Search and select an app */}
                <Search placeholder="Search apps" />
                <Suspense key={query + currentPage} fallback={<TableAppsSkeleton />}>
                    {/* Show apps here */}
                    <ShowApps apps={apps} selectClickCb={clickToggleAppsSelectionCb} appsGroup={groupApps}/>
                </Suspense>
                
                <Pagination
                    totalPages={pages}
                    setPage={setPage}
                    currentPage={currentPage}
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
