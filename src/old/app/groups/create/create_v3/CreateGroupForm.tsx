"use client";

import { useState } from "react"

import Button from "@/components/button/Button";
import useSelectedApps from "@/hooks/app/groups/useSelectedApps";
import { useDebouncedCallback } from "use-debounce";
import { AppWindowManagerType } from "@/lib/apps/index/AppWindowManager";
import AppSelector from "@/components/input/appSelector/AppSelector";

/**
 * Create group form
 */
export default function CreateGroupForm({
    appWindowManagerProp,
}: {
    appWindowManagerProp: AppWindowManagerType,
}) {
    
    const [appWindowManager, setAppWindowManager] = useState(appWindowManagerProp);
    const [input, setInput] = useState({});
    
    console.log(`App window manager: `, appWindowManager);
    
    // Set page of app window manager
    const setPage = (page: number) => {
        setAppWindowManager((appWindowManager: AppWindowManagerType) => {
            return {
               ...appWindowManager,
                queryInfo: {
                   ...appWindowManager.queryInfo,
                    page,
                },
            };
        });
    };
    
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
            
            {/* Select apps to be in the group */}
            <AppSelector
                appWindowManager={appWindowManager}
                groupApps={groupApps}
                clickDeselectAppCb={clickDeselectAppCb}
                clickToggleAppsSelectionCb={clickToggleAppsSelectionCb}
                setPage={setPage}
            />
        </div>
    );
}
