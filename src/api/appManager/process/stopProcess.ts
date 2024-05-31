"use server";

import { Process } from "@/components/process/ProcessView";
import { Status } from "felixriddle.good-roots-ts-api";
import { APP_MANAGER_URL } from "../appManagerUrl";

export interface StopProcessResponse {
    messages: Array<Status>;
}

/**
 * Send a request to the server to stop an app
 * 
 * @param process 
 * @deprecated Use 'stopAppByName' instead
 */
export default async function stopProcess(process: Process) {
    try {
        console.log(`[GET] /process/action/stop`);
        
        const url = APP_MANAGER_URL;
        const res = await fetch(`${url}/process/action/stop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(process),
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

/**
 * Stop app by name
 * 
 * @param process 
 * @returns 
 */
export async function stopAppByName(name: string) {
    try {
        // console.log(`Stop app by name: ${name}`);
        console.log(`[GET] /process/action/stop/name?name=${name}`);
        
        // Build url
        const url = APP_MANAGER_URL;
        const endpoint = `/process/action/stop/name`;
        const queryParams = `?name=${name}`;
        const completeUrl = `${url}${endpoint}${queryParams}`;
        
        // Stop app
        const res = await fetch(completeUrl, {
            method: 'GET',
            cache: 'no-store',
        });
        
        const response: StopProcessResponse = await res.json();
        // console.log(`Response: `, response);
        
        return response;
    } catch(error: any) {
        console.log(`Error when trying to fetch data`);
        console.error(error);
        return [];
    }
}
