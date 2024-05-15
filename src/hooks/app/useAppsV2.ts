"use client";

import AppData from "@/types/AppData";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { appendMessage, createAppsState } from "./useApps";

/**
 * Use apps
 * 
 * Why didn't I read this before I don't know
 * https://socket.io/how-to/use-with-nextjs
 */
export default function useAppsV2(apps: AppData[], socket: Socket) {
    // Fix app.out and sort alphabetically
    const [filteredApps, setFilteredApps] = useState<AppData[]>(createAppsState(apps));
    
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    
    useEffect(() => {
        if(socket.connected) {
            onConnect();
        }
        
        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);
            
            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport);
            });
            
            // --- The important things ---
            // On app start
            socket.on('app start', (appName: string) => {
                console.log(`App ${appName} started`);
            });
            
            // On app error / start error
            socket.on('app error', (err) => {
                console.error(`App start error: `, err);
            });
            
            // Stdout
            // React in development mode will run this twice
            socket.on('out', (out) => {
                // Update app output
                const name = out.app.name;
                
                console.log(`Output received for app: `, name);
                console.log(`Output: `, out);
                
                setFilteredApps((apps) => appendMessage(apps, name, out.message));
            });
            
            // Stderr
            socket.on('err', (err) => {
                // Update app output
                const name = err.app.name;
                
                setFilteredApps((apps) => appendMessage(apps, name, err.message));
            });
        }
        
        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }
        
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        }
    }, []);
    
    return {
        apps: filteredApps,
    };
}
