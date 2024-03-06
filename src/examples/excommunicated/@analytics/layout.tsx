import Link from "next/link";

/**
 * 
 * 
 * @param param0 
 * @returns 
 */
export default function Layout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <>
            <nav>
                <Link href="/dashboard/page-views">Page views</Link>
                <Link href="/dashboard/visitors">Visitors</Link>
            </nav>
            <div>{children}</div>
        </>
    );
}
