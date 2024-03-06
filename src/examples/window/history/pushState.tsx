'use client';

import { useSearchParams } from "next/navigation";

/**
 * window.hist.pushState
 * 
 * Use to append a state, and when the user goes back the state too.
 * 
 * @returns 
 */
export default function SortProducts() {
    const searchParams = useSearchParams();
    
    function updateSorting(sortOrder: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", sortOrder);
        window.history.pushState(null, '', `?${params.toString()}`);
    }
    
    return (
        <>
            {/* Asc */}
            <button onClick={() => updateSorting('asc')}>
                Sort Ascending
            </button>
            
            {/* Desc */}
            <button onClick={() => updateSorting('desc')}>
                Sort Descending
            </button>
        </>
    );
}
