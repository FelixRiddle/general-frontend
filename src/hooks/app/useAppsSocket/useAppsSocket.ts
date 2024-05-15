"use client";

import { socket } from "@/socket";
import { useEffect, useState } from "react";

/**
 * Apps socket hook
 * 
 * It's just an example
 */
export default function useAppsSocket() {
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
}

