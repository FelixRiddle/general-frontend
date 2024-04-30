"use client";

import AppData from "@/types/AppData";
import React, { useState } from "react";

import ShowApps from "../../app/selectableAppView/ShowApps";

export interface AppSelection {
    appName: string;
    selected: boolean;
    packageJson: any;
}

/**
 * Simple app view
 */
export default function useSelectableApp({
    apps
}: {
    apps: AppData[],
}) {
    const [appSelection, setAppSelection] = useState(apps.map((app) => {
        return {
            appName: app.packageJson.name,
            selected: false,
            packageJson: app.packageJson,
        };
    }));
    
    /**
     * Switch app selected state
     * 
     * Normally apps are in a small 'window' that shows a tiny part of the whole, so this wouldn't be too intensive.
     * 
     * @param appName 
     */
    const switchAppSelectedState = (appName: string) => {
        // Search the selected app and switch its state
        const newAppSelection = appSelection.map((app) => {
            // Check if apps match
            if (app.appName === appName) {
                return {
                    ...app,
                    // Switch app selected state
                    selected: !app.selected,
                };
            }
            
            return app;
        });
        
        setAppSelection(newAppSelection);
    }
    
    return {
        appSelection,
        switchAppSelectedState,
    };
}



