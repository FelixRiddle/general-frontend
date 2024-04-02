import { PropertyAPI } from "felixriddle.good-roots-ts-api";
import { CategoryType, PriceType } from "felixriddle.my-types";

export interface Attributes {
    categories: Array<CategoryType>,
    prices: Array<PriceType>,
}

/**
 * Fetch attributes
 */
export default async function getAttributes(): Promise<Attributes | undefined> {
    try {
        const api = new PropertyAPI();
        const attData = await api.getAttributes();
        const attributes: Attributes = {
            ...attData,
        };
        
        return attributes;
    } catch(err) {
        console.error(err);
        return undefined;
    }
}
