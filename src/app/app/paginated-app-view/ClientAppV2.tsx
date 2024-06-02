'use client';

import AppData from "@/types/AppData";
import { AppWindowManagerType } from "@/lib/apps/index/AppWindowManager";
import useAppsV2 from "@/hooks/app/useAppsV2";
import { socket } from "@/socket";
import ShowAppsV2 from "@/components/app/appViews/app-view-v2/ShowApps";
import { Suspense, useEffect } from "react";
import Lobby from "@/components/app/input/queryAppSelector/Lobby";

/**
 * App but client side
 */
export default function ClientAppV2({
    appWindowManager,
}: {
    appWindowManager: AppWindowManagerType;
}) {
    // Use apps does two things
    // * Applies apps order, filters, etc.
    // (Althogh in this context we don't need filters)
    // (In this context filters should be applied before getting the data(in the server component), or stored in a server state)
    // * Setups sockets
    const AppsHandler = useAppsV2(appWindowManager.apps, socket);
    
    useEffect(() => {
        console.log(`Apps in current window: `, AppsHandler.apps);
    }, []);
    
    const titleClasses = "m-1 p-1 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    const linkClasses = "p-1 m-1 font-medium text-blue-600 dark:text-blue-500 hover:underline";
    const paragraphClasses = "p-1 m-1 text-gray-900";
    
    return (
        <div>
            <h1 className={titleClasses}>Node app manager</h1>
            <p className={paragraphClasses}>
                Node app manager, is a dashboard to perform actions with apps, start apps, stop apps, etc.
            </p>
            <p className={paragraphClasses}>
                The command line output of the apps is also visible for each app.
            </p>
            
            {/* This suspense is useless because the data is awaited in the backend */}
            <Suspense key={appWindowManager.queryInfo.query + appWindowManager.queryInfo.page} fallback={<Lobby />}>
                <ShowAppsV2
                    apps={AppsHandler.apps}
                    socket={socket}
                    appsHandler={AppsHandler}
                />
            </Suspense>
        </div>
    );
}
