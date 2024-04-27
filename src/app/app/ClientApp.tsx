'use client';

import { Socket, io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

import SimpleAppView from "@/components/app/simpleAppView/SimpleAppView";
import AppData from "@/types/AppData";
import CustomNavbar from "@/components/customNavbar/CustomNavbar";
import useApps from "@/hooks/app/useApps";
import AppCustomNavbar from "./AppCustomNavbar";

/**
 * App but client side
 */
export default function ClientApp({ apps: appData }: { apps: AppData[] }) {
    
    const socket = io(`http://localhost:${24000}`);
    
    const {
        apps
    } = useApps(appData, socket);
    console.log(`Apps: `, apps);
    
    return (
        <div>
            <AppCustomNavbar />
            
            <h1>Node app manager</h1>
            
            {/* Show all apps */}
            {apps.map(app => {
                return (
                    <SimpleAppView
                        key={uuidv4()}
                        app={app}
                        socket={socket}
                    ></SimpleAppView>
                );
            })}
        </div>
    );
}
