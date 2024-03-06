import Link from "next/link";

/**
 * Modal
 */
export function Modal({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <>
            <Link href="/">Close modal</Link>
            <div>{children}</div>
        </>
    );
}
