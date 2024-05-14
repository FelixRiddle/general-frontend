import { io } from "socket.io-client";

/**
 * App manager socket
 */
export default function appManagerSocket() {
    const socket = io(`http://localhost:${24000}`);
    
    return socket;
}

