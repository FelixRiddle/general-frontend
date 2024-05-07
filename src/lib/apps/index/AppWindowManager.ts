import { getApps } from "@/api/appManager/apps";
import { fetchAppsData } from "@/api/appManager/repositories";
import appsInPaginationWindow from "@/lib/app/appsWindow";
import { itemsWindow, totalPages } from "@/lib/pagination";
import AppData from "@/types/AppData";

/**
 * Store query and page
 */
export interface QueryInfo {
    query: string;
    page: number;
}

/**
 * App window manager type
 */
export interface AppWindowManagerType {
    queryInfo: QueryInfo;
    appNames: string[];
    windowAppsInfo: AppData[];
    pages: number;
    apps: Array<AppData>;
}

/**
 * App window manager
 * 
 * Window as in window of apps indexes that match filters or pages
 * 
 * Not the window of the app view
 */
export default class AppWindowManager {
    queryInfo: QueryInfo;
    appNames: string[];
    windowAppsInfo: AppData[];
    pages = 1;
    apps: Array<AppData> = [];
    
    /**
     * Constructor
     * 
     * @param typeData Cheap trick to create window apps manager in the frontend from an interface
     */
    constructor(typeData: AppWindowManagerType | undefined) {
        if(typeData) {
            this.queryInfo = typeData.queryInfo;
            this.appNames = typeData.appNames;
            this.windowAppsInfo = typeData.windowAppsInfo;
            this.pages = typeData.pages;
            this.apps = typeData.apps;
        } else {
            this.queryInfo = {
                query: "",
                page: 1,
            };
            this.appNames = [];
            this.windowAppsInfo = [];
        }
    }
    
    /**
     * To send to the frontend
     */
    toType(): AppWindowManagerType {
        return {
            queryInfo: this.queryInfo,
            appNames: this.appNames,
            windowAppsInfo: this.windowAppsInfo,
            pages: this.pages,
            apps: this.apps,
        };
    }
    
    /**
     * Get all apps
     */
    async fetchAllApps() {
        const appNames = await getApps(this.queryInfo.query)
           .then((res) => {
                return res?.apps;
            })
           .catch((err) => {
                console.error(err);
            });
        
        const apps = await this.fetchApps();
        
        // Get total pages
        const pages = totalPages(appNames.length);
        
        this.appNames = appNames;
        this.apps = apps;
        this.pages = pages;
    }

    /**
     * Fetch apps
     * 
     * @returns 
     */
    async fetchApps() {
        // Items window
        const itemsWindowInfo = itemsWindow(this.appNames.length, this.queryInfo.page);
        
        // Fetch apps
        const windowAppsName = appsInPaginationWindow(this.appNames, itemsWindowInfo);
        
        const windowAppsInfo = await fetchAppsData(windowAppsName);
        
        // Pro debugging methods
        // console.log(`Items window info: `, itemsWindowInfo);
        // console.log(`Window apps: `, windowAppsName);
        // console.log(`Window apps: `, windowAppsInfo);
        
        return windowAppsInfo;
    }
    
    // --- Query Info ---
    /**
     * Set page
     */
    setPage(page: number) {
        this.queryInfo.page = page;
    }
}
