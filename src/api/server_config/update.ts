'use server';

import ConfMap from "felixriddle.configuration-mappings";

/**
 * Update server config
 */
export default async function update() {
    try {
        const conf = new ConfMap.LocationSelection();
        conf.updateLocationUrls();
    } catch(err) {
        console.error(err);
    }
}
