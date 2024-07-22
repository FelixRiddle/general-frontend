"use client";

import { Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import AppData from '@/types/AppData';
import Apps from '@/lib/apps/Apps';
import appManagerSocket from '@/lib/connection/appManagerSocket';
import AppAccordion from './AppAccordion';

function createAppManager(apps: AppData[]) {
    const appsManager = new Apps(apps, appManagerSocket());
    appsManager.defaultAppsView();
    
    return appsManager;
}

/**
 * Show apps
 */
export default function AppsAccordion({
    apps,
    socket,
    appsHandler,
}: {
    apps: AppData[];
    socket: Socket;
    appsHandler: any;
}) {
    const [appsManager, setAppsManager] = useState(createAppManager(apps));
    const [appsView, setAppsView] = useState(appsManager.getAppsView());
    
    return (
        <div>
            {/* Show all apps */}
            {appsView.map(app => {
                return (
                    <AppAccordion
                        key={uuidv4()}
                        app={app}
                        socket={socket}
                        appsHandler={appsHandler}
                    ></AppAccordion>
                );
            })}
        </div>
    );
}
