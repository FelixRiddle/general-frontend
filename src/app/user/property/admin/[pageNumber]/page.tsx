'use server';

import Link from "next/link";

import PageTitle from "@/app/components/PageTitle";
import Navbar from "@/app/components/navigation/Navbar";
import { pageNumberOrRedirectTo } from "@/lib/router/path/pageNumber";
import { userVanguard } from "@/lib/router/userVanguard";

/**
 * Admin page
 * 
 * @returns 
 */
export default async function Admin({ params }: { params: { pageNumber: string } }) {
    // Get user or redirect somewhere else, this is private property.
    const user = await userVanguard();
    
    console.log(`Params: `, params);
    
    const properties = [];
    
    const failureRedirect = `/user/property/admin`;
    
    // Get page number
    const pageNumber = pageNumberOrRedirectTo(params, failureRedirect);
    
    // // User data
    // const { id: userId } = req.user;
    
    // // Limit and skips
    // const limit = 10;
    // const skip = ((page * limit) - limit);
    
    // // Fetch properties from the database that are owned by this user
    // const propModel = new Property();
    // const categoryModel = new Category();
    // const priceModel = new Price();
    // const [propertiesRes, total] = await Promise.all([
    //     propModel.findAll({
    //         limit,
    //         offset: skip,
    //         where: {
    //             userId,
    //         },
    //         include: [
    //             {
    //                 raw: true,
    //                 model: categoryModel,
    //                 as: 'category'
    //             }, {
    //                 raw: true,
    //                 model: priceModel,
    //                 as: "price"
    //             }
    //         ]
    //     }),
    //     // Get the quantity of user properties
    //     propModel.count({
    //         where: {
    //             userId,
    //         },
    //     })
    // ]);
    
    // // Thanks sensei for this incredible response
    // // https://stackoverflow.com/questions/64546830/sequelize-how-to-eager-load-with-associations-raw-true
    // const properties = propertiesRes.map(x => x.get({ plain: true }));
    
    // try {
    //     // Get property images
    //     for(let property of properties) {
    //         // Get the property images relative to the public path
    //         let propertyImages = relativePropertyImages(userId, property.id);
            
    //         property.imagesRelativeURI = propertyImages;
    //     }
    // } catch(err) {
    //     // console.log(`Error:`)
    //     // console.error(err);
    //     // console.log(`The property folder for the user may not exist!`);
    //     // console.log(`This just means that the user doesn't have any properties`);
    // }
    
    // const expanded = expand(req);
    // // return res.render("user/property/admin", {
    // //     page: "My Properties",
    // //     properties,
    // //     // Total pages
    // //     pages: Math.ceil(total / limit),
    // //     // Other
    // //     currentPage: Number(page),
    // //     total,
    // //     offset: skip,
    // //     limit,
    // //     ...expanded,
    // // });
    
    return (
        <div>
            <Navbar />
            <PageTitle />
            
            <Link
                href="/user/property/create"
                className="rounded p-4 bg-pink-500 hover:bg-pink-600 text-sm font-bold text-center text-white uppercase my-5 block"
            >
                Create new property
            </Link>
            
            {properties.length > 0 && (
                <div className="bg-white shadow rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        
                    </ul>
                </div>
            ) || (
                <div>
                    There are no properties
                </div>
            )}
        </div>
    );
}

