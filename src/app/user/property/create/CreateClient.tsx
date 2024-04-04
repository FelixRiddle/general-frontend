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
            {/* TODO: Property draft table, in which drafts are created and updated each time the form changes.
            Maybe add a little delay between actions to prevent many requests */}
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
                            {/* Information */}
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Location</h3>
                            <p className="text-gray-600">Locate this property on the map</p>
                            
                            {/* Show map */}
                            <div id="map" className="h-96">
                            </div>
                            
                            {/* Show the user current street */}
                            {/* p#show_street.street=property ? property.street : "" */}
                            <div id="show_street" className="street"></div>
                            
                            {/* Send information about the pin location to the backend */}
                            <input type="hidden" defaultValue="" id="street" name="street"/>
                            <input type="hidden" defaultValue="" id="latitude" name="latitude"/>
                            <input type="hidden" defaultValue="" id="longitude" name="longitude"/>
                        </div>
                        
                        <input
                            className="w-full py-3 bg-pink-400 hover:bg-pink-600 rounded text-white font-bold uppercase cursor-pointer"
                            id="createProperty"
                            type="submit"
                            defaultValue="Publish property"
                        />
                    </div>
                </form>
            </div>
            
            {/* Images */}
            <div className="bg-white shadow py-8 px-4 rounded mx-auto max-width max-w-2xl my-10 md:px-10">
                <form
                    id="publishImage"
                    className="m-4 p-4 border-dashed border-2 w-full min:h-96 h-auto rounded flex-col justify-center items-center"
                    method="POST"
                    action={`/user/property/images/set_image/${"PROPERTY_ID"}`}
                    encType="multipart/form-data"
                >
                    {/* Information */}
                    <div className="space-y-8">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Select images
                        </h3>
                        <p className="text-gray-600">Select one or more images for the property</p>
                    </div>
                    
                    {/* Why there are two inputs is beyond me */}
                    {/* Input */}
                    <input
                        type="file"
                        multiple={true}
                        id="images"
                        name="images"
                        accept="image/jpeg, image/png, image/jpg"
                    />
                    
                    {/* Images preview */}
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Images</h3>
                    <div id="imagesView">
                        
                    </div>
                </form>
                {/*
                        h3.text-lg.leading-6.font-medium.text-gray-900 Images
                        div#imagesView
                            - for (var x = 0; x < 10; x++)
                                div(class="rounded")
                                    //- Remove icon(a cross)
                                    img(id=`image_${x}_remove_icon` src="" hidden
                                        class=`remove_icon absolute hover:cursor-pointer`
                                        )
                                    
                                    img(class="image" id=`image_${x}` src="" hidden)
                        
                        //- Add image
                        input(
                            id="publish"
                            class="w-full mt-5 py-3 rounded text-white font-bold uppercase enabled:bg-indigo-600 enabled:hover:bg-indigo-700 enabled:cursor-pointer disabled:bg-gray-400"
                            type="submit"
                            value="Publish property"
                        ) */}
            </div>
        </div>
    )
}
