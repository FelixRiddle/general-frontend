'use server';

import PageTitle from "@/app/components/PageTitle";
import Navbar from "@/app/components/navigation/Navbar";
import { userVanguard } from "@/lib/router/userVanguard";

/**
 * 
 * @returns 
 */
export default async function List() {
    const user = await userVanguard();
    
    return (
        <div>
            <Navbar userData={user} />
            <PageTitle />
            
            <div>User properties</div>
            
            <p>This page is not completed</p>
        </div>
    );
}

