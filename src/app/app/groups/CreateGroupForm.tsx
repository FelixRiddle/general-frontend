"use client";

import { Suspense, useState } from "react"

import navbarStyles from "@/styles/navbar.module.css";
import Button from "@/components/button/Button";
import Search from "@/app/ui/search";
import TableAppsSkeleton from "@/app/ui/skeletons/TableAppsSkeleton";

/**
 * Create group form
 */
export default function CreateGroupForm({
    searchParams,
}: {
    searchParams: {
        query?: string;
        page?: string;
    }
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    
    const [groupApps, setGroupApps] = useState([]);
    const [show, setShow] = useState(false);
    
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
                        <Search placeholder="Search apps" />
                        <Suspense key={query + currentPage} fallback={<TableAppsSkeleton />}>
                        </Suspense>
                        
                        {/* Show apps here */}
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
