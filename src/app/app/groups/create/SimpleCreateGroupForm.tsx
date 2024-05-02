"use client";

import { Suspense } from "react"

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
export default async function SimpleCreateGroupForm({
    apps,
    pages,
    searchParams,
}: {
    apps: AppData[];
    pages: number;
    searchParams: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    
    // Select apps in groups
    const {
        groupApps,
        selectClickCb
    } = useSelectedApps({ apps });
    
    return (
        <div>
            <form action="">
                <div>
                    <label htmlFor="groupName" className="m-1">Group name</label>
                    <input type="text" id="groupName" name="groupName" className="m-1 border rounded border-gray-900 p-1"/>
                </div>
                <div>
                    <label htmlFor="groupDescription" className="m-1">Group description</label>
                    <input type="text" id="groupDescription" name="groupDescription" className="m-1 border rounded border-gray-900 p-1" />
                </div>
                <div>
                    {/* This one take it lightly, because it will take a while to make it actually pleasingly functional */}
                    <label htmlFor="selectedApps" className="m-1">Select apps in the group</label>
                    <input type="text" className="m-1 border rounded border-gray-900 p-1" />
                    
                    {/* Search and select an app */}
                    <Search placeholder="Search apps" />
                    <Suspense key={query + currentPage} fallback={<TableAppsSkeleton />}>
                        {/* Show apps here */}
                        <ShowApps apps={apps} selectClickCb={selectClickCb} appsGroup={groupApps}/>
                    </Suspense>
                    
                    <Pagination totalPages={pages} />
                </div>
                <Button>Create group</Button>
            </form>
        </div>
    );
}
