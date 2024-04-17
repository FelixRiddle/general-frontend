import AppData from "@/types/AppData";

export interface AppOutput {
    name: string;
    output: string;
}

/**
 * Create apps output objects
 */
export function createAppOutputs(apps: AppData[]) {
    let appOutputs: Array<AppOutput> = [];
    for (const app of apps) {
        appOutputs.push({
            name: app.packageJson.name,
            output: ""
        });
    }
    
    return appOutputs;
}

/**
 * Find app output
 */
export function findAppOutput(appOutputs: Array<AppOutput>, name: string) {
    for (const appOutput of appOutputs) {
        if (appOutput.name === name) {
            return appOutput;
        }
    }
    
    return undefined;
}
