"use client";

import { AppGroup } from "@/api/appManager/group/group";
import ShowApps from "@/components/app/appViews/app-view-v1/ShowApps";
import Button from "@/components/button/Button";
import useAppsV2 from "@/hooks/app/useAppsV2";
import { socket } from "@/socket";
import AppData from "@/types/AppData";

/**
 * App group
 */
export default function Group({
    group,
    apps
}: {
    group: AppGroup,
    apps: AppData[]
}) {
    const {
        apps: appsData
    } = useAppsV2(apps, socket);
    
    const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    
    const onclick = (event: any) => {
        
    }
    
    return (
        <div>
            <h1 className={titleClasses}>{group.name}</h1>
            <p className={"m-1 p-1"}>
                {group.description}
            </p>
            
            <Button
                onClick={onclick}
            >Run 'dev' script on every app</Button>
            {/* TODO: Show if an app has a missing dev script */}
            
            <div
                className={`rounded border-2 p-2 m-2`}
            >
                <ShowApps apps={appsData} socket={socket} />
            </div>
        </div>
    );
}
