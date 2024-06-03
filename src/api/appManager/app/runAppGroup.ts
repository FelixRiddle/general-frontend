"use server";

import AppData from "@/types/AppData";
import runApp from "./run";
import { RunAppInfo } from "@/components/app/appViews/app-view-v1/actions/appScripts/AppAction";

/**
 * Run a group of apps
 * 
 * @param apps 
 */
export async function runAppGroup(apps: AppData[], scriptName: string) {
    try {
        for(let app of apps) {
            const appInfo: RunAppInfo = {
                name: app.packageJson.name,
                command: app.packageJson.scripts[scriptName],
                path: app.path,
                scriptName: scriptName
            };
            
            const response = await runApp(appInfo);
            
            console.log(`\nRun app: ${appInfo.name}`);
            console.log(`Response: `, response);
        }
    } catch(err) {
        console.error(err);
    }
}
