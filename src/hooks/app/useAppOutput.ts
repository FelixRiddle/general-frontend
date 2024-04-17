import { useState } from "react";
import { Socket } from "socket.io-client";

import { AppOutput, createAppOutputs, findAppOutput } from "@/lib/app/appOutput";
import AppData from "@/types/AppData";

/**
 * Get app by name
 */
function getAppByName(apps: AppData[], name: string) {
    for (const app of apps) {
        if (app.packageJson.name === name) {
            return app;
        }
    }
    
    return undefined;
}

/**
 * Use app output
 */
export default function useAppOutput(apps: AppData[], socket: Socket) {
    const [appsOutput, setAppsOutput] = useState(createAppOutputs(apps));
    
    // On app start
    socket.on('app start', (appName: string) => {
        console.log(`Event: app start`);
        console.log(`App ${appName} started`);
    });
    
    // On app error / start error
    socket.on('app error', (err) => {
        console.error(`App start error: `, err);
    });
    
    // Stdout
    socket.on('out', (out) => {
        console.log(`out: `, out);
        
        // Update apps output
        const name = out.app.name;
        setAppsOutput((apps) => {
            // Get previous app output
            const previousAppOutput = findAppOutput(apps, name);
            if(!previousAppOutput) {
                return apps;
            }
            
            return [
                ...apps.filter(app => app.name !== name),
                {
                    ...previousAppOutput,
                    output: previousAppOutput['output'] + out.message
                }
            ];
        });
    });
    
    // Stderr
    socket.on('err', (err) => {
        console.log(`err: `, err);
        
        // Update apps output
        const name = err.app.name;
        setAppsOutput((apps) => {
            // Get previous app output
            const previousAppOutput = findAppOutput(apps, name);
            if(!previousAppOutput) {
                return apps;
            }
            
            return [
                ...apps.filter(app => app.name !== name),
                {
                    ...previousAppOutput,
                    output: previousAppOutput['output'] + err.message
                }
            ];
        });
    });
    
    return {
        appsOutput,
        setAppsOutput,
    };
}

