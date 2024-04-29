import { ItemsWindowInfo } from "../pagination";

/**
 * Get apps name in a window
 * 
 * @param apps App names
 */
export default function appsInPaginationWindow(apps: Array<string>, window: ItemsWindowInfo): Array<string> {
    let appsName: Array<string> = [];
    
    for (let i = window.windowStart; i < window.windowEnd; i++) {
        // appsName.push(app);
        const app = apps[i];
        appsName.push(app);
    }
    
    return appsName;
}
