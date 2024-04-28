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
import { itemsWindow, totalPages } from "@/lib/pagination";

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
    console.log(`Apps: `, apps);
    
    const socket = io(`http://localhost:${24000}`);
    
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    console.log(`Query: `, query);
    console.log(`Current page: `, currentPage);
    
    const [groupApps, setGroupApps] = useState([]);
    const [show, setShow] = useState(false);
    
    // Fetch apps
    const pages = totalPages(apps.length);
    console.log(`Pages: `, pages);
    
    const itemsWindowInfo = itemsWindow(apps.length, currentPage);
    console.log(`Items window info: `, itemsWindowInfo);
    
    const lastWindowInfo = itemsWindow(apps.length, 7);
    console.log(`Last window info: `, lastWindowInfo);
    
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
