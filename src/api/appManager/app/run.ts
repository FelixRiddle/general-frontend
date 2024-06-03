"use server";

import { RunAppInfo } from "@/components/app/appViews/app-view-v1/actions/appScripts/AppAction";
import { Status } from "felixriddle.good-roots-ts-api";

interface RunResponse {
    messages: Array<Status>;
}

/**
 * Run app
 */
export default async function runApp(appInfo: RunAppInfo) {
    try {
        console.log(`Run app info: `, appInfo);
        const response = await fetch("http://localhost:24000/app/run", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appInfo),
            cache: 'no-store'
        });
        
        const data: RunResponse = await response.json();
        
        return data;
    } catch(err) {
        console.error(err);
    }
}
