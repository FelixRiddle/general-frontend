"use client";

import { useState } from "react";

export type ButtonTypes = "button" | "submit" | "reset" | undefined;

/**
 * Button
 * 
 * This is a button to make actions or show things
 */
export default function Button({
    children,
    type = "button",
    onClick,
    clickToggleActive = true
}: {
    children: React.ReactNode;
    type?: ButtonTypes;
    onClick?: ((event: any) => void) | (() => void);
    clickToggleActive?: boolean;
}) {
    const [active, setActive] = useState(clickToggleActive);
    
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                
                setActive(!active);
                
                if(onClick) {
                    onClick(e);
                }
            }}
            type={type}
            className={`border rounded border-purple-600 bg-purple-500 active:bg-purple-400 p-2 m-2 ${active && "bg-purple-400"} hover:bg-purple-400 hover:border-purple-500`}
        >
            {children}
        </button>
    );
}
