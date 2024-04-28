import { v4 as uuidv4 } from 'uuid';
import SimpleAppView from './SimpleAppView';
import AppData from '@/types/AppData';
import { Socket } from 'socket.io-client';

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
    return (
        <div>
            {/* Show all apps */}
            {apps.map(app => {
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
