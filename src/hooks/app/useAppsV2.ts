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
    
    // Update app output via sockets
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
        }
        
        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }
        
        // --- The important events ---
        // TODO: I think the behaviour should be, start a socket for each running app
        // The backend must keep track of every running app
        function onAppStart(appName: string) {
            console.log(`App ${appName} started`);
        }
        
        function onAppError(err: any) {
            console.error(`App start error: `, err);
        }
        
        /**
         * Out event
         * 
         * @param out 
         */
        function onOutEvent(out: any) {
            console.log(`${out.app.name}: ${out.message}`);
            
            // Update app output
            const name = out.app.name;
            
            setFilteredApps((apps) => appendMessage(apps, name, out.message));
        }
        
        function onAppErrorEvent(err: any) {
            // Update app output
            const name = err.app.name;
            
            setFilteredApps((apps) => appendMessage(apps, name, err.message));
        };
        
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("app start", onAppStart);
        socket.on("app error", onAppError);
        socket.on('out', onOutEvent);
        socket.on("err", onAppErrorEvent)
        
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("app start", onAppStart);
            socket.off("app error", onAppError);
            socket.off("out", onOutEvent);
            socket.off("err", onAppErrorEvent);
        }
    }, []);
    
    return {
        apps: filteredApps,
    };
}
