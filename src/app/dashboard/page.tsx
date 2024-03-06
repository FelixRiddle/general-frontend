import { Suspense } from 'react';

import styles from "../../styles/dashboard.module.css";

/**
 * Dashboard page
 * 
 * Reference/s:
 * * https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
 * 
 * @returns 
 */
export default function Page() {
    return (
        <section>
            <h1>Hello, Dashboard Page!</h1>
            
            <p className={styles.description}>This is the dashboard page description</p>
            
            {/* Feed */}
            <Suspense fallback={
                <p>
                    Loading feed...
                </p>
            }>
                Post feed
            </Suspense>
            
            {/* Weather */}
            <Suspense fallback={
                <p>
                    Loading weather...
                </p>
            }>
                Weather feed
            </Suspense>
        </section>
    );
}
