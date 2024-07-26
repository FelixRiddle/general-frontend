"use client";

import { runAppGroup } from "@/api/appManager/app/runAppGroup";
import { stopAppGroup } from "@/api/appManager/app/stopAppGroup";
import { AppGroup } from "@/api/appManager/group/group";
import AppsAccordion from "@/components/app/appViews/AppsAccordion";
import useAppsV2 from "@/hooks/app/useAppsV2";
import { socket } from "@/socket";
import AppData from "@/types/AppData";
import { Button } from "@nextui-org/button";

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
    const AppsHandler = useAppsV2(apps, socket);
    
    const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    
    // Run all apps in dev mode
    const runAppsDevMode = (event: any) => {
        runAppGroup(AppsHandler.apps, "dev");
    }
    
    // Stop all apps
    const stopApps = (event: any) => {
        stopAppGroup(AppsHandler.apps);
    }
    
    return (
        <div>
            <h1 className={titleClasses}>{group.name}</h1>
            <p className={"m-1 p-1"}>
                {group.description}
            </p>
            
			{/* Run all and stop all */}
			<div>
				<Button
					color="success"
					onClick={runAppsDevMode}
				>Run all dev mode</Button>
				
				<Button
					color="danger"
					onClick={stopApps}
					style={{left: "10px"}}
				>Stop all apps</Button>
			</div>
            
            <div
                className={`m-2 pt-4`}
            >
                <AppsAccordion
                    apps={AppsHandler.apps}
                    socket={socket}
                    appsHandler={AppsHandler}
                />
            </div>
        </div>
    );
}
