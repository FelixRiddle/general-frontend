
/**
 * Lobby is a component to wait for the query app selector to load
 */
export default function Lobby() {
    const titleClasses = "m-1 p-1 mb-4 text-xs font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl";
    
    return (
        <div>
            <h1 className={titleClasses}>Loading...</h1>
        </div>
    );
}
