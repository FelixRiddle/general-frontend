"use client";

import { io } from "socket.io-client";

export const socket = io(`http://localhost:${24000}`);
