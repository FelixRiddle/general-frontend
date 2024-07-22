"use client";

import { CiSearch } from "react-icons/ci";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

export default function Search({ placeholder }: {
    placeholder?: string,
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
	const [query, setQuery] = useState("");
    
    // Submit search
	function handleSubmitSearch() {
		if(!(typeof query === "string")) {
			return;
		}
		
        const params = new URLSearchParams(searchParams);
        
        params.set("page", "1");
        if(query) {
            params.set("query", query);
        } else {
            params.delete('query');
        }
        
        replace(`${pathname}?${params.toString()}`);
	}
    const handleSearch = useDebouncedCallback(handleSubmitSearch, 300);
    
    return (
        <div className={"p-1 m-1 relative flex flex-1 flex-shrink-0"}>
			<div>
				<label htmlFor="search" className="sr-only">
					Search
				</label>
				<input
					type="text"
					className="peer block w-1/4 rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
					placeholder={placeholder}
					onChange={(e) => {
						// Send input to handle search
						handleSearch();
						setQuery(e.target.value);
					}}
					defaultValue={searchParams.get("query")?.toString()}
				/>
			</div>
			<div>
				<CiSearch
					className={[
						"relative",
						"left-1",
						"pt-5",
					].join(" ")}
					onClick={() => handleSearch()}
				/>
			</div>
        </div>
    );
}

