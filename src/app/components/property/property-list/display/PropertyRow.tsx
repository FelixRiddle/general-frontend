'use server';

import { PropertyCompleteType } from "felixriddle.good-roots-ts-api";

export default async function PropertyRow({ property }: {
    property: PropertyCompleteType,
}) {
    return (
        <div>
            {/* Display row */}
            <div ></div>
            {/* //- Display row
            div(
                class="p-6 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-8 md:space-y-0 gap-4"
                id=property.id
            )
                //- Property image
                include ./property-image
                
                //- Property information
                div(class="sm:w-2/4 md:w-3/6 lg:w-4/6 space-y-3")
                    //- Property title
                    a(
                        class="block text-2xl font-extrabold text-indigo-600 truncate"
                        id=`propertyView_${property.id}`
                        href=`#`
                        target="_blank"
                    )= property.title
                    
                    //- Property name
                    p(class="text-sm text-black font-bold")= property.category.name
                    
                    //- Property price
                    p(class="text-sm text-gray-500 font-bold flex items-center")
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clip-rule="evenodd" />
                        </svg>
                        = property.price.name
                
                //- Edit property
                div(class="sm:w-1/4 md:w-2/6 lg:flex-1 flex flex-col gap-2 lg:flex-row")
                    //- Set published
                    form(action="#") 
                        input(
                            type="submit"
                            class=`px-2 py-2 md:py-1 text-ms leading-5 font-semibold rounded cursor-pointer w-full ${property.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`
                            value=`${property.published ? "Published" : "Not published"}`
                        )
                    
                    //- Edit property
                    a(
                        href=`/user/property/edit/${property.id}`
                        class="px-2 py-2 md:py-1 text-ms leading-5 font-semibold rounded cursor-pointer bg-indigo-100 text-indigo-800 text-center"
                    ) Edit
                    
                    //- Delete
                    //- form(method="post" action=`/user/property/delete/${property.id}`) 
                    input(
                        type="submit"
                        class=`px-2 py-2 md:py-1 text-ms leading-5 font-semibold rounded cursor-pointer bg-red-100 text-red-800 w-full`
                        id=`deleteProperty_${property.id}`
                        value=`Delete`
                    ) */}


        </div>
    )
}
