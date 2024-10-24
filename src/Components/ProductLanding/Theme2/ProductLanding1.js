import React, { useEffect, useState } from 'react';
import { TbShoppingBagPlus } from "react-icons/tb";
import { StarIcon } from '@heroicons/react/16/solid';
import ProductReview from '../ProductReview';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Allproducts/Navbar';
import { toast } from 'react-toastify';
import BreadCrumb from './Breadcrumb';

const ProjectLanding1 = ({ProductLandingProps}) => {
    const {store,setStore,product}=ProductLandingProps
    const navigate = useNavigate();
    const location = useLocation();
    
    const [selectedProduct, setSelectedProduct] = useState(() => {
        const storedProduct = localStorage.getItem('product');
        return product || (storedProduct ? JSON.parse(storedProduct) : null);
    });
    const [selectedVariants, setSelectedVariants] = useState(selectedProduct?.variant.map(() => -1) || []);
    const [displayedImage, setDisplayedImage] = useState(selectedProduct?.image?.imageUrl);
    const [productCount, setProductCount] = useState(1);





    const handleOptionSelect = (variantIndex, optionIndex) => {
        const newSelectedVariants = [...selectedVariants];
        newSelectedVariants[variantIndex] = optionIndex;
        setSelectedVariants(newSelectedVariants);

        const selectedOption = selectedProduct.variant[variantIndex]?.options[optionIndex]; // Use optional chaining
        if (variantIndex == 0) {
            setDisplayedImage(selectedOption?.image?.imageUrl || selectedProduct?.image?.imageUrl); // Check if selectedOption is defined
        }
    };

    const handleProductSelect = (newProduct) => {
        setSelectedProduct(newProduct);
        navigate(location.pathname, { state: { product: newProduct, store } });
        localStorage.setItem('product', JSON.stringify(newProduct));
        setDisplayedImage(newProduct?.image?.imageUrl);
    };


    const handleVariantChange = (variantIndex, optionName) => {
        const variant = selectedProduct.variant[variantIndex];
        const optionIndex = variant.options.findIndex(option => option?.name === optionName);
        handleOptionSelect(variantIndex, optionIndex);
    };

    const incrementQuantity = () => {
        setProductCount(prevCount => prevCount + 1);
    };

    const decrementQuantity = () => {
        setProductCount(prevCount => Math.max(1, prevCount - 1));
    };

    const handleAddToCart = () => {

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const selectedVariant = selectedProduct.variant.map((variant, index) => ({
            name: variant?.name,
            options: {
                name: variant?.options[selectedVariants[index]] ? variant?.options[selectedVariants[index]]?.name : 'default',
                image: variant?.options[selectedVariants[index]]?.image?.imageUrl
            }
        }));

        const newCartItem = {
            product: selectedProduct._id || product._id,
            productName: selectedProduct?.name,
            price: calculateTotalPrice(),
            discountAmount: calculateTotalDiscount(),
            count: productCount,
            selectedVariant: selectedVariant,
            productImage: selectedVariant[0]?.options?.image || selectedProduct?.image?.imageUrl
        };

        cart.push(newCartItem);

        // Update local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update store state
        setStore(prevStore => {
            const updatedCart = [...(prevStore.cart || []), newCartItem];
            const updatedStore = { ...prevStore, cart: updatedCart };
            localStorage.setItem('store', JSON.stringify(updatedStore));
            return updatedStore;
        });



        toast.success("Product Added To Cart", {
            position: "top-center",
            pauseOnFocusLoss: false,
            pauseOnHover: false
        })
    };




    const calculateTotalPrice = () => {
        if (!selectedProduct.variant || selectedProduct.variant.length === 0 || selectedVariants[0] < 0) {
            // Handle products without variants or unselected variants
            const basePrice = parseFloat(selectedProduct.price) || 0;
            const discount = parseFloat(selectedProduct.discount) || 0;


            return basePrice - discount;
        } else {
            // Handle products with variants
            const selectedOptionIndex = selectedVariants[0];
            const selectedVariant = selectedProduct.variant[selectedOptionIndex];

            if (selectedVariant && selectedVariant?.options && selectedVariant?.options[selectedOptionIndex]?.price) {
                return parseFloat(selectedVariant?.options[selectedOptionIndex].price - selectedVariant?.options[selectedOptionIndex].discount);
            } else {
                return selectedProduct.variant.reduce((total, variant, index) => {
                    const selectedOptionIndex = selectedVariants[index];
                    const selectedOption = variant?.options[selectedOptionIndex];
                    const basePrice = parseFloat(selectedProduct.price) || 0;
                    const variantPrice = selectedOption ? parseFloat(selectedOption.price) : 0;
                    const discount = parseFloat(selectedProduct.discount) || 0;
                    const variantDiscount = selectedOption && parseFloat(selectedOption.discount) || 0;

                    // Calculate the effective price for the current variant selection
                    const effectivePrice = variantPrice > 0 ? variantPrice - variantDiscount : basePrice - discount;

                    // Add to the total price
                    return effectivePrice;
                }, 0);
            }
        }
    };

    const changeDefaultImage = () => {
        setSelectedVariants(selectedProduct.variant.map(() => -1))

        setDisplayedImage(selectedProduct?.image?.imageUrl)
    }

    const calculateTotalDiscount = () => {
        if (!selectedProduct.variant || selectedProduct.variant.length === 0) {
            // Handle products without variants
            return parseFloat(selectedProduct.discount) || 0;
        } else {
            // Handle products with variants
            return selectedProduct.variant.reduce((total, variant, index) => {
                // Check if index is 0 (first variant)
                if (index === 0) {
                    const selectedOptionIndex = selectedVariants[index];
                    const selectedOption = variant?.options[selectedOptionIndex];
                    // Calculate discount based on selected variant option
                    return total + (selectedOption ? parseFloat(selectedOption.discount) || 0 : parseFloat(selectedProduct.discount) || 0);
                } else {
                    // For other variants, do not calculate discount
                    return total;
                }
            }, 0);
        }
    };

    useEffect(() => {
        if (selectedProduct) {
            localStorage.setItem('product', JSON.stringify(selectedProduct));
        }
        window.scrollTo(0, 0);
    }, [selectedProduct]);


    const totalPrice = calculateTotalPrice() * productCount;

    const totalDiscount = calculateTotalDiscount() * productCount;
    const storeDetails = {
        deliveryCharge: store.expectedDeliveryPrice,
        COD: "available",
        deliveryTime: store.expectedDeliveryTime,

    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar store={store} setStore={setStore} color={store.color} />
            
            <div className="px-4 py-16 lg:px-14">
            <BreadCrumb prodName={selectedProduct?.name} storeName={store?.name}/>
                <div className=" flex flex-col gap-10">
                    <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
                        {/* shadow-lg shadow-stone-400 removed */}
                        <div className="w-full flex flex-col gap-8 p-6 bg-white rounded-lg transition-shadow duration-300">
                            <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
                                <div className="flex flex-col-reverse gap-7 lg:gap-10">
                                    <div className="flex flex-row md:flex-col gap-3">
                                        {selectedProduct?.image && (
                                            <div
                                                className={`cursor-pointer text-sm lg:text-base ${selectedVariants?.every(index => index === -1) ? 'font-bold' : ''} rounded-md`}
                                                onClick={changeDefaultImage}
                                            >
                                                <img src={selectedProduct?.image?.imageUrl} alt="Default" className="w-16 h-16 md:w-14 md:h-14 lg:w-24 lg:h-24  rounded-md object-cover transition-transform duration-300 hover:scale-105" />
                                            </div>
                                        )}
                                        {
                                            selectedProduct?.imageList && (
                                                selectedProduct?.imageList?.map(listImage=>(
                                                    <div
                                                        className={`cursor-pointer text-sm lg:text-base ${selectedVariants?.every(index => index === -1) ? 'font-bold' : ''} rounded-md`}
                                                        onClick={changeDefaultImage}
                                                    >
                                                        <img src={listImage.imageUrl} alt="Default" className="w-16 h-16 md:w-14 md:h-14 lg:w-24 lg:h-24  rounded-md object-cover transition-transform duration-300 hover:scale-105" />
                                                    </div>
                                                ))
                                            )
                                        }
                                        
                                    </div>
                                    <div className='md:w-[350px] h-[400px] lg:w-[450px] lg:h-[450px] 2xl:w-[550px] 2xl:h-[550px] overflow-hidden rounded-xl'>
                                        <img
                                            src={displayedImage}
                                            alt={selectedProduct?.name}
                                            className="w-full h-full object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 w-full">
                                    <h1 className="text-xl md:text-2xl lg:text-[24px] 2xl:text-4xl font-bold text-[#515151] ">{selectedProduct?.name}</h1>
                                    
                                    <div className="flex gap-4 items-center">
                                        <span className="text-xl md:text-2xl lg:text-[40px] font-semibold text-[#515151]">Rs {totalPrice}</span>
                                        <span className="line-through text-sm md:text-base lg:text-xl 2xl:text-xl text-[#515151]">Rs {totalDiscount + totalPrice}</span>
                                    </div>
                                    <div >
                                    <div className="block text-base lg:text-lg 2xl:text-xl text-[#7A5822] flex gap-4">
                                        <div>{selectedProduct.variant[0]?.name}:</div> 
                                        <div>{selectedProduct.variant[0]?.options[selectedVariants[0]]?.name || ''}</div>
                                    </div>
                                    <div className='flex gap-2'>
                                        {selectedProduct.variant.map((variant, variantIndex) => (
                                            variantIndex === 0 &&
                                            selectedProduct.variant[0]?.options.map((option, optionIndex) => (
                                                <div
                                                    key={`${variantIndex}-${optionIndex}`}
                                                    className={`cursor-pointer text-sm lg:text-base ${selectedVariants[variantIndex] === optionIndex ? 'font-bold' : ''} rounded-md`}
                                                    onClick={() => handleOptionSelect(variantIndex, optionIndex)}
                                                >
                                                    {option?.image?.imageUrl && <img src={option?.image?.imageUrl} alt={option?.name} className="w-16 h-16 lg:w-20 lg:h-20 rounded-md object-cover transition-transform duration-300 hover:scale-105" />}
                                                </div>
                                            ))
                                        ))}
                                    </div>
                                    </div>
                                    <div className="flex flex-row md:flex-col gap-4">

                                        {selectedProduct.variant.map((variant, variantIndex) => variantIndex!==0 && (
                                            <div className="flex flex-col gap-2 2xl:text-xl" key={variantIndex}>
                                                <label htmlFor={`variant-${variantIndex}`} className="block text-base lg:text-lg 2xl:text-xl text-[#7A5822]">{variant?.name}:</label>
                                                
                                                <div className='text-white flex gap-2'>
                                                {variant?.options?.map((option, optionIndex) => (
                                                        <button key={optionIndex} value={option?.name} onClick={(e) => handleVariantChange(variantIndex, option?.name)} className=' px-5 py-2 bg-[#A2A2A2] rounded-lg'>{option?.name}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="quantity" className="block text-base     lg:text-lg 2xl:text-xl text-[#515151]">Quantity:</label>
                                            <div className="flex items-center justify-between w-36 gap-3 bg-[#A2A2A2] rounded-xl px-3 2xl:px-4 py-1 text-white">
                                                <button
                                                    className="text-2xl focus:outline-none transition duration-200"
                                                    onClick={decrementQuantity}
                                                >
                                                    -
                                                </button>
                                                <span className="text-base lg:text-lg 2xl:text-xl font-medium">{productCount}</span>
                                                <button
                                                    className="text-2xl 2xl:text-3xl focus:outline-none transition duration-200"
                                                    onClick={incrementQuantity}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={handleAddToCart} className="w-full md:w-3/4 text-[20px] flex items-center justify-center gap-3 mt-4 2xl:mt-7 py-4  text-white rounded-xl transition duration-300 bg-[#585858]">
                                        Add to Cart
                                        <TbShoppingBagPlus className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col gap-6 mt-12">
                        <ProductReview product={selectedProduct} />
                    </div>
                </div>
            </div>
        </div>

    );

};

export default ProjectLanding1;
