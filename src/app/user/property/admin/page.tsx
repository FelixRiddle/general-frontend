'use server';

import PageTitle from "@/app/components/PageTitle";
import Navbar from "@/app/components/navigation/Navbar";

/**
 * Admin page
 * 
 * @returns 
 */
export default async function Admin() {
    return (
        <div>
            <Navbar />
            <PageTitle />
            
            <div>Admin page</div>
            
            {/* This should be like a dashboard */}
        </div>
    );
}

