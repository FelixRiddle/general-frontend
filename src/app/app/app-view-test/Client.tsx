"use client";

import AppData from "@/types/AppData";

export default function Client({
    apps,
    // appWindowManager,
    runApp,
}: {
    apps: AppData[]
    // appWindowManager: AppWindowManagerType,
    runApp: (appInfo: any) => void,
}) {
    console.log(`Load server action on client`);
    
    return (
        <div>
            <h1>Pass server action test</h1>
        </div>
    );
}
