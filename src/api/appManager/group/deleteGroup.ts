import { AppGroup } from "./group";

/**
 * Delete a group
 */
export default async function deleteGroup(group: AppGroup) {
    try {
        console.log(`[DELETE] /apps/group`);
        
        // Backend location
        const location = "http://localhost:24000";
        const url = `${location}/apps/group`;
        
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group),
        });
        
        const data = await res.json();
        console.log(`Data: `, data);
    } catch(err: any) {
        console.log(`Error when trying to delete group`);
        console.error(err);
    }
}
