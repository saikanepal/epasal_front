
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTimes } from 'react-icons/fa'; // Import FaTimes for the remove icon
import { useStore } from '../../Theme/Theme1/T1Context'; // Import the StoreContext
import { StarIcon } from '@heroicons/react/16/solid';
const SubProductCard1 = ({ product, handleStyleSelect, handleRemoveProduct }) => {
        // Component state
        const [selectedStyle, setSelectedStyle] = useState(0);
        const [addedToCart, setAddedToCart] = useState(false);
        const { store } = useStore(); // Access the store context
        const { previewMode } = store;
        useEffect(() => {
            // Check if the product is in the cart when the component mounts
            // This logic should be replaced with your actual implementation for checking the cart
            // For demonstration purposes, it's set to false by default
            setAddedToCart(false);
            console.log(previewMode);
        }, [product.id]);
    
        const handleAddToCart = () => {
            // This function should handle adding the product to the cart
            // For demonstration purposes, it just sets the addedToCart state to true
            setAddedToCart(true);
        };
    
        const handleSelectStyle = (styleIndex) => {
            setSelectedStyle(styleIndex);
            handleStyleSelect(product.id, styleIndex);
        };

       
  return (
    <motion.div
    className="flex flex-col md:flex-row items-center text-center md:text-left md:w-[402px] md:h-[216px] rounded overflow-hidden shadow-md cursor-pointer relative font-Roboto" // Add relative class
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    style={{ backgroundColor: store.color.subProductColor.backgroundColor, color: store.color.subProductColor.textColor, border: `2px solid ${store.color.subProductColor.borderColor}` }}
>
    {/* Add remove button/icon */}
    {!previewMode && (
        <button
            className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-10 text-white flex items-center justify-center" // Added flex and justify-center
            onClick={() => handleRemoveProduct(product.id)} // Call handleRemoveProduct on click
        >
            <FaTimes /> {/* Moved the FaTimes icon outside of the button text */}
        </button>
    )}


    <div className="relative w-[160px] h-[139px] flex ml-2 mt-5 md:mt-0">
        <motion.img
            className="w-full object-contain"
            src={product.image}
            alt={product.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        />
        
    </div>

    <div className="px-6 py-4 w-[280px]">
        <div className="font-bold text-base mt-3">{product.name}</div>
        <div className='flex mb-2 justify-center md:justify-start'>
        {[...Array(5)].map((_, index) => {
            if(index<product.rating)
                return <StarIcon className='w-4 h-4' style={{color:store.color.subProductColor.starColor}}/>
            else
                return <StarIcon className='w-4 h-4 text-[#959595]'/>
        })}
        </div>
        <div className='h-[56px] py-1 text-xs overflow-hidden'>{product.description}</div>
        <div className="mt-1">
            <div className="text-sm font-bold flex items-center gap-1 justify-between " >
                <div className=' h-10 text-base flex items-center' style={{color:`${store.color.subProductColor.priceColor}`}}>NRs. {product.variants[selectedStyle].prices[selectedStyle]}</div>
                {!addedToCart && (
                    <button
                        className="text-xs h-8 w-[80px] rounded mr-1"
                        onClick={handleAddToCart}
                        style={{backgroundColor:`${store.color.subProductColor.priceColor}`,color:`${store.color.subProductColor.priceLetterColor}`}}
                    >
                        Add to Cart
                    </button>
                )}
                {addedToCart && (
                    <button
                        className="text-green-200 text-xs px-2 h-10 cursor-not-allowed rounded px-8"
                        disabled
                        style={{backgroundColor:`${store.color.subProductColor.priceColor}`,color:`${store.color.subProductColor.priceLetterColor}`}}
                    >
                        <FaShoppingCart className="mr-1 text-green-800" />
                    </button>
                )}
            </div>
        </div>
    </div>
</motion.div>
  )
}

export default SubProductCard1