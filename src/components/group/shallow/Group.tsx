"use client";

import deleteGroup from "@/api/appManager/group/deleteGroup";
import { AppGroup } from "@/api/appManager/group/group";
import AppData from "@/types/AppData";
import Link from "next/link";
import { useState } from "react";
import { SlArrowDown, SlArrowUp, SlTrash } from "react-icons/sl";

/**
 * App group
 */
export default function Group({
    group,
    apps
}: {
    group: AppGroup,
    apps?: AppData[]
}) {
    const [showMore, setShowMore] = useState(false);
    
    const switchShowMore = () => {
        setShowMore(!showMore);
    }
    
    // Classes
    const arrowClasses = "mt-1 mr-2";
    const appColor = (() => {
        if(false) {
            return "bg-lime-300 border-lime-400";
        } else {
            return "bg-gray-300 border-gray-400";
        }
    })();
    
    // On element click
    const onElementClick = (event: any) => {
        switchShowMore();
    }
    
    const trashClasses = "m-1 p-1 flex border border-gray-500 rounded hover:border-rose-600 hover:bg-rose-500 disabled:bg-gray-500";
    
    return (
        <div
            className={`rounded border-2 p-2 m-2 ${appColor} hover:border-emerald-400 hover:bg-emerald-300 hover:cursor-pointer`}
            onClick={(e) => {
                // Only when it's not shown
                // Otherwise it's gonna collapse when you click anywhere insde the parent element
                // We will enable it to be hidden when the user clicks either the arrow icon or the name
                if(!showMore) {
                    onElementClick(e);
                }
            }}
        >
            <div>
                <div className="flex">
                    {/* Name and toggle */}
                    <div className="flex flex-1">
                        {showMore ? (
                            <SlArrowUp
                                className={arrowClasses}
                                onClick={onElementClick}
                            />
                        ) : (
                            <SlArrowDown
                                className={arrowClasses}
                                onClick={onElementClick}
                            />
                        )}
                        <h1
                            className="cursor-pointer"
                            onClick={onElementClick}
                        >{group.name}</h1>
                    </div>
                    
                    {/* Actions */}
                    <div className={"flex-1"}>
                        <SlTrash
                            className={trashClasses}
                            onClick={(e) => {
                                console.log(`Delete group: ${group.name}`);
                                deleteGroup(group);
                            }}
                        />
                    </div>
                    
                    <div className={"flex-1"}>
                        <SlTrash
                            className={arrowClasses}
                            onClick={(e) => deleteGroup(group)}
                        />
                    </div>
                </div>
                {showMore && (
                    <div className={"flex flex-col"}>
                        <h2>Description</h2>
                        <p>
                            {group.description}
                        </p>
                        
                        <Link
                            href={`/app/groups/${group.id}`}
                            className={`p-2 border rounded border-purple-600 bg-purple-500 active:bg-purple-400hover:bg-purple-400 hover:border-purple-500`}
                        >
                            Go to group
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
