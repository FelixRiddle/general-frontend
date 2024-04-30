"use client";

import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Pagination
 */
export default function Pagination({
    totalPages,
}: {
    totalPages: number;
}) {
    const pathname = usePathname();
    
    // Get query and current page
    const searchParams = useSearchParams();
    const query = searchParams?.get("query") || "";
    const currentPage = Number(searchParams.get("page") || 1);
    
    // Create page url
    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        
        return `${pathname}?${params.toString()}`;
    }
    
    console.log(`Total pages: `, totalPages);
    
    const pageButtonClasses = "m-1 p-1 flex border border-gray-500 rounded hover:border-rose-600 hover:bg-rose-500 disabled:bg-gray-500"
    
    return (
        <div>
            <nav className="flex items-center">
                {/* Left arrows */}
                {/* For this one just remove the page */}
                <Link
                    href={`${pathname}?query=${query}`}
                    className={`${pageButtonClasses} ${currentPage === 1 && "bg-gray-300"}`}
                    
                    // Disable left arrow if it's the first page
                    style={{pointerEvents: currentPage === 1 ? "none" : "auto"}}
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : 0}
                >
                    <GoChevronLeft className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                    <GoChevronLeft className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                </ Link>
                <Link
                    href={createPageUrl(currentPage - 1)}
                    className={`${pageButtonClasses} ${currentPage === 1 && "bg-gray-300"}`}
                    
                    // Disable left arrow if it's the first page
                    style={{pointerEvents: currentPage === 1 ? "none" : "auto"}}
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : 0}
                >
                    <GoChevronLeft className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                </Link>
                
                {/* Pages */}
                {Array.from({ length: totalPages }).map((_, index) => (
                    <Link href={createPageUrl(index + 1)} key={index} className={`${pageButtonClasses} ${index + 1 === currentPage && "bg-sky-400"}`}>
                        <span className={"pl-1 pr-1"}>{index + 1}</span>
                    </Link>
                ))}
                
                {/* Right arrows */}
                <Link
                    href={createPageUrl(currentPage + 1)}
                    className={`${pageButtonClasses}  ${currentPage === totalPages && "bg-gray-300"}`}
                    
                    // Disable left arrow if it's the first page
                    style={{pointerEvents: currentPage === totalPages ? "none" : "auto"}}
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : 0}
                >
                    <GoChevronRight className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                </Link>
                <Link
                    href={`${pathname}?query=${query}&page=${totalPages}`}
                    className={`${pageButtonClasses} ${currentPage === totalPages && "bg-gray-300"}`}
                    
                    // Disable left arrow if it's the first page
                    style={{pointerEvents: currentPage === totalPages ? "none" : "auto"}}
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : 0}
                >
                    <GoChevronRight className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                    <GoChevronRight className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                </ Link>
            </nav>
        </div>
    );
}
