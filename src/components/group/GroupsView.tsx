"use client";

import { AppGroup } from "@/api/appManager/group/group";
import Group from "./Group";

/**
 * App group
 */
export default function GroupsView({
    groups
}: {
    groups: AppGroup[]
}) {
    return (
        <div className="mt-4">
            {groups.map(group => {
                return (
                    <Group
                        group={group}
                        key={group.id}
                    />
                );
            })}
        </div>
    );
}
