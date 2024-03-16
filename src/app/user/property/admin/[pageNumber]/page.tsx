'use server';

import Link from "next/link";

import PageTitle from "@/app/components/PageTitle";
import Navbar from "@/app/components/navigation/Navbar";
import { pageNumberOrRedirectTo } from "@/lib/router/path/pageNumber";
import { userVanguard } from "@/lib/router/userVanguard";
import adminRangedFetch from "@/api/user/property/admin";

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
    console.log(`Page number: `, pageNumber);
    
    // Instead of doing everything here like in the pug app, we will just use the endpoint
    const pageData = await adminRangedFetch(pageNumber);
    console.log(`Page data: `, pageData);
    const properties = pageData.properties;
    console.log(`Properties: `, properties);
    
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
                        
                    </ul>
                </div>
            ) || (
                <div>
                    There are no properties
                </div>
            )}
        </div>
    );
}

