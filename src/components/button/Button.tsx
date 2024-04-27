"use client";

import { useState } from "react";

/**
 * Button
 * 
 * This is a button to make actions or show things
 */
export default function Button({
    children,
    onClick,
    clickToggleActive = true
}: {
    children: React.ReactNode;
    onClick?: () => void;
    clickToggleActive?: boolean;
}) {
    const [active, setActive] = useState(clickToggleActive);
    
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                
                setActive(!active);
                
                if(onClick) {
                    onClick();
                }
            }}
            className={`border rounded border-purple-600 bg-purple-500 active:bg-purple-400 p-2 m-2 ${active && "bg-purple-400"}`}>
            {children}
        </button>
    );
}
