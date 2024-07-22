"use client";

import { useRef } from "react";

import Button from "@/components/button/Button";
import useSelectedApps from "@/hooks/app/groups/useSelectedApps";
import { AppWindowManagerType } from "@/lib/apps/index/AppWindowManager";
import QueryAppSelector from "@/components/app/input/queryAppSelector/QueryAppSelector";
import { createGroup } from "@/api/appManager/group/create";

/**
 * Create group form
 */
export default function CreateGroupForm({
    appWindowManager,
}: {
    appWindowManager: AppWindowManagerType,
}) {
    const formRef = useRef(null);
    
    // Select apps in groups
    const {
        groupApps,
        clickToggleAppsSelectionCb,
        clickDeselectAppCb
    } = useSelectedApps({ apps: appWindowManager.apps });
	
	/**
	 * Create group
	 */
	async function handleCreateGroup(e: any) {
		if(!formRef || !formRef.current) {
			return;
		}
		
		const formData = new FormData(formRef.current);
		const response = await createGroup(formData, groupApps);
	}
    
    return (
        <div>
            <form
                ref={formRef}
                id="createAppGroupForm"
            >
                <div>
                    <label htmlFor="name" className="m-1">Group name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="m-1 border rounded border-gray-900 p-1"
						// required={true}
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
                
                <Button
					type={"submit"}
					onClick={handleCreateGroup}
				>Create group</Button>
            </form>
        </div>
    );
}
