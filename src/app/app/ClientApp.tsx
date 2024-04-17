'use client';

import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

import SimpleAppView from "@/components/app/simpleAppView/SimpleAppView";
import AppData from "@/types/AppData";
import useAppOutput from "@/hooks/app/useAppOutput";
import { findAppOutput } from "@/lib/app/appOutput";

/**
 * App but client side
 */
export default function ClientApp({ apps }: { apps: AppData[] }) {
    
    const socket = io(`http://localhost:${24000}`);
    
    const {
        appsOutput,
    } = useAppOutput(apps, socket);
    
    return (
        <div>
            {apps.map(app => {
                // Get app output or crash
                const appOutput = findAppOutput(appsOutput, app.packageJson.name);
                if(!appOutput) {
                    throw Error("Something went wrong, no app output found for " + app.packageJson.name);
                }
                
                return (
                    <SimpleAppView
                        key={uuidv4()}
                        app={app}
                        socket={socket}
                        appOutput={appOutput}
                    ></SimpleAppView>
                );
            })}
        </div>
    );
}
