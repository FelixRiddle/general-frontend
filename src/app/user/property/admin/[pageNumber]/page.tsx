'use server';

import Link from "next/link";
import { redirect } from "next/navigation";

import PageTitle from "@/app/components/PageTitle";
import Navbar from "@/app/components/navigation/Navbar";
import { pageNumberOrRedirectTo } from "@/lib/router/path/pageNumber";
import { userVanguard } from "@/lib/router/userVanguard";
import adminRangedFetch from "@/api/user/property/admin";
import PropertyRow from "@/app/components/property/property-list/display/PropertyRow";

/**
 * Admin page
 * 
 * @returns 
 */
export default async function Admin({ params }: { params: { pageNumber: string } }) {
    // Get user or redirect somewhere else, this is private property.
    const user = await userVanguard();
    
    const failureRedirect = `/user/property/admin`;
    
    // Get page number
    const pageNumber = pageNumberOrRedirectTo(params, failureRedirect);
    
    // Instead of doing everything here like in the pug app, we will just use the endpoint
    const pageData = await adminRangedFetch(pageNumber);
    if(!pageData) {
        redirect(failureRedirect);
    }
    
    const properties = pageData.properties;
    const { pages, currentPage, limit, offset, total } = pageData;
    
    console.log(`First property: `, properties[0]);
    const pagesComponents = () => {
        let components = [];
        for(let n = 1; n <= pages; n++) {
            components.push(
                <div key={n}>
                    <a href={`/user/property/admin/${n}`}
                        className={`${currentPage == n ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                    >
                        {n}
                    </a>
                </div>
            );
        }
        return components;
    }
    
    return (
        <div>
            <Navbar userData={user} />
            <PageTitle />
            
            <Link
                href="/user/property/create"
                className="rounded p-4 bg-pink-500 hover:bg-pink-600 text-sm font-bold text-center text-white uppercase my-5 block"
            >
                Create new property
            </Link>
            
            {properties.length > 0 && (
                <div className="bg-white shadow rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        {properties.map((property) => {
                            
                            return (
                                <li key={property.id}>
                                    <PropertyRow property={property} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) || (
                <div>
                    There are no properties
                </div>
            )}
            
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                {/* For mobile */}
                <div className="flex-1 flex justify-between sm:hidden">
                    <a href={`/user/property/admin?page=${currentPage - 1}`}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage === 1 ? 'pointer-events-none bg-gray-200' : ''}`}
                    >Previous</a>
                    <a href={`/user/property/admin?page=${currentPage + 1}`}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${currentPage === pages ? 'pointer-events-none bg-gray-200' : ''}`}
                    >
                        Next
                    </a>
                </div>
                
                {/* For larger screens */}
                <div>
                    <div className={"sm:flex-1 sm:flex sm:items-center sm:justify-between"}>
                        <p className={"text-sm text-gray-700 gap-2"}>Showing 
                            <span className={"font-medium"}> {offset + 1} to </span>
                            <span className={"font-medium"}>{total < limit + offset ? total : offset + limit} of </span>
                            <span className={"font-medium"}>{total} results.</span>
                        </p>
                    </div>
                    
                    <div>
                        <nav className={"relative z-0 inline-flex rounded-md shadow-md"}>
                            {pagesComponents()}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

