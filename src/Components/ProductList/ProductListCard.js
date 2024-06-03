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
        buttonTextColor,
        textColor,
        borderColor,
        buttonBgColor,
        priceColor,
        heartColor,
        headerColor,
        buttonBgColorOnHover
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
            className="font-roboto rounded-lg overflow-hidden hover:shadow-[0px_1px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] transform transition duration-300 relative border-solid border-2 w-full xl:w-[270px] h-[372px] mx-auto"
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
                    <div className="card cursor-pointer flex flex-col gap-2 justify-center bg-white rounded-xl shadow-2xl w-full">
                        <div>
                            <img src={image} alt={name} className="w-[252px] h-[196px] object-contain mx-auto" style={{ aspectRatio: '1/1' }} />
                        </div>
                        <div className="px-5 w-full">
                            <hr className="border-t-2" style={{ borderColor }} />
                            <div className="prod-title mt-2 flex justify-between items-center">
                                <p className="text-2xl font-bold" style={{ color: textColor }}>{name}</p>
                                <p className="font-bold" style={{ color: priceColor }}>Rs {price}</p>
                            </div>
                            <div className="grid gap-2 relative w-full">
                                <div className="flex mt-5">
                                    {variants.map((variant, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer text-sm sm:text-base ${selectedVariantIndex === index ? 'font-bold' : ''} rounded-md`}
                                            onClick={() => handleVariantSelect(index)}
                                        >
                                            <img src={variant.option} alt="" style={{ height: "48px", width: "48px" }} className='me-2' />
                                        </div>
                                    ))}
                                </div>
                                <div className='absolute right-1 top-1'>
                                    <FaHeart style={{ color: heartColor }} size={15} />
                                </div>
                                <div className="flex mb-5 text-xl font-bold md:flex-row justify-between items-center text-gray-900">
                                    <button className="py-2 transition ease-in duration-200 border-nore focus:outline-none">
                                        <div style={{ color: priceColor }} className="flex gap-1 text-xs items-center">
                                            Learn More <IoIosArrowForward />
                                        </div>
                                    </button>
                                    <button style={{ color: buttonTextColor, borderColor: textColor, backgroundColor: buttonBgColor }} className={`px-3 py-1 text-xs transition ease-in duration-200 border-solid border rounded-sm focus:outline-none addToCartBtn`}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonBgColorOnHover}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonBgColor} >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div >

    );
};

export default ProductListCard;

