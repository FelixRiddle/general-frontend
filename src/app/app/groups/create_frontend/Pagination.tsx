"use client";

import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Pagination
 */
export default function Pagination({
    totalPages,
    currentPage,
    setPage
}: {
    totalPages: number;
    currentPage: number;
    setPage: (page: number) => void;
}) {
    const pageButtonClasses = "m-1 p-1 flex border border-gray-500 rounded hover:border-rose-600 hover:bg-rose-500 disabled:bg-gray-500"
    
    return (
        <div>
            <nav className="flex items-center">
                {/* Left arrows */}
                {/* For this one just remove the page */}
                <button
                    onClick={(e) => setPage(1)}
                    className={`${pageButtonClasses} ${currentPage === 1 && "bg-gray-300"}`}
                    
                    // Disable left arrow if it's the first page
                    style={{pointerEvents: currentPage === 1 ? "none" : "auto"}}
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : 0}
                >
                    <GoChevronLeft className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                    <GoChevronLeft className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                </ button>
                <button
                    onClick={(e) => setPage(currentPage - 1)}
                    className={`${pageButtonClasses} ${currentPage === 1 && "bg-gray-300"}`}
                    
                    // Disable left arrow if it's the first page
                    style={{pointerEvents: currentPage === 1 ? "none" : "auto"}}
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : 0}
                >
                    <GoChevronLeft className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                </button>
                
                {/* Pages */}
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        onClick={(e) => setPage(index + 1)}
                        key={index}
                        className={`${pageButtonClasses} ${index + 1 === currentPage && "bg-sky-400"}`}
                    >
                        <span className={"pl-1 pr-1"}>{index + 1}</span>
                    </button>
                ))}
                
                {/* Right arrows */}
                <button
                    onClick={(e) => setPage(currentPage + 1)}
                    className={`${pageButtonClasses}  ${currentPage === totalPages && "bg-gray-300"}`}
                    
                    // Disable left arrow if it's the first page
                    style={{pointerEvents: currentPage === totalPages ? "none" : "auto"}}
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : 0}
                >
                    <GoChevronRight className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                </button>
                <button
                    onClick={(e) => setPage(totalPages)}
                    className={`${pageButtonClasses} ${currentPage === totalPages && "bg-gray-300"}`}
                    
                    // Disable left arrow if it's the first page
                    style={{pointerEvents: currentPage === totalPages ? "none" : "auto"}}
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : 0}
                >
                    <GoChevronRight className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                    <GoChevronRight className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                </ button>
            </nav>
        </div>
    );
}
