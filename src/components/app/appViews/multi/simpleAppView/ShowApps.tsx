"use client";

import { v4 as uuidv4 } from 'uuid';
import SimpleAppView from '../../single/simpleAppView/SimpleAppView';
import AppData from '@/types/AppData';
import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

/**
 * Show apps
 */
export default function ShowApps({
    apps,
    socket,
}: {
    apps: AppData[];
    socket: Socket;
}) {
    const [showApps, setShowApps] = useState(apps);
    const [firstRender, setFirstRender] = useState(true);
    
    /**
     * Sort alphabetically
     */
    const sortAlphabetically = () => {
        setShowApps(apps.sort((a, b) => {
            if (a.packageJson.name < b.packageJson.name) {
                return -1;
            }
            if (a.packageJson.name > b.packageJson.name) {
                return 1;
            }
            return 0;
        }));
    }
    
    useEffect(() => {
        if(firstRender) {
            sortAlphabetically();
            
            setFirstRender(false);
        }
    }, [firstRender]);
    
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
