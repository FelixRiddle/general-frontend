"use server";

import AppData from "@/types/AppData";
import { redirect } from "next/navigation";

/**
 * App group interface
 */
export interface AppGroup {
    name: string;
    description: string;
    apps: AppData[];
}

function getDescription(formData: FormData): string {
    const description = formData.get("description");
    if(!description) {
        return "";
    }
    
    return description.toString();
}

/**
 * Form submission
 */
export async function createGroup(formData: FormData, groupApps: AppData[]) {
    try {
        console.log(`Form data: `, formData);
        
        // Create app group
        const name = formData.get("name");
        if(!name) {
            throw Error("No name provided");
        }
        
        const description = getDescription(formData);
        const appGroup: AppGroup = {
            name: name.toString(),
            description,
            apps: groupApps,
        }
        
        // Backend location
        const location = "http://localhost:24000";
        const url = `${location}/apps/group/create`;
        
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appGroup),
        });
        const data = await res.json();
        console.log(`Data: `, data);
    } catch(err: any) {
        console.log(`Error when trying to create the app group`);
        console.error(err);
    }
    
    // Redirect to apps
    redirect("/app");
}
