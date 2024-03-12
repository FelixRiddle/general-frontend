import Navbar from "../components/navigation/Navbar";

/**
 * 
 * @returns 
 */
export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}
