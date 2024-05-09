"use server";

import AppData from "@/types/AppData";
import AppCustomNavbar from "../../AppCustomNavbar";
import CreateGroupForm from "./CreateGroupForm";
import AppWindowManager from "@/lib/apps/index/AppWindowManager";

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
    "use server";
    
    try {
        console.log(`Create group with apps: `, groupApps);
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
        
        console.log(`App group: `, appGroup);
        
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
}

/**
 * Create group
 */
export default async function CreateV4({
    searchParams,
}: {
    searchParams: {
        query?: string;
        page?: string;
    }
}) {
    
    const appWindowManager = new AppWindowManager();
    appWindowManager.setQueryFromSearchParams(searchParams);
    await appWindowManager.updateAll();
    
    return (
        <div>
            <AppCustomNavbar />
            
            <h1 className={"m-1 p-1 mb-4 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white"}>App groups</h1>
            <p>
                Apps can be grouped together to manage them together.
            </p>
            
            {/* Simple create group form */}
            {/* Different from create group form, the pagination and app information is fetch on the backend */}
            <CreateGroupForm
                appWindowManager={appWindowManager.toType()}
            />
        </div>
    );
}
