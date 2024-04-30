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
    
    const pageButtonClasses = "m-1 p-1 flex border border-gray-500 rounded hover:border-rose-600 hover:bg-rose-500"
    
    return (
        <div>
            <nav className="flex items-center">
                {/* Left arrows */}
                {/* For this one just remove the page */}
                <Link href={`${pathname}?query=${query}`} className={pageButtonClasses}>
                    <GoChevronLeft className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                    <GoChevronLeft className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                </ Link>
                <Link href={createPageUrl(currentPage - 1)} className={pageButtonClasses}>
                    <GoChevronLeft className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                </Link>
                
                {/* Pages */}
                {Array.from({ length: totalPages }).map((_, index) => (
                    <Link href={createPageUrl(index + 1)} key={index} className={pageButtonClasses}>
                        {index + 1}
                    </Link>
                ))}
                
                {/* Right arrows */}
                <Link href={createPageUrl(currentPage + 1)} className={pageButtonClasses}>
                    <GoChevronRight className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                </Link>
                <Link href={`${pathname}?query=${query}&page=${totalPages}`} className={pageButtonClasses}>
                    <GoChevronRight className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                    <GoChevronRight className={clsx("h-5 w-5", currentPage > 1 && "cursor-pointer")} />
                </ Link>
            </nav>
        </div>
    );
}
