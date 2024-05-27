"use client";

import { v4 as uuidv4 } from 'uuid';
import SimpleAppView from './SimpleAppView';
import AppData from '@/types/AppData';
import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

/**
 * Show apps
 * 
 * @deprecated Use app-view-v2
 */
export default function ShowApps({
    apps,
    socket,
}: {
    apps: AppData[];
    socket: Socket;
}) {
    const [showApps, setShowApps] = useState(apps);
    
    return (
        <div>
            {/* Show all apps */}
            {showApps.map(app => {
                return (
                    <SimpleAppView
                        key={uuidv4()}
                        app={app}
                        socket={socket}
                    ></SimpleAppView>
                );
            })}
        </div>
    );
}
