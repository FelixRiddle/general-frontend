'use client';

export interface CreateClientProperties {
    categories: Array<Object>,
    prices: Array<Object>
}

/**
 * Create property client component
 * 
 * @param param0 
 * @returns 
 */
export default function CreateClient(props: CreateClientProperties) {
    
    // When the user leaves the input
    // Add the data to the query params
    // Also should be saved as draft
    const addDataToQueryParams = (event: any) => {
        console.log(`Event type: `, event.type);
        const e = event as FocusEvent;
        if(e) {
            console.log(`User left the input`);
            const element: HTMLInputElement = event.target as HTMLInputElement;
            
            // We will have to know what type it's though
            // Because for a text area this gives nothing
            const data = element.value;
            console.log(`Input data: `, data);
        } else {
            console.log(`Event is not focus event!`);
        }
    }
    
    return (
        <div>
            {/* Actual formulary */}
            <div className="bg-white shadow py-8 px-4 rounded mx-auto max-width max-w-2xl my-10 md:px-10">
                <form action="space-y-8">
                    <div className="space-y-8">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">General information</h3>
                        <p className="text-gray-600">Add information about the property</p>
                        
                        {/* Fields */}
                        {/* Property title */}
                        <div>
                            <label htmlFor="title" className="block text-sm uppercase text-gray-500 mb-2 font-bold">
                                Property title
                            </label>
                            {/* Here the value should survive reloads haha */}
                            <input
                                id="title"
                                type="text"
                                className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400"
                                placeholder="My beautiful house"
                                name="title"
                                // You have to use 'defaultValue' instead of value in nextjs
                                defaultValue=""
                                // onBlur={addDataToQueryParams}
                            />
                        </div>
                        
                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm uppercase text-gray-500 mb-2 font-bold">
                                    Description
                            </label>
                            <textarea
                                name="description" id="description"
                                className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400"
                                placeholder="House description"
                            >
                            </textarea>
                        </div>
                        
                        {/* Category and price with select item list */}
                        <div className="md:flex md:gap-4 space-y-6 md:space-y-0">
                            {/* Category */}
                            <div className="md:w-1/2">
                                <label htmlFor="category"
                                    className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                                >
                                    Category
                                </label>
                                
                                {/* Selector */}
                                <select
                                    name="category"
                                    id="categoryId"
                                    className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400"
                                >
                                    {/* Emtpy selection */}
                                    <option 
                                        defaultValue=""
                                    > - Select one - </option>
                                    
                                    {/* Search in categories */}
                                    {props.categories.map((category: any, index) => {
                                        
                                        // The selected part, checks if the category is selected(this is for when
                                        // the website is refreshed for example)
                                        return (
                                            <option
                                                defaultValue={category.id}
                                                key={category.id}
                                                selected={false}
                                                // selected=property ? property.categoryId == category.id ? true : false : null
                                            >
                                                {category.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            
                            {/* Price */}
                            <div className="md:w-1/2">
                                <label htmlFor="price"
                                    className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                                >
                                    Price
                                </label>
                                
                                {/* Selector */}
                                <select
                                    name="price"
                                    id="priceId"
                                    className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400"
                                >
                                    {/* Emtpy selection */}
                                    <option defaultValue=""> - Select one - </option>
                                    
                                    {/* Search in categories */}
                                    {props.prices.map((price: any, index) => {
                                        
                                        // The selected part, checks if the category is selected(this is for when
                                        // the website is refreshed for example)
                                        return (
                                            <option
                                                defaultValue={price.id}
                                                key={price.id}
                                                selected={false}
                                                // selected=property ? property.priceId == price.id ? true : false : null
                                            >
                                                {price.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        
                        {/* Extra characteristics */}
                        <div className="md:flex md:gap-4 space-y-6 md:space-y-0">
                            {/* Rooms */}
                            <div className="md:w-1/3">
                                <label
                                    htmlFor="rooms"
                                    className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                                >
                                    Rooms
                                </label>
                                <select
                                    name="rooms"
                                    id="rooms"
                                    className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400"
                                >
                                    {/* option(value=property ? property.rooms : "") - Select one -  */}
                                    <option defaultValue=""> - Select one - </option>
                                    
                                    {/* Create 10 option elements */}
                                    {Array.from({length: 10}, (_, i) => {
                                        const index = i + 1;
                                        return (
                                            <option defaultValue={index} key={index}>{index}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            
                            {/* Parking */}
                            <div className="md:w-1/3">
                                <label
                                    htmlFor="parking"
                                    className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                                >
                                    Parking slots
                                </label>
                                <select
                                    name="parking"
                                    id="parking"
                                    className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400"
                                >
                                    <option defaultValue=""> - Select one - </option>
                                    
                                    {/* Create 5 option elements */}
                                    {Array.from({ length: 5 }, (_, i) => {
                                        const index = i + 1;
                                        return (
                                            <option defaultValue={index} key={index}>{index}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            
                            {/* Bathrooms */}
                            <div className="md:w-1/3">
                                <label
                                    htmlFor="bathrooms"
                                    className="block text-sm uppercase text-gray-500 mb-2 font-bold"
                                >
                                    Bathrooms
                                </label>
                                <select
                                    name="bathrooms"
                                    id="bathrooms"
                                    className="w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400"
                                >
                                    <option defaultValue=""> - Select one - </option>
                                    
                                    {/* Create 5 option elements */}
                                    {Array.from({ length: 5 }, (_, i) => {
                                        const index = i + 1;
                                        return (
                                            <option defaultValue={index} key={index}>{index}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        
                        {/* Location information */}
                        <div className="border-gray-200 border-t py-5 space-y-5">
                            
                        </div>
                    </div>
                </form>
            </div>
            {/*
                        //- Location information
                        div.border-gray-200.border-t.py-5.space-y-5
                            //- Information
                            h3.text-lg.leading-6.font-medium.text-gray-900 Location
                            p.text-gray-600 Locate the property on the map
                            
                            //- Show map
                            #map.h-96
                            
                            //- Show the user the current street
                            div 
                                p#show_street.street=property ? property.street : ""
                            
                            //- Send information about the pin location to the backend
                            input(type="hidden" value=property ? property.street : "" name="street" id="street")
                            input(type="hidden" value=property ? property.latitude : "" name="latitude" id="latitude")
                            input(type="hidden" value=property ? property.longitude : "" name="longitude" id="longitude")
                        
                        //- Add image
                        input(
                            class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-bold uppercase cursor-pointer"
                            id="createProperty"
                            type="submit"
                            value="Add image"
                        ) */}
        </div>
    )
}
