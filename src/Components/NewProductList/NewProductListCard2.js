import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useStore } from '../../Theme/ThemeContext'; // Import the StoreContext
import { StarIcon } from '@heroicons/react/16/solid';
import useFetch from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const NewProductListCard2 = ({ product, handleStyleSelect, handleRemoveProduct, store }) => {
    const [addedToCart, setAddedToCart] = useState(false);
    const { previewMode, isEdit } = store;
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const navigate = useNavigate()


    const handleProductClick = (product) => {
        localStorage.setItem('product', JSON.stringify(product));
        localStorage.setItem('store', JSON.stringify(store));

        if (store.fetchedFromBackend && !store.isEdit)
            navigate("/productlanding", { state: { product, store } })
    };

    useEffect(() => {
        setAddedToCart(false);
    }, [product.id]);

    const handleAddToCart = () => {
        setAddedToCart(true);
    };

    const handleDeleteProduct = async () => {
        if (isEdit) {
            handleRemoveProduct({ id: product._id, storeId: store._id });
        } else {
            handleRemoveProduct({ id: product.id });
        }
    };

    const truncateName = (name, charLimit) => {
        if (name.length > charLimit) {
            return name.slice(0, charLimit) + '...';
        }
        return name;
    };


    // Function to limit text to a certain number of words
    const limitDescription = (description, limit = 20) => {
        const words = description.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return description;
    };

    return (
        <motion.div
            className="product-card w-full md:w-[300px] rounded-lg shadow-xl overflow-hidden cursor-pointer snap-start shrink-0 p-2 py-5 md:py-8 md:px-4  flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{ backgroundColor: store.color.newProductColor.cardBackground, color: store.color.newProductColor.textColor, border: `2px solid ${store.color.newProductColor.borderColor}` }}
        >
            {(!previewMode || isEdit) && (
                <button
                    className="absolute top-2 right-2 p-2 rounded-full bg-red-500 flex items-center justify-center"
                    onClick={handleDeleteProduct}
                    style={{
                        backgroundColor: store.color.newProductColor.deleteButtonBackground,
                    }}
                >
                    <FaTimes />
                </button>
            )}
            <div className="para uppercase text-center leading-none">
                <p
                    style={{
                        WebkitTextStroke: `1px ${store.color.newProductColor.strokeColor}`,
                        WebkitTextFillColor: 'transparent',
                    }}
                    className="z-10 font-bold text-sm md:text-lg -mb-5 tracking-wider "
                >
                </p>
                <p className="font-bold text-sm md:text-xl mt-1">
                    {truncateName(product.name, 15)}
                </p>
            </div>
            <div
                className="w-[180px] md:aspect-square relative after:absolute after:h-1 after:w-full after:opacity-0 after:bg-[#7b956a] after:top-8 after:left-0 after:group-hover:opacity-100 after:translate-x-1/2 after:translate-y-1/2 after:-z-20 after:group-hover:w-full after:transition-all after:duration-300 after:group-hover:origin-right after:group-hover:-translate-x-1/2 group-hover:translate-x-1/2 transition-all duration-300"
                style={{
                    backgroundColor: store.color.newProductColor.aspectBackground,
                }}
            >
                <div onClick={() => handleProductClick(product)}>
                    <img
                        src={product.image.imageUrl}
                        alt={product.name}
                        className="object-cover rounded-t-lg w-full h-[140px] md:h-[180px]"
                    />
                </div>
                <div
                    className="tooltips absolute top-0 left-6 -translate-x-[150%] p-2 flex flex-col items-start gap-5 transition-all duration-300 group-hover:-translate-x-full"
                >
                    <p
                        className=" pl-2 font-semibold text-xl uppercase group-hover:delay-1000 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                        style={{
                            color: store.color.subProductColor.textColor,
                        }}
                    >
                        {product.subcategories[0]}
                    </p>
                    <ul className="flex flex-col items-start gap-2">
                        <li
                            className="inline-flex gap-2 items-center justify-center group-hover:delay-200 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500"
                        >
                            <svg
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="3"
                                className="stroke-[#495c48]"
                                stroke="#000000"
                                fill="none"
                                viewBox="0 0 24 24"
                                height="10"
                                width="10"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <p className="text-xs break-words font-semibold">
                                {limitDescription(product.description, 15)}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex w-full md:flex-col items-center justify-between px-1 gap-4 md:gap-2 mt-2">
                <p className="text-sm md:text-lg font-semibold " style={{ color: `${store.color.newProductColor.priceColor}` }} >Rs {product.price - product.discount}</p>
                <del className="text-sm md:text-base "> Rs {product.price}</del>
            </div>
            <button
                style={{ backgroundColor: `${store.color.newProductColor.buttonBgColor}`, color: `${store.color.newProductColor.buttonTextColor}`, }}
                className="py-2 px-6 text-xs md:text-base rounded-full w-full  duration-300 mt-1 md:mt-4"

                onClick={() => {
                    handleProductClick(product)
                }}
            >
                Add to cart
            </button>

        </motion.div>
    );
}

export default NewProductListCard2;
