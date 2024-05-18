"use server";

import { Process } from "@/components/process/ProcessView";
import { Status } from "felixriddle.good-roots-ts-api";

export interface StopProcessResponse {
    messages: Array<Status>;
}

/**
 * Send a request to the server to stop an app
 * 
 * @param process 
 */
export default async function stopProcess(process: Process) {
    console.log(`[GET] /process/action/stop`);
    try {
        const res = await fetch('http://localhost:24000/process/action/stop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
        });
        const response: StopProcessResponse = await res.json();
        
        return response;
    } catch(error: any) {
        console.log(`Error when trying to fetch data`);
        console.error(error);
        return [];
    }
}

