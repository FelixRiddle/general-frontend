"use client";

import { Suspense, useState } from "react"

import Button from "@/components/button/Button";
import Search from "@/app/ui/search";
import TableAppsSkeleton from "@/app/ui/skeletons/TableAppsSkeleton";
import Pagination from "./Pagination";
import ShowApps from "@/components/app/selectableAppView/ShowApps";
import useSelectedApps from "@/hooks/app/groups/useSelectedApps";
import { useDebouncedCallback } from "use-debounce";
import { AppWindowManager } from "@/lib/apps/index/AppWindowManager";
import AppSelector from "@/components/input/appSelector/AppSelector";

/**
 * Create group form
 */
export default async function CreateGroupForm({
    appWindowManager,
}: {
    appWindowManager: AppWindowManager,
}) {
    const [input, setInput] = useState({});
    
    // Select apps in groups
    const {
        groupApps,
        clickToggleAppsSelectionCb,
        clickDeselectAppCb
    } = useSelectedApps({ apps: appWindowManager.apps });
    
    // Use debounced callback
    const updateFieldCb = useDebouncedCallback((event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        
        setInput((values: any) => {
            return {
                ...values,
                [name]: value,
            };
        });
    }, 500);
    
    // Create group action
    const createGroupAction = (event: any) => {
        
        console.log(`Input data: `, input);
    };
    
    const titleClasses = "m-1 p-1 mb-4 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white";
    
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
            
            <AppSelector
                appWindowManager={appWindowManager}
                groupApps={groupApps}
                clickDeselectAppCb={clickDeselectAppCb}
                clickToggleAppsSelectionCb={clickToggleAppsSelectionCb}
            />
        </div>
    );
}
