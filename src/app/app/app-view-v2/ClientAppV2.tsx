'use client';

import { io } from "socket.io-client";

import AppData from "@/types/AppData";
import { AppWindowManagerType } from "@/lib/apps/index/AppWindowManager";
import ShowAppsV2 from "@/components/app/appViews/multi-apps-view-v2/ShowApps";
import AppCustomNavbar from "../AppCustomNavbar";
import useAppsV2 from "@/hooks/app/useAppsV2";

const socket = io(`http://localhost:${24000}`);

/**
 * App but client side
 */
export default function ClientAppV2({
    apps: appData,
    appWindowManager,
}: {
    apps: AppData[];
    appWindowManager: AppWindowManagerType;
}) {
    const {
        apps
    } = useAppsV2(appData, socket);
    
    const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    const linkClasses = "p-1 m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline";
    const paragraphClasses = "p-1 m-1 text-gray-900";
    
    return (
        <div>
            <AppCustomNavbar />
            
            <h1 className={titleClasses}>Node app manager</h1>
            <p className={paragraphClasses}>
                Node app manager, is a dashboard to perform actions with apps, start apps, stop apps, etc.
            </p>
            <p className={paragraphClasses}>
                The command line output of the apps is also visible for each app.
            </p>
            
            <ShowAppsV2
                apps={apps}
                socket={socket}
            />
        </div>
    );
}