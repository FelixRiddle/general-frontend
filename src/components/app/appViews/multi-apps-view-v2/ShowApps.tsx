"use client";

import { v4 as uuidv4 } from 'uuid';
import SimpleAppView from '../single/simpleAppView/SimpleAppView';
import AppData from '@/types/AppData';
import { useEffect, useState } from 'react';
import SimpleAppViewV2 from '../single/simpleAppViewV2/SimpleAppViewV2';

/**
 * Show apps
 */
export default function ShowAppsV2({
    apps,
    runApp,
}: {
    apps: AppData[];
    runApp: (appInfo: any) => void;
}) {
    const [showApps, setShowApps] = useState(apps);
    
    /**
     * Sort and add
     */
    useEffect(() => {
        const sortedApps = apps.sort((a, b) => {
            if (a.packageJson.name < b.packageJson.name) {
                return -1;
            }
            if (a.packageJson.name > b.packageJson.name) {
                return 1;
            }
            return 0;
        });
        
        setShowApps(sortedApps);
    }, [apps]);
    
    return (
        <div>
            {/* Show all apps */}
            {showApps.map(app => {
                return (
                    <SimpleAppViewV2
                        key={uuidv4()}
                        app={app}
                        runApp={runApp}
                    ></SimpleAppViewV2>
                );
            })}
        </div>
    );
}
