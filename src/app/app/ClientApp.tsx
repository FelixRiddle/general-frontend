'use client';

import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

import SimpleAppView from "@/components/app/simpleAppView/SimpleAppView";
import AppData from "@/types/AppData";
import useApps from "@/hooks/app/useApps";

/**
 * App but client side
 */
export default function ClientApp({ apps: rawApps }: { apps: AppData[] }) {
    const socket = io(`http://localhost:${24000}`);
    
    const {
        apps
    } = useApps(rawApps, socket);
    
    return (
        <div>
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
