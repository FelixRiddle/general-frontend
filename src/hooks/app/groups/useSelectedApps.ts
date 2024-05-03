import AppData from "@/types/AppData";
import { useState } from "react";

/**
 * Use selected apps
 * 
 * Hook to select apps and put them in a group
 */
export default function useSelectedApps({
    apps
}: {
    apps: AppData[]
}) {
    
    const [groupApps, setGroupApps] = useState<AppData[]>([]);
    
    const clickToggleAppsSelectionCb = (event: any, appName: string) => {
        // event.preventDefault();
        
        // Find app and add to the group
        const app = apps.find((app) => app.packageJson.name === appName);
        if(app) {
            const groupApp = groupApps.find((app) => app.packageJson.name === appName);
            if(groupApp) {
                const groupAppIndex = groupApps.indexOf(app);
                let newGroupApps = groupApps;
                newGroupApps.splice(groupAppIndex, 1);
                
                return setGroupApps([
                    ...newGroupApps
                ]);
            } else {
                // Add app to group
                setGroupApps([
                    ...groupApps,
                    app,
                ]);
            }
        } else {
            // This shouldn't happen
            throw new Error(`An app was clicked but it couldn't be found!`);
        }
    }
    
    const clickDeselectAppCb = (event: any, appName: string) => {
        // Remove app from group
        setGroupApps([
            ...groupApps.filter((app) => app.packageJson.name!== appName)
        ]);
    }
    
    return {
        groupApps,
        setGroupApps,
        
        clickToggleAppsSelectionCb,
        clickDeselectAppCb,
    };
}
