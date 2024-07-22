'use client';

import { AppWindowManagerType } from "@/lib/apps/index/AppWindowManager";
import useAppsV2 from "@/hooks/app/useAppsV2";
import { socket } from "@/socket";
import { Suspense } from "react";
import Lobby from "@/components/app/input/queryAppSelector/Lobby";
import Search from "@/components/ui/Search";
import QueryPagination from "@/components/app/input/queryAppSelector/QueryPagination";
import AppsAccordion from "@/components/app/appViews/AppsAccordion";

/**
 * App but client side
 */
export default function ClientAppView({
    appWindowManager,
}: {
    appWindowManager: AppWindowManagerType;
}) {
    // Use apps does two things
    // * Applies apps order, filters, etc.
    // (Althogh in this context we don't need filters)
    // (In this context filters should be applied before getting the data(in the server component), or stored in a server state)
    // * Setups sockets
    const AppsHandler = useAppsV2(appWindowManager.apps, socket);
    
    return (
        <div>
            <h1>Node app manager</h1>
            <p>
                Node app manager, is a dashboard to perform actions with apps, start apps, stop apps, etc.
            </p>
            <p>
                The command line output of the apps is also visible for each app.
            </p>
            
            {/* Search and select an app */}
            <Search placeholder="Search apps" />
            
            <Suspense
				key={appWindowManager.queryInfo.query + appWindowManager.queryInfo.page}
				fallback={<Lobby />}
			>
                <AppsAccordion
                    apps={appWindowManager.apps}
                    socket={socket}
                    appsHandler={AppsHandler}
                />
            </Suspense>
            
            <QueryPagination
                totalPages={appWindowManager.pages}
            />
        </div>
    );
}
