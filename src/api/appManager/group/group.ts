import { Status } from "felixriddle.good-roots-ts-api";

export interface AppGroup {
    id: number;
    name: string;
    description: string;
    createdAt: Date,
    updatedAt: Date,
}

export interface GetAppGroupResponse {
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
        // console.log(`Sending request with path: `, appPath);
        const res = await fetch(`http://localhost:24000/apps/group?query=${query}&page=${page}&perPage=${perPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            // cache: 'no-store'
        });
        const data: GetAppGroupResponse = await res.json();
        console.log(`App group response: `, data);
        
        return data.appGroups;
    } catch(error: any) {
        console.log(`[GET App] Error when trying to fetch data`);
        console.error(error);
        return [];
    }
}
