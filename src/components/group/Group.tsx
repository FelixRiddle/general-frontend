"use client";

import { AppGroup } from "@/api/appManager/group/group";
import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

/**
 * App group
 */
export default function Group({
    group
}: {
    group: AppGroup
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
                </div>
                {showMore && (
                    <div>
                        <h2>Description</h2>
                        <p>
                            {group.description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
