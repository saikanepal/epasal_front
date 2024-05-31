import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../Theme/Theme1/T1Context';
import { FaHeart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

import { FaTimes } from 'react-icons/fa'; // Import FaTimes for the remove icon

const ProductListCard = ({ product, handleDeleteProduct }) => {
    const [addedToCart, setAddedToCart] = useState(false);

    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const { store } = useStore();
    const { previewMode } = store;

    const {
        backgroundColor,
        textColor,
        borderColor,
        buttonBackgroundColor,
        priceColor
    } = store.color.productListColor; // Use productListColor values

    if (!product) return null;

    const { id, image, name, variants } = product;

    const handleVariantSelect = (index) => {
        setSelectedVariantIndex(index);
    };

    const handleAddToCart = () => {
        // This function should handle adding the product to the cart
        // For demonstration purposes, it just sets the addedToCart state to true
        setAddedToCart(true);
    };
    const price = variants[selectedVariantIndex]?.prices[0] || 0;

    return (
        <motion.div
            className="font-roboto rounded-lg overflow-hidden hover:shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] cursor-pointer transform transition duration-300 relative border-solid border-2"
            style={{ borderColor }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="w-full">
                <div className="relative w-full">
                    {!previewMode && (
                        <button
                            className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-10 text-white flex items-center justify-center"
                            onClick={() => handleDeleteProduct(product.id)}
                        >
                            <FaTimes />
                        </button>
                    )}
                    <div className="card flex flex-col justify-center bg-white rounded-xl shadow-2xl w-full">
                        <div>
                            <img src={image} alt={name} className="w-full h-full object-cover" style={{ aspectRatio: '1/1' }} />
                        </div>
                        <div className="px-5 w-full">
                            <hr className="border-t-2" style={{ borderColor }} />
                            <div className="prod-title mt-4 flex justify-between items-center">
                                <p className="text-4xl font-bold" style={{ color: textColor }}>{name}</p>
                                <p className="font-bold text-2xl" style={{ color: priceColor }}>Rs {price}</p>
                            </div>
                            <div className="grid gap-6 relative w-full">
                                <div className="flex mt-5">
                                    {variants.map((variant, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer text-sm sm:text-base ${selectedVariantIndex === index ? 'font-bold' : ''} rounded-md`}
                                            onClick={() => handleVariantSelect(index)}
                                        >
                                            <img src={variant.option} alt="" style={{ height: "60px", width: "60px" }} className='me-2' />
                                        </div>
                                    ))}
                                </div>
                                <div className='absolute right-1 top-7'>
                                    <FaHeart style={{ color: textColor }} size={25} />
                                </div>
                                <div style={{ color: textColor }} className="flex flex-col mb-5 text-xl font-bold md:flex-row justify-between items-center text-gray-900">
                                    <button className="py-2 transition ease-in duration-200 border-nore focus:outline-none">
                                        <div className="flex gap-1 items-center">
                                            Learn More <IoIosArrowForward size={20} />
                                        </div>
                                    </button>
                                    <button style={{ color: textColor, borderColor: textColor, backgroundColor: buttonBackgroundColor }} className="px-3 py-2 transition ease-in duration-200 border-solid border-2 rounded-lg focus:outline-none">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>


    );
};

export default ProductListCard;

// import React from 'react';
// import { FaHeart } from 'react-icons/fa';
// import { IoIosArrowForward } from 'react-icons/io';

// const ShoppingCard = () => {
//     const product = {
//         id: 1,
//         name: 'Cute Product',
//         price: '999',
//         image: 'https://w7.pngwing.com/pngs/416/422/png-transparent-wrist-watch.png',
//         variant1: 'https://w7.pngwing.com/pngs/416/422/png-transparent-wrist-watch.png',
//         variant2: 'https://w7.pngwing.com/pngs/416/422/png-transparent-wrist-watch.png'
//     };

//     const handleLearnMore = (productId) => {
//         console.log('Learn more about product', productId);
//     };

//     const handleAddToCart = (productId) => {
//         console.log('Add product to cart', productId);
//     };
//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-100">

//             <div className="rounded overflow-hidden shadow-lg bg-white p-4">
//                 <div className="relative">
//                     <img className="w-full h-64 object-cover" src={product.image} alt={product.name} />
//                     <div className="absolute top-2 right-2">
//                         <FaHeart className="text-red-500" size={25} />
//                     </div>
//                 </div>
//                 <div className="py-4">
//                     <div className="flex justify-between items-center mb-2">
//                         <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
//                         <span className="text-xl font-bold text-gray-900">Rs {product.price}</span>
//                     </div>
//                     <div className="flex justify-between mb-4">
//                         <img className="w-16 h-16 object-cover" src={product.variant1} alt="Variant 1" />
//                         <img className="w-16 h-16 object-cover" src={product.variant2} alt="Variant 2" />
//                     </div>
//                     <div className="flex justify-between items-center">
//                         <button
//                             className="flex items-center gap-2 py-2 px-4 border rounded text-blue-500 border-blue-500 transition duration-200 ease-in-out hover:bg-blue-500 hover:text-white"
//                         // onClick={() => onLearnMore(product.id)}
//                         >
//                             Learn More <IoIosArrowForward />
//                         </button>
//                         <button
//                             className="py-2 px-4 bg-blue-500 text-white rounded transition duration-200 ease-in-out hover:bg-blue-600"
//                         // onClick={() => onAddToCart(product.id)}
//                         >
//                             Add to cart
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShoppingCard;






