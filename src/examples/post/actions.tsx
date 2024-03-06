'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function createPost(id: string) {
    try {
        // Call database
    } catch(err) {
        // Handle erros
    }
    
    // Update cached posts
    revalidatePath('/posts');
    
    // Redirect to the post
    redirect(`/post/${id}`);
}
