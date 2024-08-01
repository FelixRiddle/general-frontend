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
    apps: Array<AppData> = [];
    
    // Pagination
    pages = 1;
    perPage: number = 5;
    
    /**
     * Constructor
     * 
     * @param typeData Cheap trick to create window apps manager in the frontend from an interface
     */
    constructor(typeData: AppWindowManagerType | undefined = undefined) {
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
     * Update all
     */
    async update() {
        const appNames = await getApps(this.queryInfo.query)
           .then((res) => {
                return res?.apps;
            })
           .catch((err) => {
                console.error(err);
            });
        
        // console.log(`App names: `, appNames);
        
        if(appNames) {
            // Get total pages
            const pages = totalPages(appNames.length, this.perPage);
            // console.log(`Total pages: `, pages);
            
            // Update
            this.appNames = appNames;
            this.pages = pages;
            
            // Lastly update apps in window
            const apps = await this.appsWindow();
            this.apps = apps;
        } else {
            console.log(`WARNING: Couldn't fetch apps! Maybe 'app-manager' backend is not running?`);
        }
    }

    /**
     * Fetch apps in window
     * 
     * @returns 
     */
    async appsWindow() {
        // Items window
        const itemsWindowInfo = itemsWindow(this.pages, this.queryInfo.page, this.perPage);
        
        // Fetch apps
        const windowAppsName = appsInPaginationWindow(this.appNames, itemsWindowInfo);
        
        const windowAppsInfo = await fetchAppsData(windowAppsName);
        
        // Pro debugging methods
        // console.log(`Items window info: `, itemsWindowInfo);
        console.log(`Window apps name: `, windowAppsName);
        // console.log(`Window apps information: `, windowAppsInfo);
        
        return windowAppsInfo;
    }
    
    // --- Query Info ---
    /**
     * Query from search params
     */
    setQueryFromSearchParams(searchParams: {
        query?: string;
        page?: string;
    }) {
        // Fetch apps
        const query = searchParams?.query || "";
        const page = Number(searchParams?.page) || 1;
        
        this.setQuery(query);
        this.setPage(page);
    }
    
    /**
     * Set query
     */
    setQuery(query: string) {
        this.queryInfo.query = query;
    }
    
    /**
     * Set page
     */
    setPage(page: number) {
        this.queryInfo.page = page;
    }
    
    // --- Pagination ---
    /**
     * Set per page
     */
    setPerPage(perPage: number) {
        this.perPage = perPage;
    }
}
