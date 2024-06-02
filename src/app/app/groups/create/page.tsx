"use server";

import CreateGroupForm from "./CreateGroupForm";
import AppWindowManager from "@/lib/apps/index/AppWindowManager";

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
    await appWindowManager.update();
    
    return (
        <div>
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
