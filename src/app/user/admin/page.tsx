'use server';

import PageTitle from "@/app/components/PageTitle";
import Navbar from "@/app/components/navigation/Navbar";
import { userVanguard } from "@/lib/router/userVanguard";

/**
 * Admin page
 * 
 * @returns 
 */
export default async function Admin() {
    const user = await userVanguard();
    
    return (
        <div>
            <Navbar userData={user} />
            <PageTitle />
            
            <div>Admin page</div>
            
             
            {/* This should be like a dashboard */}
        </div>
    );
}

