import { Socket } from "socket.io-client";

import AppData from "@/types/AppData";
import AppAction from "./AppAction";

/**
 * App scripts view
 */
export default function AppScriptsView({
    scripts,
    app,
    socket
}: {
    scripts: object,
    app: AppData,
    socket: Socket,
}) {
    const scriptEntries = Object.entries(scripts);
    
    
    return scriptEntries.map(([commandKey, value], index) => {
        if(typeof(value) !== 'string') {
            return (
                <div>
                    {commandKey} has an invalid type set as command.
                </div>
            );
        }
        const command = value;
        
        // Show app action
        return (
            <AppAction
                // Some scripts entries may repeat and indexes too between different components, I hope it doesn't matter for react
                key={`${commandKey}_${index}`}
                scriptName={commandKey}
                command={command}
                app={app}
                socket={socket}
            />
        );
    });
}
