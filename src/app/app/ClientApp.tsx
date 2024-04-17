'use client';

import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

import SimpleAppView from "@/components/app/simpleAppView/SimpleAppView";
import AppData from "@/types/AppData";

/**
 * App but client side
 */
export default function ClientApp({ apps }: { apps: AppData[] }) {
    
    const socket = io(`http://localhost:${24000}`);
    
    // On app start
    socket.on('app start', (appName: string) => {
        for (const app of apps) {
            if (app.name === appName) {
                app.running = true;
            }
        }
    });
    
    // On app error / start error
    socket.on('app error', (err) => {
        console.error(`App start error: `, err);
    });
    
    return (
        <div>
            {apps.map(app => {
                return (
                    <SimpleAppView key={uuidv4()} app={app} socket={socket}></SimpleAppView>
                );
            })}
        </div>
    );
}
