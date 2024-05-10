"use server";

import { getAppsInGroup } from "@/api/appManager/group/apps";
import { AppGroup } from "@/api/appManager/group/group";
import Group from "./Group";

/**
 * App group
 */
export default async function GroupsView({
    groups
}: {
    groups: AppGroup[]
}) {
    
    return (
        <div className="mt-4">
            {groups.map(async group => {
                const apps = await getAppsInGroup(group.id);
                
                return (
                    <Group
                        group={group}
                        apps={apps}
                        key={group.id}
                    />
                );
            })}
        </div>
    );
}
