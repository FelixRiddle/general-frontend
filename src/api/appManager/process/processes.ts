"use server";

import { Status } from "felixriddle.good-roots-ts-api";

import { Process } from "@/components/process/ProcessView";
import { APP_MANAGER_URL } from "../appManagerUrl";

export interface ProcessesResponse {
    processes: Array<Process>;
    messages: Array<Status>;
}

/**
 * Get processes
 */
export default async function processes(): Promise<Array<Process>> {
    console.log(`[GET] /process/all`);
    try {
        const url = APP_MANAGER_URL;
        const res = await fetch(`${url}/process/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
        });
        const response: ProcessesResponse = await res.json();
        
        return response.processes;
    } catch(error: any) {
        console.log(`Error when trying to fetch data`);
        console.error(error);
        return [];
    }
}
