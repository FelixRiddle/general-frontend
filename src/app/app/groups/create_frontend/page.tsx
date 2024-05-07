"use client";

import AppCustomNavbar from "../../AppCustomNavbar";
import { useEffect, useState } from "react";
import SimpleCreateGroupFormV2 from "./CreateGroupFormFrontend";
import useAppsWindow from "@/hooks/app/groups/useAppsWindow";
import AppData from "@/types/AppData";

/**
 * Create group
 */
export default async function CreateGroupPage() {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    
    // Use apps
    const {
        apps,
        pages
    } = useAppsWindow(query, page);
    console.log(`Page: `, page);
    console.log(`Apps: `, apps);
    console.log(`Pages: `, pages);
    
    return (
        <div>
            <AppCustomNavbar />
            
            <h1 className={"m-1 p-1 mb-4 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white"}>App groups</h1>
            <p>
                Apps can be grouped together to manage them together.
            </p>
            
            {/* No joke, it's really hard to program this thing */}
            
            {/* Simple create group form */}
            {/* Different from create group form, the pagination and app information is fetch on the backend */}
            <SimpleCreateGroupFormV2
                apps={apps}
                pages={pages}
                query={query}
                currentPage={page}
                setPage={setPage}
            />
        </div>
    );
}
