"use client";

import { useState } from "react"

import Button from "@/components/button/Button";
import useSelectedApps from "@/hooks/app/groups/useSelectedApps";
import { useDebouncedCallback } from "use-debounce";
import { AppWindowManagerType } from "@/lib/apps/index/AppWindowManager";
import QueryAppSelector from "@/components/input/queryAppSelector/QueryAppSelector";
import { createGroup } from "./page";

/**
 * Create group form
 */
export default async function CreateGroupForm({
    appWindowManager,
}: {
    appWindowManager: AppWindowManagerType,
}) {
    // Select apps in groups
    const {
        groupApps,
        clickToggleAppsSelectionCb,
        clickDeselectAppCb
    } = useSelectedApps({ apps: appWindowManager.apps });
    
    // const createGroupApps = createGroup.bind
    
    return (
        <div>
            <form action={(formData) => createGroup(formData, groupApps)}>
                <div>
                    <label htmlFor="name" className="m-1">Group name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="m-1 border rounded border-gray-900 p-1"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="m-1">Group description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className="m-1 border rounded border-gray-900 p-1"
                    />
                </div>
                
                {/* Select apps to be in the group */}
                <QueryAppSelector
                    appWindowManager={appWindowManager}
                    groupApps={groupApps}
                    clickDeselectAppCb={clickDeselectAppCb}
                    clickToggleAppsSelectionCb={clickToggleAppsSelectionCb}
                />
                
                {/* <Button>Create group</Button> */}
                <button type="submit">
                    Add
                </button>
            </form>
        </div>
    );
}
