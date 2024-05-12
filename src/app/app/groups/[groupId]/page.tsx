"use server";

import { getAppsDataInGroup } from "@/api/appManager/group/apps";
import { getAppGroup } from "@/api/appManager/group/id";
import Group from "@/components/group/deep/Group";
import { redirect } from "next/navigation";

/**
 * Group page
 * 
 * @param param0 
 * @returns 
 */
export default async function GroupPage({
    params: {
        groupId,
    }
}: {
    params: {
        groupId: number,
    }
}) {
    const group = await getAppGroup(groupId);
    console.log(`Group: `, group);
    
    if(!group) {
        // return window.location.href = "/404";
        return redirect("/404");
    }
    
    const apps = await getAppsDataInGroup(groupId);
    console.log(`<GroupView />`);
    console.log(`Apps: `, apps);
    
    return (
        <div>
            <Group
                group={group}
                apps={apps}
            />
        </div>
    );
}
