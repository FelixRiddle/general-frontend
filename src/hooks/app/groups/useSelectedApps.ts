import AppData from "@/types/AppData";
import { useEffect, useState } from "react";

/**
 * 
 */
export default function useSelectedApps({
    apps
}: {
    apps: AppData[]
}) {
    
    const [groupApps, setGroupApps] = useState<AppData[]>([]);
    
    const selectClickCb = (event: any, appName: string) => {
        // event.preventDefault();
        
        // // Update app selected state
        // switchAppSelectedState(appName);
        
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
        
            // console.log(`App selected: `, app);
        } else {
            // console.log(`An app was clicked but it couldn't be found!`);
            
            // console.log(`Apps: `, apps);
            // console.log(`App clicked: `, appName);
            
            // This shouldn't happen
            throw new Error(`An app was clicked but it couldn't be found!`);
        }
    }
    
    useEffect(() => {
        console.log(`Group apps: `, groupApps);
    }, [groupApps]);
    
    return {
        groupApps,
        setGroupApps,
        selectClickCb,
    }
}
