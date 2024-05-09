"use client";

import AppData from "@/types/AppData";
import { useState } from "react";
import { Socket } from "socket.io-client";

/**
 * Get apps name
 */
function getAppsName(apps: AppData[]) {
    let appsName: Array<string> = [];
    for (const app of apps) {
        appsName.push(app.packageJson.name);
    }
    
    return appsName;
}

/**
 * Find app output
 */
export function findApp(apps: AppData[], name: string) {
    for (const app of apps) {
        if (app.packageJson.name === name) {
            return app;
        }
    }
    
    return undefined;
}

/**
 * Use apps
 */
export default function useApps(apps: AppData[], socket: Socket) {
    const debug = false;
    const [filteredApps, setFilteredApps] = useState(apps.filter((app) => {
        
        // If output is undefined, insert a string to it
        if(typeof(app.out) === "undefined") {
            app.out = "";
            // console.log(`Setting app output to a string`);
        }
        
        return app;
    }));
    
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
        // console.log(`App name: `, name);
        setFilteredApps((apps) => {
            // Get previous app output
            const appData = findApp(apps, name);
            if(!appData) {
                throw new Error("Couldn't find the app " + name);
            }
            
            if(debug) {
                console.log(`--- Stdout ---`);
                console.log(`Out message: `, out.message);
            }
            
            const newAppData = {
                ...appData,
                out: appData.out + out.message,
            };
            if(debug) {
                console.log(`App data(message added): `, newAppData);
            }
            
            return [
                // Put it above to show that it has changed
                newAppData,
                ...apps.filter(app => app.packageJson.name !== name),
            ];
        });
    });
    
    // Stderr
    socket.on('err', (err) => {
        console.log(`err: `, err);
        
        // Update apps output
        const name = err.app.name;
        // console.log(`App name: `, name);
        setFilteredApps((apps) => {
            // Get previous app output
            const appData = findApp(apps, name);
            if(!appData) {
                throw new Error("Couldn't find the app " + name);
            }
            
            if(debug) {
                console.log(`--- Stderr ---`);
                console.log(`Err message: `, err.message);
            }
            
            const newAppData = {
                ...appData,
                out: appData.out + err.message,
            };
            if(debug) {
                console.log(`App data(message added): `, newAppData);
            }
            
            return [
                // Put it above to show that it has changed
                newAppData,
                ...apps.filter(app => app.packageJson.name !== name),
            ];
        });
    });
    
    return {
        apps: filteredApps,
    };
}
