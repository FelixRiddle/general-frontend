/**
 * Page length
 */
export function totalPages(itemsLength: number, perPage: number = 5): number {
    // Of course it's math.roof
    return Math.ceil(itemsLength / perPage);
}

interface ItemsWindowInfo {
    // Start / End
    windowStart: number;
    windowEnd: number;
    
    page: number;
    totalPages: number;
    
    totalItems: number;
    items: number;
}

/**
 * Get a window of items in a given page
 */
export function itemsWindow(itemsLength: number, currentPage: number = 1, perPage: number = 5): ItemsWindowInfo {
    const pages = totalPages(itemsLength, perPage);
    
    // Window of apps that will be shown
    const itemsWindowStart = currentPage * perPage - perPage;
    const nextWindowStart = (currentPage + 1) * perPage - perPage;
    
    // There are many ways to calculate this part
    
    let remainingItems = perPage;
    
    // With end
    // If the end page is greater than total pages
    // We are at the final window of apps
    if(nextWindowStart > pages) {
        // The remaining apps length are
        remainingItems = nextWindowStart - itemsWindowStart;
    }
    
    // 25 + 3 = 28
    // 25 + 5 = 30
    const itemsWindowEnd = itemsWindowStart + remainingItems;
    return {
        totalItems: itemsLength,
        windowStart: itemsWindowStart,
        windowEnd: itemsWindowEnd,
        page: currentPage,
        totalPages: pages,
        items: remainingItems,
    };
}

