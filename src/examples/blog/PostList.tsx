import Link from "next/link";

// Post
type Post = {
    id: number,
    title: string,
    slug: string,
}

// Props
type Properties = {
    posts: Array<Post>,
}

/**
 * Post list view
 * 
 * @param props 
 * @returns 
 */
export default function PostList(props: Properties) {
    return (
        <ul>
            {props.posts.map((post: Post) => (
                <li key={post.id}>
                    {/* Dynamic segments */}
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    )
}
