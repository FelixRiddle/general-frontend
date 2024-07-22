import AppData from "@/types/AppData";
import AppActionV2 from "./AppActionV2";
import { Socket } from "socket.io-client";

/**
 * App scripts view
 */
export default function AppScriptsViewV2({
    scripts,
    app,
    socket,
    appsHandler
}: {
    scripts: object;
    app: AppData;
    socket: Socket;
    appsHandler: any;
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
            <AppActionV2
                // Some scripts entries may repeat and indexes too between different components, I hope it doesn't matter for react
                key={`${commandKey}_${index}`}
                scriptName={commandKey}
                command={command}
                app={app}
                socket={socket}
                appsHandler={appsHandler}
            />
        );
    });
}
