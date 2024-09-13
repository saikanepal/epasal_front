
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaTimes } from 'react-icons/fa'; // Import FaTimes for the remove icon
import { StarIcon } from '@heroicons/react/16/solid';

import useFetch from '../../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import TransparantFilter from '../../../Assets/TransparantFilter.png'
const SubProductCard1 = ({ product, handleStyleSelect, handleRemoveProduct, store,handleAddToCartAnalytics }) => {
    // Component state
    const [selectedStyle, setSelectedStyle] = useState(0);
    const [selectedOption, setSelectedOption] = useState(0)
    const [addedToCart, setAddedToCart] = useState(false);
    const { previewMode, isEdit } = store;
    const { isLoading, error, sendRequest, onCloseError } = useFetch()
    const navigate = useNavigate()


    const getTruncateLength = (width) => {
        if (width < 640) return 15; // sm
        if (width < 1281) return 15; // md, lg
        return 30; // xl, 2xl
    };
    const getTruncateLength1 = (width) => {
        if (width < 640) return 40; // sm
        if (width < 1281) return 40; // md, lg
        return 50; // xl, 2xl
    };
    const [truncateLength, setTruncateLength] = useState(getTruncateLength(window.innerWidth));
    const [truncateLength1, setTruncateLength1] = useState(getTruncateLength(window.innerWidth));
    useEffect(() => {
        const handleResize = () => {
            setTruncateLength(getTruncateLength(window.innerWidth));
            setTruncateLength1(getTruncateLength1(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const truncateName = (name) => {
        return name.length > truncateLength ? name.slice(0, truncateLength) + '...' : name;
    };
    const truncateName1 = (detail) => {
        return detail.length > truncateLength1 ? detail.slice(0, truncateLength1) + '...' : detail;
    };
    useEffect(() => {
        // Check if the product is in the cart when the component mounts
        // This logic should be replaced with your actual implementation for checking the cart
        // For demonstration purposes, it's set to false by default
        setAddedToCart(false);
       
    }, [product.id]);

    const handleAddToCart = () => {
        // This function should handle adding the product to the cart
        // For demonstration purposes, it just sets the addedToCart state to true
        //handle add to cart analytics should be done
        setAddedToCart(true);
    };

    const handleSelectStyle = (styleIndex) => {
        setSelectedStyle(styleIndex);
        handleStyleSelect(product.id, styleIndex);
    };

    const handleDeleteProduct = async () => {
        if (isEdit) {
            // const responseData = await sendRequest(
            //     'product/deleteProduct',
            //     'POST',
            //     JSON.stringify({
            //         id:product._id, storeId:store._id
            //     }),
            //     {
            //         'Content-Type': 'application/json' 
            //     }
            // );
            handleRemoveProduct({ id: product._id, storeId: store._id })
        } else {
            handleRemoveProduct({ id: product.id })
        }
    }

    const handleProductClick = (product) => {
        localStorage.setItem('product', JSON.stringify(product));
        localStorage.setItem('store', JSON.stringify(store));

        if (store.fetchedFromBackend && !store.isEdit){
            handleAddToCartAnalytics(product._id)
            navigate("/productlanding", { state: { product, store } })
        }
    };

    return (
        <motion.div
            className="  flex flex-col md:flex-row items-center md:text-left w-[288px] h-[360px] rounded-lg overflow-hidden shadow-md cursor-pointer relative " // Add relative class
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{ backgroundColor: store.color.subProductColor.backgroundColor, color: store.color.subProductColor.textColor, border: `2px solid ${store.color.subProductColor.borderColor}` }}
        >
            {/* Add remove button/icon */}
            {(!previewMode) && (
                <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-10 text-white flex items-center justify-center" // Added flex and justify-center
                    onClick={handleDeleteProduct} // Call handleRemoveProduct on click
                >
                    <FaTimes />
                </button>
            )}


            <div className="absolute bottom-0 left-0 w-full h-1/2 flex z-20" onClick={() => handleProductClick(product)}>
                <motion.img
                    className="w-full sm:h-full"
                    src={TransparantFilter}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleProductClick(product)}
                />
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex" onClick={() => handleProductClick(product)}>
                <motion.img
                    className="w-full sm:h-full"
                    src={product?.image?.imageUrl}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleProductClick(product)}
                />
            </div>

            <div className="absolute bottom-0 left-0 z-30 px-10 py-4 w-full flex items-end justify-between" >
                <div>
                    <div className="font-bold mt-2 md:mt-3 text-[14px]">{truncateName(product.name)}</div>
                    <div className=' flex flex-col gap-0 '>
                            <div className=' text-[20px] font-bold md:text-md  flex text-nowrap items-center' style={{ color: `${store.color.subProductColor.priceColor}` }}>NRs. {product?.price - product?.discount}</div>
                    </div>
                </div>                
                        
                        <button
                            className="text-xs h-[40px] w-[40px] rounded-full flex items-center justify-center "
                            onClick={() => {
                                handleProductClick(product)
                            }}
                            style={{ backgroundColor: `${store.color.subProductColor.buttonColor}`, color: `${store.color.subProductColor.priceLetterColor}` }}
                        >
                            <FaShoppingBag className='h-[19px]'/>
                        </button>

            </div>
        </motion.div>
    )
}

export default SubProductCard1