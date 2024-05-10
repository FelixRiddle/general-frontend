"use server";

import { Status } from "felixriddle.good-roots-ts-api";

import AppData from "@/types/AppData";

export interface AppNamesInGroup {
    appNames: string[];
    messages: Array<Status>;
}

export interface AppsInGroupResponse {
    appGroups: AppData[];
    messages: Array<Status>;
}

/**
 * Get apps name in group
 */
export async function getAppNamesInGroup(groupId: number): Promise<string[]> {
    try {
        const res = await fetch(`http://localhost:24000/apps/group/apps?groupId=${groupId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Use this for testing
            cache: 'no-store'
        });
        const data: AppNamesInGroup = await res.json();
        // console.log(`Response: `, data);
        
        return data.appNames;
    } catch(err: any) {
        console.error(err);
        return [];
    }
}

/**
 * Get apps in group
 */
export async function getAppsInGroup(groupId: number): Promise<AppData[]> {
    try {
        const appNames = await getAppNamesInGroup(groupId);
        // console.log(`App names: `, appNames);
        
        return [];
    } catch(err: any) {
        console.error(err);
        
        return [];
    }
}
