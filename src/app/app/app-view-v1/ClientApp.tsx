'use client';

import { io } from "socket.io-client";

import AppData from "@/types/AppData";
import useApps from "@/hooks/app/useApps";
import AppCustomNavbar from "../AppCustomNavbar";
import { AppWindowManagerType } from "@/lib/apps/index/AppWindowManager";
import ShowApps from "@/components/app/appViews/app-view-v1/ShowApps";

/**
 * App but client side
 */
export default function ClientApp({
    apps: appData,
    appWindowManager,
}: {
    apps: AppData[]
    appWindowManager: AppWindowManagerType,
}) {
    const socket = io(`http://localhost:${24000}`);
    
    const {
        apps
    } = useApps(appData, socket);
    
    const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    const linkClasses = "p-1 m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline";
    const paragraphClasses = "p-1 m-1 text-gray-900";
    
    console.log(`Resulting apps: `, apps);
    
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
            
            <ShowApps apps={apps} socket={socket} />
            
            {/* App search and pagination */}
            {/* <AppSearch
                appWindowManager={appWindowManager}
            /> */}
        </div>
    );
}
