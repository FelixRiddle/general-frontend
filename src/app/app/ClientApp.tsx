'use client';

import { io } from "socket.io-client";

import AppData from "@/types/AppData";
import useApps from "@/hooks/app/useApps";
import AppCustomNavbar from "./AppCustomNavbar";
import ShowApps from "@/components/app/simpleAppView/ShowApps";
import { AppWindowManagerType } from "@/lib/apps/index/AppWindowManager";
import AppSearch from "@/components/app/search/appSearch/AppSearch";

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
    
    return (
        <div>
            <AppCustomNavbar />
            
            <h1>Node app manager</h1>
            
            {/* <ShowApps apps={apps} socket={socket} /> */}
            
            {/* App search and pagination */}
            <AppSearch
                appWindowManager={appWindowManager}
            />
        </div>
    );
}
