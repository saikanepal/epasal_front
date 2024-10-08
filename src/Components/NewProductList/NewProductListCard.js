import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NewProductListCard = ({ productListProps, handleRemoveProduct, product }) => {
    const { productColor, previewMode, addToCart, store, isEdit } = productListProps;
    const { cardBackground, textColor, priceColor, borderColor, buttonTextColor, buttonBgColor, buttonBgColorOnHover, heartColor, buttonBorderColor } = productColor;

    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [displayedImage, setDisplayedImage] = useState(product?.image?.imageUrl);
    const navigate = useNavigate();

    const getTruncateLength = (width) => {
        if (width < 640) return 50; // sm
        if (width < 1281) return 37; // md, lg
        return 50; // xl, 2xl
    };

    const [truncateLength, setTruncateLength] = useState(getTruncateLength(window.innerWidth));
    useEffect(() => {
        const handleResize = () => {
            setTruncateLength(getTruncateLength(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleProductClick = (product) => {
        localStorage.setItem('product', JSON.stringify(product));
        localStorage.setItem('store', JSON.stringify(store));

        if (store.fetchedFromBackend && !store.isEdit)
            navigate("/productlanding", { state: { product, store } })
    };

    const truncateName = (name, charLimit) => {
        if (name.length > charLimit) {
            return name.slice(0, charLimit) + '...';
        }
        return name;
    };

    if (!product) return null;

    const { id, name, image, variant } = product;
    const firstVariant = variant[0]; // Considering only the first variant
    const selectedOption = selectedOptionIndex === -1 ? null : firstVariant?.options[selectedOptionIndex];
    const price = selectedOption ? selectedOption.price : product.price || 0;
    const discount = selectedOption ? selectedOption.discount : product.discount || 0;

    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(index);
        setDisplayedImage(firstVariant?.options[index]?.image?.imageUrl);
    };

    const handleDefaultImage = () => {
        setSelectedOptionIndex(-1);
        setDisplayedImage(product?.image?.imageUrl);
    };

    const handleDeleteProduct = async () => {
        if (store?.isEdit) {
            handleRemoveProduct({ id: product._id, storeId: store._id })
        } else {
            handleRemoveProduct({ id: product.id })
        }
    };

    return (
        <motion.div
            className="font-roboto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden transform transition duration-300 relative border-solid border-2 w-full xl:w-[270px] h-full mx-auto flex flex-col"
            style={{ borderColor }}
            whileTap={{ scale: 0.98 }}
        >
            <div className="relative flex flex-col flex-grow">
                {!previewMode && (
                    <button
                        className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-10 text-white flex items-center justify-center"
                        onClick={() => handleDeleteProduct(product._id)}
                    >
                        <FaTimes />
                    </button>
                )}
                <div className="card cursor-pointer flex flex-col justify-center rounded-sm shadow-2xl w-full flex-grow" style={{ backgroundColor: cardBackground }}>
                    <button>
                        <img onClick={() => handleProductClick(product)} src={displayedImage} alt={name} className="w-[182px] h-[126px] md:w-[252px] md:h-[196px] object-contain rounded-t-lg mx-auto p-3" style={{ aspectRatio: '1/1' }} />
                    </button>
                    <div className="px-2 md:px-5 w-full flex-grow">
                        <hr className="border-t-2" style={{ borderColor: borderColor }} />
                        <div className="py-2 onClick={() => handleProductClick(product)}">
                            <p className="text-lg md:text-xl font-bold" style={{ color: textColor }}>{truncateName(name, 15)}</p>
                            <div className='flex md:flex-row justify-between'>
                                <p className="md:my-1 font-bold text-sm md:text-base" style={{ color: priceColor }}>Rs. {price - discount}</p>
                                {discount > 0 &&
                                    <del className='text-sm md:text-sm text-nowrap flex items-center' style={{ color: `${store.color.subProductColor.priceColor}` }}>Rs. {price}</del>
                                }
                            </div>
                        </div>
                        <div className="grid gap-3 relative w-full flex-grow">
                            <div className="flex">
                                <div
                                    className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
                                    onClick={handleDefaultImage}
                                >
                                    <img src={image?.imageUrl} alt="Default" className='md:w-[48px] md:h-[48px] w-[30px] h-[30px] me-2 object-contain' />
                                </div>
                                {firstVariant?.options?.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
                                        onClick={() => handleOptionSelect(index)}
                                    >
                                        {option?.image?.imageUrl &&
                                            <img src={option?.image?.imageUrl} alt={option.name} className='me-2 md:w-[48px] md:h-[48px] w-[30px] h-[30px]' />
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className="flex mb-3 md:mb-5 text-xl font-bold md:flex-row justify-between items-center text-gray-900">
                                <button style={{ color: buttonTextColor, borderColor: buttonBorderColor, backgroundColor: buttonBgColor }} className={`px-3 py-[6px] md:py-3 md:mt-2 text-xs transition ease-in duration-200 border-solid border rounded-md md:rounded-lg focus:outline-none addToCartBtn w-[100%]`}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonBgColorOnHover}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonBgColor}
                                    onClick={() => {
                                        handleProductClick(product);
                                    }}>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NewProductListCard;
