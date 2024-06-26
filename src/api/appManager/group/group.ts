"use server";

import { Status } from "felixriddle.good-roots-ts-api";
import { APP_MANAGER_URL } from "../appManagerUrl";

export interface AppGroup {
    id: number;
    name: string;
    description: string;
    createdAt: Date,
    updatedAt: Date,
}

export interface GetAppGroupsResponse {
    appGroups: AppGroup[];
    messages: Array<Status>;
}

/**
 * Function to authenticate
 * 
 * @param formData 
 */
export async function getAppGroups(query: string, page: number, perPage: number): Promise<AppGroup[]> {
    try {
        const url = APP_MANAGER_URL;
        const res = await fetch(`${url}/apps/group?query=${query}&page=${page}&perPage=${perPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        const data: GetAppGroupsResponse = await res.json();
        
        return data.appGroups;
    } catch(error: any) {
        console.log(`[GET App] Error when trying to fetch data`);
        console.error(error);
        return [];
    }
}
