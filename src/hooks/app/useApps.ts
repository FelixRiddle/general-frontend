"use client";

import AppData from "@/types/AppData";
import { useEffect, useState } from "react";
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
 * Sort alphabetically
 */
export function sortAlphabetically(apps: AppData[]) {
    return apps.sort((a, b) => {
        return a.packageJson.name.localeCompare(b.packageJson.name);
    });
}

/**
 * Append message to app and re-create the app state
 */
export function appendMessage(apps: AppData[], name: string, message: string) {
    // Get previous app output
    const appData = findApp(apps, name);
    if(!appData) {
        console.log(`Couldn't find the app to add output to: `, name);
        throw new Error("Couldn't find the app " + name);
    }
    
    appData.out += message;
    // console.log(`App data + out: `, appData);
    
    // This doesn't update the view for some reason
    // // Insert output message
    // const newAppData = {
    //     ...appData,
    //     out: appData.out + message,
    // };
    
    // Insert the updated app into the array
    const updatedState = [
        appData,
       ...apps.filter(app => app.packageJson.name !== name),
    ];
    
    // Result from createAppsState
    const result = createAppsState(updatedState);
    return result;
}

/**
 * Create apps state
 */
export function createAppsState(apps: AppData[]) {
    const operationName = "[Transform array]";
    
    // console.log(`${operationName} Sort alphabetically`);
    
    // Sort alphabetically
    const sortedApps = sortAlphabetically(apps);
    
    // If output is undefined, insert a string to it
    const updatedApps = sortedApps.filter((app) => {
        if(typeof(app.out) === "undefined") {
            app.out = "";
        }
        return app;
    });
    
    // console.log(`${operationName} Set apps with output first`);
    // Apps with output are first in the list
    const appsOutput = updatedApps.filter((app) => {
        return app && app.out && app.out.length > 0;
    });
    
    // Apps without output are last in the list
    const appsNoOutput = updatedApps.filter((app) => {
        // app.out is either 'undefined' or empty string
        return !app.out;
    });
    
    // console.log(`Apps with output: `, appsOutput);
    
    const outputFirst = [...appsOutput,...appsNoOutput];
    
    // console.log(`Result: `, outputFirst);
    
    return outputFirst;
}

// /**
//  * Use apps
//  * 
//  * TODO: Big time trouble on whether using useEffect or not with the sockets, I have to do multiple implementations and check which one fits better.
//  */
// export default function useApps(apps: AppData[], socket: Socket) {
//     const debug = false;
    
//     // Fix app.out and sort alphabetically
//     const [filteredApps, setFilteredApps] = useState<AppData[]>(createAppsState(apps));
    
//     // useEffect(() => {
//     // On app start
//     socket.on('app start', (appName: string) => {
//         console.log(`App ${appName} started`);
//     });
    
//     // On app error / start error
//     socket.on('app error', (err) => {
//         console.error(`App start error: `, err);
//     });
    
//     // Stdout
//     socket.on('out', (out) => {
//         // Update app output
//         const name = out.app.name;
        
//         setFilteredApps((apps) => appendMessage(apps, name, out.message));
//     });
    
//     // Stderr
//     socket.on('err', (err) => {
//         // Update app output
//         const name = err.app.name;
        
//         setFilteredApps((apps) => appendMessage(apps, name, err.message));
//     });
//     // }, []);
    
//     return {
//         apps: filteredApps,
//     };
// }
