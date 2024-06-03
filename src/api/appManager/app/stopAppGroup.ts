"use server";

import AppData from "@/types/AppData";
import { stopAppByName } from "../process/stopProcess";

/**
 * Run a group of apps
 * 
 * @param apps 
 */
export async function stopAppGroup(apps: AppData[]) {
    try {
        for(let app of apps) {
            const name = app.packageJson.name;
            
            const response = await stopAppByName(name);
        }
    } catch(err) {
        console.error(err);
    }
}
