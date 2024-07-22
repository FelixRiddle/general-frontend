"use server";

import { getAppsData } from "@/api/appManager/app";
import ClientAppV2 from "./ClientAppV2";

/**
 * App manager
 */
export default async function App() {
    const appsData = await getAppsData();
    
    return(
        <div>
            <ClientAppV2
                apps={appsData}
            ></ClientAppV2>
        </div>
    );
}
