import { Status } from "felixriddle.good-roots-ts-api";

import { AppGroup } from "./group";


export interface GetAppGroupResponse {
    group: AppGroup;
    messages: Array<Status>;
}

/**
 * Function to authenticate
 * 
 * @param formData 
 */
export async function getAppGroup(id: number): Promise<AppGroup | undefined> {
    try {
        const res = await fetch(`http://localhost:24000/apps/group/id?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });
        const data: GetAppGroupResponse = await res.json();
        
        return data.group;
    } catch(error: any) {
        console.log(`[GET App] Error when trying to fetch data`);
        console.error(error);
    }
}

