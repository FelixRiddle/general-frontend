'use server';

import Navbar from "@/app/components/navigation/Navbar";
import PageTitle from "@/app/components/PageTitle";

import CreateClient from "./CreateClient";

/**
 * User profile
 * 
 * @returns 
 */
export default async function Page() {
    const categories: Array<Object> = [];
    const prices: Array<Object> = [];
    
    return (
        <div>
            <Navbar
                // userData={user}
            />
            <PageTitle />
            
            <h2 className={"text-center text-6xl"}>Create property</h2>
            
            {/* To add functionality we have to use a client component */}
            <CreateClient
                categories={categories}
                prices={prices}
            />
        </div>
    );
}
