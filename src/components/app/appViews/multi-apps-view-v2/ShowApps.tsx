"use client";

import { v4 as uuidv4 } from 'uuid';
import AppData from '@/types/AppData';
import { useEffect, useState } from 'react';
import SimpleAppViewV2 from '../single/simpleAppViewV2/SimpleAppViewV2';
import Apps from '@/lib/apps/Apps';
import appManagerSocket from '@/lib/connection/appManagerSocket';
import { Socket } from 'socket.io-client';

function createAppManager(apps: AppData[]) {
    const appsManager = new Apps(apps, appManagerSocket());
    appsManager.defaultAppsView();
    
    return appsManager;
}

/**
 * Show apps
 */
export default function ShowAppsV2({
    apps,
    socket,
}: {
    apps: AppData[];
    socket: Socket;
}) {
    const [appsManager, setAppsManager] = useState(createAppManager(apps));
    const [appsView, setAppsView] = useState(appsManager.getAppsView());
    
    return (
        <div>
            {/* Show all apps */}
            {appsView.map(app => {
                return (
                    <SimpleAppViewV2
                        key={uuidv4()}
                        app={app}
                        socket={socket}
                    ></SimpleAppViewV2>
                );
            })}
        </div>
    );
}
