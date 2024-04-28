"use client";

import { Suspense, useState } from "react"

import Button from "@/components/button/Button";
import Search from "@/app/ui/search";
import TableAppsSkeleton from "@/app/ui/skeletons/TableAppsSkeleton";
import { getApps } from "@/api/appManager/apps";
import Pagination from "./Pagination";
import { io } from "socket.io-client";
import SimpleAppView from "@/components/app/simpleAppView/SimpleAppView";
import ShowApps from "@/components/app/simpleAppView/ShowApps";

/**
 * Page length
 */
function totalPages(apps: any[], query: string, perPage: number = 5): number {
    // Of course it's math.roof
    return Math.ceil(apps.length / perPage);
}

/**
 * Create group form
 */
export default async function CreateGroupForm({
    apps,
    searchParams,
}: {
    apps: any[];
    searchParams: {
        query?: string;
        page?: string;
    }
}) {
    
    const socket = io(`http://localhost:${24000}`);
    
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    
    const [groupApps, setGroupApps] = useState([]);
    const [show, setShow] = useState(false);
    
    // Fetch apps
    const pages = totalPages(apps, query);
    console.log(`Query: `, query);
    console.log(`Current page: `, currentPage);
    console.log(`Apps: `, apps);
    console.log(`Pages: `, pages);
    
    return (
        <div>
            {/* Toggle show */}
            <Button
                onClick={() => setShow(!show)}
            >
                Create group
            </Button>
            
            {show && (
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
                            <ShowApps apps={apps} socket={socket} />
                        </Suspense>
                        
                        <Pagination totalPages={pages} />
                    </div>
                    <Button>Create group</Button>
                </form>
            ) || (
                <div>
                </div>
            )}
        </div>
    )
}
