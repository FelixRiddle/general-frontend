'use server';

import { redirect } from "next/navigation";

import Navbar from "@/app/components/navigation/Navbar";
import PageTitle from "@/app/components/PageTitle";

import CreateClient from "./CreateClient";
import getAttributes from "@/api/property/getAttributes";

/**
 * User profile
 * 
 * @returns 
 */
export default async function Page() {
    const attributes = await getAttributes();
    
    if(!attributes) {
        console.error("Couldn't fetch attributes!");
        
        // Later on, redirect to wherever the user was last
        redirect("/");
    }
    
    return (
        <div>
            <Navbar
                // userData={user}
            />
            <PageTitle />
            
            <h2 className={"text-center text-6xl"}>Create property</h2>
            
            {/* To add functionality we have to use a client component */}
            <CreateClient
                categories={attributes.categories}
                prices={attributes.prices}
            />
        </div>
    );
}
