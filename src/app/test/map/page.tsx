'use client';

import { useMemo } from "react";
import dynamic from "next/dynamic";

/**
 * 
 * @returns 
 */
export default function Map() {
    const Map = useMemo(() => dynamic(
        () => import("@/components/map/Map"), {
            loading: () => <p>A map is loading</p>,
            ssr: false,
        }
    ), []);
    
    return (
        <div>
            <Map />
        </div>
    )
}

