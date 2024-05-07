import { getApps } from "@/api/appManager/apps";
import { fetchAppsData } from "@/api/appManager/repositories";
import appsInPaginationWindow from "@/lib/app/appsWindow";
import { itemsWindow, totalPages } from "@/lib/pagination";
import AppData from "@/types/AppData";
import { useEffect, useState } from "react";

/**
 * Fetch apps
 * 
 * @returns 
 */
async function fetchApps(currentPage: number, appNames: Array<string>): Promise<AppData[]> {
    // Items window
    const itemsWindowInfo = itemsWindow(appNames.length, currentPage);
    console.log(`Items window info: `, itemsWindowInfo);
    
    // Fetch apps
    const windowAppsName = appsInPaginationWindow(appNames, itemsWindowInfo);
    console.log(`Window apps: `, windowAppsName);
    
    const windowAppsInfo = await fetchAppsData(windowAppsName);
    console.log(`Window apps: `, windowAppsInfo);
    
    return windowAppsInfo;
};

/**
 * Use app names hook
 * 
 * @deprecated Too problematic, use the class
 */
export default function useAppsWindow(query: string, page: number) {
    const [appNames, setAppNames] = useState([]);
    
    // Get total pages
    const [pages, setPages] = useState(totalPages(appNames.length));
    
    const [apps, setApps] = useState<Array<AppData>>([]);
    
    useEffect(() => {
        (async () => {
            // App names
            const appNames = await getApps(query)
                .then((res) => {
                    return res?.apps;
                })
                .catch((err) => {
                    console.error(err);
                });
            setAppNames(appNames);
            
            // Set pages
            setPages(totalPages(appNames.length));
            
            // Set apps
            const apps = await fetchApps(page, appNames);
            setApps(apps);
        })();
    }, [page]);
    
    return {
        appNames, setAppNames,
        
        pages, setPages,
        
        apps, setApps,
    };
}
