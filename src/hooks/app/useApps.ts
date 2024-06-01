"use client";

import AppData from "@/types/AppData";

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
    
    const outputFirst = [...appsOutput, ...appsNoOutput];
    
    return outputFirst;
}
