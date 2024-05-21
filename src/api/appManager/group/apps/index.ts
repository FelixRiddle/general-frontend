"use server";

import { Status } from "felixriddle.good-roots-ts-api";

import AppData from "@/types/AppData";
import { fetchAppsDataByName } from "../../repositories";

interface AppGroup {
    id: number;
    appName: string;
    groupId: number;
    createdAt: Date,
    updatedAt: Date,
}

export interface AppNamesInGroupResponse {
    apps: AppGroup[];
    messages: Array<Status>;
}

export interface AppsInGroupResponse {
    appGroups: AppData[];
    messages: Array<Status>;
}

/**
 * Get apps name in group
 */
export async function getAppsInGroup(groupId: number): Promise<AppGroup[]> {
    try {
        const res = await fetch(`http://localhost:24000/apps/group/apps?groupId=${groupId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Use this for testing
            cache: 'no-store'
        });
        const data: AppNamesInGroupResponse = await res.json();
        const apps = data.apps;
        
        return apps;
    } catch(err: any) {
        console.error(err);
        return [];
    }
}

/**
 * Get apps in group
 */
export async function getAppsDataInGroup(groupId: number): Promise<AppData[]> {
    try {
        const groupApps = await getAppsInGroup(groupId);
        
        if(groupApps) {
            // Get the names of the apps
            const appNames = groupApps.map(app => app.appName);
            
            // Fetch app data
            const appData = await fetchAppsDataByName(appNames);
            
            return appData;
        }
        
        return [];
    } catch(err: any) {
        console.log(`Error when fetching app data: `);
        console.error(err);
        
        return [];
    }
}
