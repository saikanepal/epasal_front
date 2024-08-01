
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaArrowRightLong } from 'react-icons/fa6';
// import { TbShoppingBagPlus } from 'react-icons/tb';
// import { useNavigate } from 'react-router-dom';
// import { FaTimes } from 'react-icons/fa';

// const IconButton = ({ Icon, bgColor, textColor, borderColor, hoverBgColor }) => (
//     <Icon
//         className="text-[16px] md:text-[24px] mr-[10px] rounded-full p-[2px] border-solid border-[1px]"
//         style={{ backgroundColor: bgColor, color: textColor, borderColor: borderColor ,buttonBgColorOnHover:hoverBgColor }}
//         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBgColor)}
//         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
//     />
// );

// const NewProductListCard4 = ({ productListProps, handleRemoveProduct, product }) => {
//     const { productColor, previewMode, addToCart, store, isEdit } = productListProps;
//     const {backgroundColor, cardBackground, borderColor, textColor, priceColor, buttonBgColor, buttonTextColor, buttonBorderColor, buttonBgColorOnHover } = productColor;

//     const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
//     const [displayedImage, setDisplayedImage] = useState(product?.image?.imageUrl);
//     const navigate = useNavigate();

//     const getTruncateLength = (width) => {
//         if (width < 640) return 50; // sm
//         if (width < 1281) return 37; // md, lg
//         return 50; // xl, 2xl
//     };

//     const [truncateLength, setTruncateLength] = useState(getTruncateLength(window.innerWidth));
//     useEffect(() => {
//         const handleResize = () => {
//             setTruncateLength(getTruncateLength(window.innerWidth));
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const handleProductClick = (product) => {
//         localStorage.setItem('product', JSON.stringify(product));
//         localStorage.setItem('store', JSON.stringify(store));

//         if (store.fetchedFromBackend && !store.isEdit)
//             navigate("/productlanding", { state: { product, store } })
//     };

//     const truncateName = (name, charLimit) => {
//         return name.length > charLimit ? name.slice(0, charLimit) + '...' : name;
//     };

//     if (!product) return null;

//     const { id, name, image, variant } = product;
//     const firstVariant = variant[0]; // Considering only the first variant
//     const selectedOption = selectedOptionIndex === -1 ? null : firstVariant?.options[selectedOptionIndex];
//     const price = selectedOption ? selectedOption.price : product.price || 0;
//     const discount = selectedOption ? selectedOption.discount : product.discount || 0;

//     const handleOptionSelect = (index) => {
//         setSelectedOptionIndex(index);
//         setDisplayedImage(firstVariant?.options[index]?.image?.imageUrl);
//     };

//     const handleDefaultImage = () => {
//         setSelectedOptionIndex(-1);
//         setDisplayedImage(product?.image?.imageUrl);
//     };

    
//     const handleDeleteProduct = async () => {
//         if (isEdit) {
//             handleRemoveProduct({ id: product._id, storeId: store._id });
//         } else {
//             handleRemoveProduct({ id: product.id });
//         }
//     };

//     return (
//         <motion.div
//             className="font-roboto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden transform transition duration-300 relative border-solid border-2 w-full xl:w-[270px] h-full mx-auto flex flex-col"
//             whileTap={{ scale: 0.98 }}
//             whileHover={{ scale: 1 }}
//             style={{ backgroundColor: backgroundColor, color: textColor, border: `2px solid ${borderColor}` }}
//         >
//             {(!previewMode || isEdit) && (
//                 <button
//                     className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-[15] text-white flex items-center justify-center "
//                     onClick={ handleDeleteProduct}
//                 >
//                     <FaTimes />
//                 </button>
//             )}
//               {/* {(!previewMode || isEdit) && (
//                 <button
//                     className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white flex items-center justify-center"
//                     onClick={handleDeleteProduct}
//                     // style={{
//                     //     backgroundColor: store.color.newProductColor.deleteButtonBackground,
//                     // }}
//                 >
//                     <FaTimes />
//                 </button>
//             )} */}
//             <div className="relative flex flex-col flex-grow">
//                 <AnimatePresence>
//                     <motion.div
//                         className="card cursor-pointer flex flex-col justify-center rounded-sm shadow-2xl w-full flex-grow"
//                         style={{ backgroundColor: backgroundColor }}
//                         initial={{ opacity: 1 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                     >
//                         <button>
//                             <img onClick={() => handleProductClick(product)} src={displayedImage} alt={name} className="h-[290px] w-[288px] md:h-[384px] object-cover rounded-t-lg mx-auto" style={{ aspectRatio: '1/1', backgroundColor: backgroundColor}} />
//                         </button>
//                     </motion.div>
//                 </AnimatePresence>
//                 <AnimatePresence>

//                 <motion.div
//                        className="absolute bottom-2 md:bottom-5 w-full content-end z-10 px-2 h-[100vh]"
//                                             //    initial={{ opacity: 1 }}
//                                             //    whileHover={{ opacity: 0 }}
//                         style={{ borderColor: borderColor   }}
//                     >
//                         <div className="px-2 rounded-lg" style={{ backgroundColor: cardBackground }}>
//                             <div className="flex justify-between items-center grow p-1.25 rounded-lg h-[49px] w-full  my-[5px] float-left   duration-500  text-center overflow-hidden transition-all duration-1500 ease-in-out hover:h-[90px] " style={{ backgroundColor: cardBackground }}>
//                                 <div className="first">
//                                 <p className="text-sm md:text-lg font-Helvetica px-2 " style={{ color: textColor, borderColor: buttonBorderColor }}>{truncateName(name, 12)}</p>
//                                 <div className="flex  items-end py-2 w-30% ">
//                                     <IconButton 
//                                         Icon={TbShoppingBagPlus}
//                                         bgColor={buttonBgColor}
//                                         textColor={buttonTextColor}
//                                         borderColor={buttonBorderColor}
//                                         hoverBgColor={buttonBgColorOnHover}
//                                     />
//                                     <IconButton 
//                                         Icon={FaArrowRightLong}
//                                         bgColor={buttonBgColor}
//                                         textColor={buttonTextColor}
//                                         borderColor={buttonBorderColor}
//                                         hoverBgColor={buttonBgColorOnHover}
//                                     />
//                                 </div>
//                                 </div>
//                                 <div className="second">
//                                 <div className="flex justify-between">
//                                 <p className="text-sm md:text-lg font-Helvetica" style={{ color: textColor, borderColor: buttonBorderColor }}>{truncateName(name, 12)}</p>
//                                 <p className="md:my-1 text-sm md:text-base" style={{ color: priceColor, borderColor: buttonBorderColor }}>$ {price - discount}</p>
//                             </div>
//                             <p className="text-[8px] md:text-sm">Variants</p>
//                             <div className="flex justify-between mx-1">
//                                 <div className="flex">
//                                     <div
//                                         className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
//                                         onClick={handleDefaultImage}
//                                     >
//                                         <img src={image?.imageUrl} alt="Default" className='md:w-[36px] md:h-[36px] w-[24px] h-[24px] me-2 object-fit' />
//                                     </div>
//                                     {firstVariant?.options?.map((option, index) => (
//                                         <div
//                                             key={index}
//                                             className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
//                                             onClick={() => handleOptionSelect(index)}
//                                         >
//                                             {option?.image?.imageUrl &&
//                                                 <img src={option?.image?.imageUrl} alt={option.name} className='me-2 md:w-[36px] md:h-[36px] w-[24px] h-[24px]' />
//                                             }
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="flex justify items-end py-2 w-30% item">
//                                     <IconButton 
//                                         Icon={TbShoppingBagPlus}
//                                         bgColor={buttonBgColor}
//                                         textColor={buttonTextColor}
//                                         borderColor={buttonBorderColor}
//                                         hoverBgColor={buttonBgColorOnHover}
//                                         onClick={() => {
//                                             handleProductClick(product)
//                                         }}
//                                     />
//                                     <IconButton 
//                                         Icon={FaArrowRightLong}
//                                         bgColor={buttonBgColor}
//                                         textColor={buttonTextColor}
//                                         borderColor={buttonBorderColor}
//                                         hoverBgColor={buttonBgColorOnHover}
//                                         onClick={() => {
//                                             handleProductClick(product)
//                                         }}
//                                     />
//                                 </div>
//                             </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                     {/* <motion.div
//                        className="absolute bottom-2 md:bottom-5 w-full content-end z-10 px-2 h-[100vh]"
//                                             //    initial={{ opacity: 1 }}
//                                             //    whileHover={{ opacity: 0 }}
//                         style={{ borderColor: borderColor }}
//                     >
//                         <div className="px-2 rounded-lg" style={{ backgroundColor: cardBackground }}>
//                             <div className="flex justify-between items-center grow p-1.25 rounded-lg h-[49px]  mx-[1%] my-[5px] float-left relative transition-[height] duration-500 ease-in-out text-center overflow-hidden transition-all duration-1500 ease-in-out hover:h-[145px] hover:w-[50vw]">
//                                 <p className="text-sm md:text-lg font-Helvetica" style={{ color: textColor }}>{truncateName(name, 12)}</p>
//                                 <div className="flex  items-end py-2 w-30% ">
//                                     <IconButton 
//                                         Icon={TbShoppingBagPlus}
//                                         bgColor={buttonBgColor}
//                                         textColor={buttonTextColor}
//                                         borderColor={buttonBorderColor}
//                                         hoverBgColor={buttonBgColorOnHover}
//                                     />
//                                     <IconButton 
//                                         Icon={FaArrowRightLong}
//                                         bgColor={buttonBgColor}
//                                         textColor={buttonTextColor}
//                                         borderColor={buttonBorderColor}
//                                         hoverBgColor={buttonBgColorOnHover}
//                                     />
//                                 </div>
                                
//                             </div>
//                         </div>
//                     </motion.div> */}
//                     {/* <motion.div
//                         className="absolute bottom-2 md:bottom-5 w-full content-end z-10 px-2 h-[100vh]"
//                         initial={{ y: 20, opacity: 0}}
//                         whileHover={{ y: 0, opacity: 1 }}
//                         exit={{ y: 100, opacity: 0 }}
//                         transition={{ duration: 0.4 }}
//                         style={{ borderColor: borderColor }}
//                     >
//                         <div className="px-2 rounded-lg" style={{ backgroundColor: cardBackground }}>
//                             <div className="flex justify-between">
//                                 <p className="text-sm md:text-lg font-Helvetica" style={{ color: textColor, borderColor: buttonBorderColor }}>{truncateName(name, 12)}</p>
//                                 <p className="md:my-1 text-sm md:text-base" style={{ color: priceColor, borderColor: buttonBorderColor }}>$ {price - discount}</p>
//                             </div>
//                             <p className="text-[8px] md:text-sm">Variants</p>
//                             <div className="flex justify-between mx-1">
//                                 <div className="flex">
//                                     <div
//                                         className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
//                                         onClick={handleDefaultImage}
//                                     >
//                                         <img src={image?.imageUrl} alt="Default" className='md:w-[36px] md:h-[36px] w-[24px] h-[24px] me-2 object-fit' />
//                                     </div>
//                                     {firstVariant?.options?.map((option, index) => (
//                                         <div
//                                             key={index}
//                                             className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
//                                             onClick={() => handleOptionSelect(index)}
//                                         >
//                                             {option?.image?.imageUrl &&
//                                                 <img src={option?.image?.imageUrl} alt={option.name} className='me-2 md:w-[36px] md:h-[36px] w-[24px] h-[24px]' />
//                                             }
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="flex justify items-end py-2 w-30% item">
//                                     <IconButton 
//                                         Icon={TbShoppingBagPlus}
//                                         bgColor={buttonBgColor}
//                                         textColor={buttonTextColor}
//                                         borderColor={buttonBorderColor}
//                                         hoverBgColor={buttonBgColorOnHover}
//                                         onClick={() => {
//                                             handleProductClick(product)
//                                         }}
//                                     />
//                                     <IconButton 
//                                         Icon={FaArrowRightLong}
//                                         bgColor={buttonBgColor}
//                                         textColor={buttonTextColor}
//                                         borderColor={buttonBorderColor}
//                                         hoverBgColor={buttonBgColorOnHover}
//                                         onClick={() => {
//                                             handleProductClick(product)
//                                         }}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div> */}
//                 </AnimatePresence>
//             </div>
//         </motion.div>
//     );
// };

// export default NewProductListCard4;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRightLong} from 'react-icons/fa6';
import { TbShoppingBagPlus } from 'react-icons/tb';

import {FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const IconButton = ({ Icon, bgColor, textColor, borderColor, hoverBgColor }) => (
    <Icon
        className="text-[16px] md:text-[24px] mr-[10px] rounded-full p-[2px] border-solid border-[1px]"
        style={{ backgroundColor: bgColor, color: textColor, borderColor: borderColor }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBgColor)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
    />
);

const NewProductListCard4 = ({ productListProps, handleRemoveProduct, product }) => {
    const { productColor, previewMode, addToCart, store, isEdit } = productListProps;
    const { backgroundColor, cardBackground, borderColor, textColor, priceColor, buttonBgColor, buttonTextColor, buttonBorderColor, buttonBgColorOnHover } = productColor;

    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [displayedImage, setDisplayedImage] = useState(product?.image?.imageUrl);
    const [isHovered, setIsHovered] = useState(false);
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
        return name.length > charLimit ? name.slice(0, charLimit) + '...' : name;
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
        if (isEdit) {
            handleRemoveProduct({ id: product._id, storeId: store._id });
        } else {
            handleRemoveProduct({ id: product.id });
        }
    };

    return (
        // <motion.div
        //     className="font-roboto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden transform transition duration-300 relative border-solid border-2 w-full xl:w-[270px] h-full mx-auto flex flex-col"
        //     whileTap={{ scale: 0.98 }}
        //     whileHover={{ scale: 1 }}
        //     style={{ backgroundColor: backgroundColor, color: textColor, border: `2px solid ${borderColor}` }}
        // >
        //     {(!previewMode || isEdit) && (
        //         <button
        //             className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-[15] text-white flex items-center justify-center"
        //             onClick={handleDeleteProduct}
        //         >
        //             <FaTimes />
        //         </button>
        //     )}
        //     <div className="relative flex flex-col flex-grow">
        //         <AnimatePresence>
        //             <motion.div
        //                 className="card cursor-pointer flex flex-col justify-center rounded-sm shadow-2xl w-full flex-grow"
        //                 style={{ backgroundColor: backgroundColor }}
        //                 initial={{ opacity: 1 }}
        //                 animate={{ opacity: 1 }}
        //                 exit={{ opacity: 0 }}
        //             >
        //                 <button>
        //                     <img onClick={() => handleProductClick(product)} src={displayedImage} alt={name} className="h-[290px] w-[288px] md:h-[384px] object-cover rounded-t-lg mx-auto" style={{ aspectRatio: '1/1', backgroundColor: backgroundColor }} />
        //                 </button>
        //             </motion.div>
        //         </AnimatePresence>
        //         <AnimatePresence>
        //             <motion.div
        //                 className="absolute bottom-2 md:bottom-5 w-full content-end z-10 px-2 h-[100vh]"
        //                 style={{ borderColor: borderColor }}
        //             >
        //                 <div className="px-2 rounded-l " style={{ backgroundColor: cardBackground }} >
        //                     <div
        //                         className={`flex justify-between items-center grow p-1.25 rounded-lg w-full my-[5px] text-center float-left duration-500  overflow-hidden transition-all ease-in-out ${isHovered ? 'h-[90px]' : 'h-[40px]'}`}
        //                         style={{ backgroundColor: cardBackground }}
        //                         onMouseEnter={() => setIsHovered(true)}
        //                         onMouseLeave={() => setIsHovered(false)}
        //                     >
        //                         <div className={`${isHovered ? 'hidden' : 'flex'} first flex justify-between w-full `}>
        //                             <p className="text-sm md:text-lg font-Helvetica p-2" style={{ color: textColor, borderColor: buttonBorderColor }}>
        //                                 {truncateName(name, 12)}
        //                             </p>
        //                             <div className="flex items-end py-2 w-30%">
        //                                 <IconButton
        //                                     Icon={TbShoppingBagPlus}
        //                                     bgColor={buttonBgColor}
        //                                     textColor={buttonTextColor}
        //                                     borderColor={buttonBorderColor}
        //                                     hoverBgColor={buttonBgColorOnHover}
        //                                 />
        //                                 <IconButton
        //                                     Icon={FaArrowRightLong}
        //                                     bgColor={buttonBgColor}
        //                                     textColor={buttonTextColor}
        //                                     borderColor={buttonBorderColor}
        //                                     hoverBgColor={buttonBgColorOnHover}
        //                                 />
        //                             </div>
        //                         </div>
        //                         <div className={`${isHovered ? 'flex' : 'hidden'} second flex-col justify-between w-full`}>
        //                             <div className="flex justify-between px-2">
        //                                 <p className="text-sm md:text-lg font-Helvetica" style={{ color: textColor, borderColor: buttonBorderColor }}>
        //                                     {truncateName(name, 12)}
        //                                 </p>
        //                                 <p className="md:my-1 text-sm md:text-base" style={{ color: priceColor, borderColor: buttonBorderColor }}>
        //                                     $ {price - discount}
        //                                 </p>
        //                             </div>
        //                             <p className="text-[8px] md:text-sm text-left px-1">Variants</p>
        //                             <div className="flex justify-between mx-1">
        //                                 <div className="flex">
        //                                     <div
        //                                         className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
        //                                         onClick={handleDefaultImage}
        //                                     >
        //                                         <img src={image?.imageUrl} alt="Default" className="md:w-[36px] md:h-[36px] w-[24px] h-[24px] me-2 object-fit" />
        //                                     </div>
        //                                     {firstVariant?.options?.map((option, index) => (
        //                                         <div
        //                                             key={index}
        //                                             className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
        //                                             onClick={() => handleOptionSelect(index)}
        //                                         >
        //                                             {option?.image?.imageUrl && (
        //                                                 <img src={option?.image?.imageUrl} alt={option.name} className="me-2 md:w-[36px] md:h-[36px] w-[24px] h-[24px]" />
        //                                             )}
        //                                         </div>
        //                                     ))}
        //                                 </div>
        //                                 <div className="flex items-end py-2 w-30%">
        //                                     <IconButton
        //                                         Icon={TbShoppingBagPlus}
        //                                         bgColor={buttonBgColor}
        //                                         textColor={buttonTextColor}
        //                                         borderColor={buttonBorderColor}
        //                                         hoverBgColor={buttonBgColorOnHover}
        //                                         onClick={() => {
        //                                             handleProductClick(product);
        //                                         }}
        //                                     />
        //                                     <IconButton
        //                                         Icon={FaArrowRightLong}
        //                                         bgColor={buttonBgColor}
        //                                         textColor={buttonTextColor}
        //                                         borderColor={buttonBorderColor}
        //                                         hoverBgColor={buttonBgColorOnHover}
        //                                         onClick={() => {
        //                                             handleProductClick(product);
        //                                         }}
        //                                     />
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </motion.div>
        //         </AnimatePresence>
        //     </div>
        // </motion.div>
//         <motion.div
//     className="font-roboto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden transform transition relative border-solid border-2 w-full xl:w-[270px] h-full mx-auto flex flex-col"
//     whileTap={{ scale: 0.98 }}
//     whileHover={{ scale: 1 }}
//     style={{ backgroundColor: backgroundColor, color: textColor, border: `2px solid ${borderColor}` }}
// >
//     {(!previewMode || isEdit) && (
//         <button
//             className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-[15] text-white flex items-center justify-center"
//             onClick={handleDeleteProduct}
//         >
//             <FaTimes />
//         </button>
//     )}
//     <div className="relative flex flex-col flex-grow">
//         <AnimatePresence>
//             <motion.div
//                 className="card cursor-pointer flex flex-col justify-center rounded-sm shadow-2xl w-full flex-grow "
//                 style={{ backgroundColor: backgroundColor }}
//                 initial={{ opacity: 1 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 1 }}
//             >
//                 <button>
//                     <img onClick={() => handleProductClick(product)} src={displayedImage} alt={name} className="h-[290px] w-[288px] md:h-[384px] object-cover rounded-t-lg mx-auto" style={{ aspectRatio: '1/1', backgroundColor: backgroundColor }} />
//                 </button>
//             </motion.div>
//         </AnimatePresence>
//         <AnimatePresence>
//             <motion.div
//                 className="absolute bottom-2 md:bottom-5 w-full content-end z-10 px-[1px] h-[100vh]"
//                 style={{ borderColor: borderColor }}
//             >
//                 <div className="px-2 rounded-l" style={{ backgroundColor: cardBackground }}>
//                     <div
//                         className={` flex flex-col-reverse   items-center grow p-1.25 rounded-lg w-full my-[5px] text-center float-left overflow-auto transition-all before:ease-in-out after:ease-in-out  duration-500  ${isHovered ? 'h-[110px]' : 'h-[40px]'}`}
//                         style={{ backgroundColor: cardBackground }}
//                         onMouseEnter={() => setIsHovered(true)}
//                         onMouseLeave={() => setIsHovered(false)}
//                     >
                        
//                         <div className={`${isHovered ? 'hidden ' : 'flex flex-col'} first flex justify-between w-full transition-all delay-150 before:ease-in-out after:ease-in-out `}>
//                         <div className="w-full flex justify-between h-[36px] items-center">
//                             <p className="text-sm md:text-lg font-Helvetica p-2" style={{ color: textColor, borderColor: buttonBorderColor }}>
//                                 {truncateName(name, 12)}
//                             </p>
//                             <div className="flex items-end py-2 w-30% ">
//                                 <IconButton
//                                     Icon={TbShoppingBagPlus}
//                                     bgColor={buttonBgColor}
//                                     textColor={buttonTextColor}
//                                     borderColor={buttonBorderColor}
//                                     hoverBgColor={buttonBgColorOnHover}
//                                 />
//                                 <IconButton
//                                     Icon={FaArrowRightLong}
//                                     bgColor={buttonBgColor}
//                                     textColor={buttonTextColor}
//                                     borderColor={buttonBorderColor}
//                                     hoverBgColor={buttonBgColorOnHover}
//                                 />

//                             </div>
                            
//                         </div>
//                         </div>
//                         <div className={`${isHovered ? 'flex ' : 'hidden h-0'} second flex-col py-1  w-full h-full  transition-all  delay-150 before:ease-in-out after:ease-in-out z-10`}>
//                             <div className="flex justify-between px-2 ">
//                                 <p className="text-sm md:text-lg font-Helvetica" style={{ color: textColor, borderColor: buttonBorderColor }}>
//                                     {truncateName(name, 12)}
//                                 </p>
//                                 <p className="md:my-1 text-sm md:text-base" style={{ color: priceColor, borderColor: buttonBorderColor }}>
//                                     $ {price - discount}
//                                 </p>
//                             </div>
//                             <p className="text-[8px] md:text-sm text-left px-2 ">Variants</p>
//                             <div className= " flex justify-between mx-1">
//                                 <div className="flex">
//                                     <div
//                                         className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
//                                         onClick={handleDefaultImage}
//                                     >
//                                         <img src={image?.imageUrl} alt="Default" className="md:w-[36px] md:h-[36px] w-[24px] h-[24px] me-2 object-fit" />
//                                     </div>
//                                     {firstVariant?.options?.map((option, index) => (
//                                         <div
//                                             key={index}
//                                             className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
//                                             onClick={() => handleOptionSelect(index)}
//                                         >
//                                             {option?.image?.imageUrl && (
//                                                 <img src={option?.image?.imageUrl} alt={option.name} className="me-2 md:w-[36px] md:h-[36px] w-[24px] h-[24px]" />
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="flex items-end  w-30% ">
//                                     <IconButton
//                                         Icon={TbShoppingBagPlus}
//                                         bgColor={buttonBgColor}
//                                         textColor={buttonTextColor}
//                                         borderColor={buttonBorderColor}
//                                         hoverBgColor={buttonBgColorOnHover}
//                                         onClick={() => {
//                                             handleProductClick(product);
//                                         }}
//                                     />
//                                     <IconButton
//                                         Icon={FaArrowRightLong}
//                                         bgColor={buttonBgColor}
//                                         textColor={buttonTextColor}
//                                         borderColor={buttonBorderColor}
//                                         hoverBgColor={buttonBgColorOnHover}
//                                         onClick={() => {
//                                             handleProductClick(product);
//                                         }}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//         </AnimatePresence>
//     </div>
// </motion.div>


<motion.div
    className="font-roboto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden transform transition relative border-solid border-2 w-full xl:w-[270px] h-full mx-auto flex flex-col"
    whileTap={{ scale: 0.98 }}
    whileHover={{ scale: 1 }}
    style={{ backgroundColor: backgroundColor, color: textColor, border: `2px solid ${borderColor}` }}
>
    {(!previewMode || isEdit) && (
        <button
            className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-[15] text-white flex items-center justify-center"
            onClick={handleDeleteProduct}
        >
            <FaTimes />
        </button>
    )}
    <div className="relative flex flex-col flex-grow">
        <AnimatePresence>
            <motion.div
                className="card cursor-pointer flex flex-col justify-center rounded-sm shadow-2xl w-full flex-grow"
                style={{ backgroundColor: backgroundColor }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1 }}
            >
                <button>
                    <img onClick={() => handleProductClick(product)} src={displayedImage} alt={name} className="h-[290px] w-[288px] md:h-[384px] object-cover rounded-t-lg mx-auto" style={{ aspectRatio: '1/1', backgroundColor: backgroundColor }} />
                </button>
            </motion.div>
        </AnimatePresence>
        <AnimatePresence>
            <motion.div
                className="absolute bottom-2 md:bottom-5 w-full content-end z-10 px-[1px] h-[100vh]"
                style={{ borderColor: borderColor }}
            >
                <div className="px-2 rounded-l" style={{ backgroundColor: cardBackground }}>
                    <div
                        className={`flex flex-col-reverse items-center grow p-1.25 rounded-lg w-full my-[5px] text-center float-left overflow-auto transition-all before:ease-in-out after:ease-in-out duration-500 ${isHovered ? 'h-[110px]' : 'h-[40px]'}`}
                        style={{ backgroundColor: cardBackground }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className={`${isHovered ? 'hidden' : 'flex flex-col'} first flex justify-between w-full transition-opactity duration-1000 delay-1000 before:ease-in-out after:ease-in-out z-10`}>
                            <div className="w-full flex justify-between h-[36px] items-center">
                                <p className="text-sm md:text-lg font-Helvetica p-2" style={{ color: textColor, borderColor: buttonBorderColor }}>
                                    {truncateName(name, 12)}
                                </p>
                                <div className="flex items-end py-2 w-30%">
                                    <IconButton
                                        Icon={TbShoppingBagPlus}
                                        bgColor={buttonBgColor}
                                        textColor={buttonTextColor}
                                        borderColor={buttonBorderColor}
                                        hoverBgColor={buttonBgColorOnHover}
                                    />
                                    <IconButton
                                        Icon={FaArrowRightLong}
                                        bgColor={buttonBgColor}
                                        textColor={buttonTextColor}
                                        borderColor={buttonBorderColor}
                                        hoverBgColor={buttonBgColorOnHover}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`second flex-col py-1 w-full h-full transition-all  duration-500 ease-in-out ${isHovered ? 'flex' : 'opacity-0 '}`}>
                            <div className="flex justify-between px-2">
                                <p className="text-sm md:text-lg font-Helvetica" style={{ color: textColor, borderColor: buttonBorderColor }}>
                                    {truncateName(name, 12)}
                                </p>
                                <p className="md:my-1 text-sm md:text-base" style={{ color: priceColor, borderColor: buttonBorderColor }}>
                                    $ {price - discount}
                                </p>
                            </div>
                            <p className="text-[8px] md:text-sm text-left px-2">Variants</p>
                            <div className="flex justify-between mx-1">
                                <div className="flex">
                                    <div
                                        className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
                                        onClick={handleDefaultImage}
                                    >
                                        <img src={image?.imageUrl} alt="Default" className="md:w-[36px] md:h-[36px] w-[24px] h-[24px] me-2 object-fit" />
                                    </div>
                                    {firstVariant?.options?.map((option, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
                                            onClick={() => handleOptionSelect(index)}
                                        >
                                            {option?.image?.imageUrl && (
                                                <img src={option?.image?.imageUrl} alt={option.name} className="me-2 md:w-[36px] md:h-[36px] w-[24px] h-[24px]" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-end w-30%">
                                    <IconButton
                                        Icon={TbShoppingBagPlus}
                                        bgColor={buttonBgColor}
                                        textColor={buttonTextColor}
                                        borderColor={buttonBorderColor}
                                        hoverBgColor={buttonBgColorOnHover}
                                        onClick={() => {
                                            handleProductClick(product);
                                        }}
                                    />
                                    <IconButton
                                        Icon={FaArrowRightLong}
                                        bgColor={buttonBgColor}
                                        textColor={buttonTextColor}
                                        borderColor={buttonBorderColor}
                                        hoverBgColor={buttonBgColorOnHover}
                                        onClick={() => {
                                            handleProductClick(product);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    </div>
</motion.div>


    );
};
{/* <motion.div
    className="font-roboto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden transform transition duration-300 relative border-solid border-2 w-full xl:w-[270px] h-full mx-auto flex flex-col"
    whileTap={{ scale: 0.98 }}
    whileHover={{ scale: 1 }}
    style={{ backgroundColor: backgroundColor, color: textColor, border: `2px solid ${borderColor}` }}
>
    {(!previewMode || isEdit) && (
        <button
            className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-[15] text-white flex items-center justify-center"
            onClick={handleDeleteProduct}
        >
            <FaTimes />
        </button>
    )}
    <div className="relative flex flex-col flex-grow">
        <AnimatePresence>
            <motion.div
                className="card cursor-pointer flex flex-col justify-center rounded-sm shadow-2xl w-full flex-grow"
                style={{ backgroundColor: backgroundColor }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <button>
                    <img onClick={() => handleProductClick(product)} src={displayedImage} alt={name} className="h-[290px] w-[288px] md:h-[384px] object-cover rounded-t-lg mx-auto" style={{ aspectRatio: '1/1', backgroundColor: backgroundColor }} />
                </button>
            </motion.div>
        </AnimatePresence>
        <AnimatePresence>
            <motion.div
                className="absolute bottom-2 md:bottom-5 w-full content-end z-10 px-2 h-[100vh]"
                style={{ borderColor: borderColor }}
            >
                <div className="px-2 rounded-l" style={{ backgroundColor: cardBackground }}>
                    <div
                        className={`flex justify-between items-center grow p-1.25 rounded-lg w-full my-[5px] text-center float-left overflow-hidden transition-all before:ease-in-out after:ease-in-out duration-500 delay-80ms ${isHovered ? 'h-[90px]' : 'h-[40px]'}`}
                        style={{ backgroundColor: cardBackground }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="flex justify-between w-full">
                            <p className="text-sm md:text-lg font-Helvetica p-2" style={{ color: textColor, borderColor: buttonBorderColor }}>
                                {truncateName(name, 12)}
                            </p>
                            <div className="flex items-end py-2 w-30%">
                                <IconButton
                                    Icon={TbShoppingBagPlus}
                                    bgColor={buttonBgColor}
                                    textColor={buttonTextColor}
                                    borderColor={buttonBorderColor}
                                    hoverBgColor={buttonBgColorOnHover}
                                />
                                <IconButton
                                    Icon={FaArrowRightLong}
                                    bgColor={buttonBgColor}
                                    textColor={buttonTextColor}
                                    borderColor={buttonBorderColor}
                                    hoverBgColor={buttonBgColorOnHover}
                                />
                            </div>
                        </div>
                        <div className={`${isHovered ? 'flex' : 'hidden'} second flex-col justify-between w-full`}>
                            <div className="flex justify-between px-2">
                                <p className="text-sm md:text-lg font-Helvetica" style={{ color: textColor, borderColor: buttonBorderColor }}>
                                    {truncateName(name, 12)}
                                </p>
                                <p className="md:my-1 text-sm md:text-base" style={{ color: priceColor, borderColor: buttonBorderColor }}>
                                    $ {price - discount}
                                </p>
                            </div>
                            <p className="text-[8px] md:text-sm text-left px-1">Variants</p>
                            <div className="flex justify-between mx-1">
                                <div className="flex">
                                    <div
                                        className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
                                        onClick={handleDefaultImage}
                                    >
                                        <img src={image?.imageUrl} alt="Default" className="md:w-[36px] md:h-[36px] w-[24px] h-[24px] me-2 object-fit" />
                                    </div>
                                    {firstVariant?.options?.map((option, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
                                            onClick={() => handleOptionSelect(index)}
                                        >
                                            {option?.image?.imageUrl && (
                                                <img src={option?.image?.imageUrl} alt={option.name} className="me-2 md:w-[36px] md:h-[36px] w-[24px] h-[24px]" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-end py-2 w-30%">
                                    <IconButton
                                        Icon={TbShoppingBagPlus}
                                        bgColor={buttonBgColor}
                                        textColor={buttonTextColor}
                                        borderColor={buttonBorderColor}
                                        hoverBgColor={buttonBgColorOnHover}
                                        onClick={() => {
                                            handleProductClick(product);
                                        }}
                                    />
                                    <IconButton
                                        Icon={FaArrowRightLong}
                                        bgColor={buttonBgColor}
                                        textColor={buttonTextColor}
                                        borderColor={buttonBorderColor}
                                        hoverBgColor={buttonBgColorOnHover}
                                        onClick={() => {
                                            handleProductClick(product);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    </div>
</motion.div> */}
export default NewProductListCard4;
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaArrowRightLong } from 'react-icons/fa6';
// import { TbShoppingBagPlus } from 'react-icons/tb';
// import { FaTimes } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const IconButton = ({ Icon, bgColor, textColor, borderColor, hoverBgColor, onClick }) => (
//     <Icon
//         className="text-[16px] md:text-[24px] mr-[10px] rounded-full p-[2px] border-solid border-[1px]"
//         style={{ backgroundColor: bgColor, color: textColor, borderColor: borderColor }}
//         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBgColor)}
//         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
//         onClick={onClick}
//     />
// );

// const NewProductListCard4 = ({ productListProps, handleRemoveProduct, product }) => {
//     const { productColor, previewMode, addToCart, store, isEdit } = productListProps;
//     const { backgroundColor, cardBackground, borderColor, textColor, priceColor, buttonBgColor, buttonTextColor, buttonBorderColor, buttonBgColorOnHover } = productColor;

//     const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
//     const [displayedImage, setDisplayedImage] = useState(product?.image?.imageUrl);
//     const [isHovered, setIsHovered] = useState(false);
//     const navigate = useNavigate();

//     const getTruncateLength = (width) => {
//         if (width < 640) return 50; // sm
//         if (width < 1281) return 37; // md, lg
//         return 50; // xl, 2xl
//     };

//     const [truncateLength, setTruncateLength] = useState(getTruncateLength(window.innerWidth));
//     useEffect(() => {
//         const handleResize = () => {
//             setTruncateLength(getTruncateLength(window.innerWidth));
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const handleProductClick = (product) => {
//         localStorage.setItem('product', JSON.stringify(product));
//         localStorage.setItem('store', JSON.stringify(store));

//         if (store.fetchedFromBackend && !store.isEdit)
//             navigate("/productlanding", { state: { product, store } })
//     };

//     const truncateName = (name, charLimit) => {
//         return name.length > charLimit ? name.slice(0, charLimit) + '...' : name;
//     };

//     if (!product) return null;

//     const { id, name, image, variant } = product;
//     const firstVariant = variant[0]; // Considering only the first variant
//     const selectedOption = selectedOptionIndex === -1 ? null : firstVariant?.options[selectedOptionIndex];
//     const price = selectedOption ? selectedOption.price : product.price || 0;
//     const discount = selectedOption ? selectedOption.discount : product.discount || 0;

//     const handleOptionSelect = (index) => {
//         setSelectedOptionIndex(index);
//         setDisplayedImage(firstVariant?.options[index]?.image?.imageUrl);
//     };

//     const handleDefaultImage = () => {
//         setSelectedOptionIndex(-1);
//         setDisplayedImage(product?.image?.imageUrl);
//     };

//     const handleDeleteProduct = async () => {
//         if (isEdit) {
//             handleRemoveProduct({ id: product._id, storeId: store._id });
//         } else {
//             handleRemoveProduct({ id: product.id });
//         }
//     };

//     return (
//         <motion.div
//             className="font-roboto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden transform transition duration-300 relative border-solid border-2 w-full xl:w-[270px] h-full mx-auto flex flex-col"
//             whileTap={{ scale: 0.98 }}
//             whileHover={{ scale: 1 }} // Slightly enlarge on hover
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             style={{ backgroundColor: backgroundColor, color: textColor, border: `2px solid ${borderColor}` }}
//         >
//             {(!previewMode || isEdit) && (
//                 <button
//                     className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-[15] text-white flex items-center justify-center"
//                     onClick={handleDeleteProduct}
//                 >
//                     <FaTimes />
//                 </button>
//             )}
//             <div className="relative flex flex-col flex-grow">
//                 <AnimatePresence>
//                     <motion.div
//                         className="card cursor-pointer flex flex-col justify-center rounded-sm shadow-2xl w-full flex-grow"
//                         style={{ backgroundColor: backgroundColor }}
//                         initial={{ opacity: 1 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                     >
//                         <button>
//                             <img onClick={() => handleProductClick(product)} src={displayedImage} alt={name} className="h-[290px] w-[288px] md:h-[384px] object-cover rounded-t-lg mx-auto" style={{ aspectRatio: '1/1', backgroundColor: backgroundColor }} />
//                         </button>
//                     </motion.div>
//                 </AnimatePresence>
//                 <AnimatePresence>
//                     <motion.div
//                         className="absolute bottom-1 md:bottom-5 w-full content-end z-10 px-0 md:px-2 h-[100vh]"
//                         style={{ borderColor: borderColor }}
//                     >
//                         <div className="px-1 md:px-2.5 rounded-l" style={{ backgroundColor: cardBackground }}>
//                             <div
//                                 className={`flex justify-between items-center grow p-1.25 rounded-lg w-full my-[3px] text-center float-left duration-500 overflow-hidden transition-all ease-in-out ${isHovered ? 'h-auto' : 'h-[40px]'}`}
//                                 style={{ backgroundColor: cardBackground }}
//                             >
//                                 <div className={`${isHovered ? 'hidden' : 'flex'} first flex justify-between w-full`}>
//                                     <p className="text-sm md:text-lg font-Helvetica p-2" style={{ color: textColor, borderColor: buttonBorderColor }}>
//                                         {truncateName(name, 12)}
//                                     </p>
//                                     <div className="flex items-end py-2 w-30%">
//                                         <IconButton
//                                             Icon={TbShoppingBagPlus}
//                                             bgColor={buttonBgColor}
//                                             textColor={buttonTextColor}
//                                             borderColor={buttonBorderColor}
//                                             hoverBgColor={buttonBgColorOnHover}
//                                             onClick={() => handleProductClick(product)}
//                                         />
//                                         <IconButton
//                                             Icon={FaArrowRightLong}
//                                             bgColor={buttonBgColor}
//                                             textColor={buttonTextColor}
//                                             borderColor={buttonBorderColor}
//                                             hoverBgColor={buttonBgColorOnHover}
//                                             onClick={() => handleProductClick(product)}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className={`${isHovered ? 'flex' : 'hidden'} second flex-col justify-between w-full`}>
//                                     <div className="flex justify-between px-2">
//                                         <p className="text-sm md:text-lg font-Helvetica" style={{ color: textColor, borderColor: buttonBorderColor }}>
//                                             {truncateName(name, 12)}
//                                         </p>
//                                         <p className=" text-sm md:text-base" style={{ color: priceColor, borderColor: buttonBorderColor }}>
//                                             $ {price - discount}
//                                         </p>
//                                     </div>
//                                     <p className="text-[8px] md:text-sm text-left px-2">Variants</p>
//                                     <div className="flex justify-between mx-1">
//                                         <div className="flex overflow-x-auto">
//                                             <div
//                                                 className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
//                                                 onClick={handleDefaultImage}
//                                             >
//                                                 <img src={image?.imageUrl} alt="Default" className="md:w-[32px] md:h-[32px] w-[24px] h-[24px] items-center me-2 object-fit" />
//                                             </div>
//                                             {firstVariant?.options?.map((option, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
//                                                     onClick={() => handleOptionSelect(index)}
//                                                 >
//                                                     {option?.image?.imageUrl && (
//                                                         <img src={option?.image?.imageUrl} alt={option.name} className="me-2 md:w-[32px] md:h-[32px] w-[24px] h-[24px] items-center" />
//                                                     )}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div className="flex items-end py-2 w-30%">
//                                             <IconButton
//                                                 Icon={TbShoppingBagPlus}
//                                                 bgColor={buttonBgColor}
//                                                 textColor={buttonTextColor}
//                                                 borderColor={buttonBorderColor}
//                                                 hoverBgColor={buttonBgColorOnHover}
//                                                 onClick={() => handleProductClick(product)}
//                                             />
//                                             <IconButton
//                                                 Icon={FaArrowRightLong}
//                                                 bgColor={buttonBgColor}
//                                                 textColor={buttonTextColor}
//                                                 borderColor={buttonBorderColor}
//                                                 hoverBgColor={buttonBgColorOnHover}
//                                                 onClick={() => handleProductClick(product)}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </AnimatePresence>
//             </div>
//         </motion.div>
//     );
// };

// export default NewProductListCard4;
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaArrowRightLong } from 'react-icons/fa6';
// import { TbShoppingBagPlus } from 'react-icons/tb';
// import { FaTimes } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const IconButton = ({ Icon, bgColor, textColor, borderColor, hoverBgColor, onClick }) => (
//     <Icon
//         className="text-[16px] md:text-[24px] mr-[10px] rounded-full p-[2px] border-solid border-[1px]"
//         style={{ backgroundColor: bgColor, color: textColor, borderColor: borderColor }}
//         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBgColor)}
//         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
//         onClick={onClick}
//     />
// );

// const NewProductListCard4 = ({ productListProps, handleRemoveProduct, product }) => {
//     const { productColor, previewMode, addToCart, store, isEdit } = productListProps;
//     const { backgroundColor, cardBackground, borderColor, textColor, priceColor, buttonBgColor, buttonTextColor, buttonBorderColor, buttonBgColorOnHover } = productColor;

//     const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
//     const [displayedImage, setDisplayedImage] = useState(product?.image?.imageUrl);
//     const [isHovered, setIsHovered] = useState(false);
//     const navigate = useNavigate();

//     const getTruncateLength = (width) => {
//         if (width < 640) return 50; // sm
//         if (width < 1281) return 37; // md, lg
//         return 50; // xl, 2xl
//     };

//     const [truncateLength, setTruncateLength] = useState(getTruncateLength(window.innerWidth));
//     useEffect(() => {
//         const handleResize = () => {
//             setTruncateLength(getTruncateLength(window.innerWidth));
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const handleProductClick = (product) => {
//         localStorage.setItem('product', JSON.stringify(product));
//         localStorage.setItem('store', JSON.stringify(store));

//         if (store.fetchedFromBackend && !store.isEdit)
//             navigate("/productlanding", { state: { product, store } })
//     };

//     const truncateName = (name, charLimit) => {
//         return name.length > charLimit ? name.slice(0, charLimit) + '...' : name;
//     };

//     if (!product) return null;

//     const { id, name, image, variant } = product;
//     const firstVariant = variant[0]; // Considering only the first variant
//     const selectedOption = selectedOptionIndex === -1 ? null : firstVariant?.options[selectedOptionIndex];
//     const price = selectedOption ? selectedOption.price : product.price || 0;
//     const discount = selectedOption ? selectedOption.discount : product.discount || 0;

//     const handleOptionSelect = (index) => {
//         setSelectedOptionIndex(index);
//         setDisplayedImage(firstVariant?.options[index]?.image?.imageUrl);
//     };

//     const handleDefaultImage = () => {
//         setSelectedOptionIndex(-1);
//         setDisplayedImage(product?.image?.imageUrl);
//     };

//     const handleDeleteProduct = async () => {
//         if (isEdit) {
//             handleRemoveProduct({ id: product._id, storeId: store._id });
//         } else {
//             handleRemoveProduct({ id: product.id });
//         }
//     };

//     return (
//         <motion.div
//         className="font-roboto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden transform transition-all duration-500 ease-out relative border-solid border-2 w-full xl:w-[270px] h-full mx-auto flex flex-col"
//         whileTap={{ scale: 0.98 }}
//         whileHover={{ scale: 1.02 }} // Slightly enlarge on hover
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         style={{ backgroundColor: backgroundColor, color: textColor, border: `2px solid ${borderColor}` }}
//     >
//             {(!previewMode || isEdit) && (
//                 <button
//                     className="absolute top-2 right-2 p-2 rounded-full bg-red-500 z-[15] text-white flex items-center justify-center"
//                     onClick={handleDeleteProduct}
//                 >
//                     <FaTimes />
//                 </button>
//             )}
//             <div className="relative flex flex-col flex-grow">
//                 <AnimatePresence>
//                     <motion.div
//                         className="card cursor-pointer flex flex-col justify-center rounded-sm shadow-2xl w-full flex-grow"
//                         style={{ backgroundColor: backgroundColor }}
//                         initial={{ opacity: 1 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                     >
//                         <button>
//                             <img onClick={() => handleProductClick(product)} src={displayedImage} alt={name} className="h-[290px] w-[288px] md:h-[384px] object-cover rounded-t-lg mx-auto" style={{ aspectRatio: '1/1', backgroundColor: backgroundColor }} />
//                         </button>
//                     </motion.div>
//                 </AnimatePresence>
//                 <AnimatePresence>
//                     <motion.div
//                         className="absolute bottom-1 md:bottom-5 w-full content-end z-10 px-0 md:px-2 h-[100vh]"
//                         style={{ borderColor: borderColor }}
//                     >
//                         <div className="px-1 md:px-2.5 rounded-l" style={{ backgroundColor: cardBackground }}>
//                             <div
//                                 className={`flex justify-between items-center grow p-1.25 rounded-lg w-full my-[3px] text-center float-left transition-all duration-1000 delay-75 ease-in-out ${isHovered ? 'h-auto' : 'h-[40px]'}`}
//                                 style={{ backgroundColor: cardBackground }}
//                             >
//                                 <div className={`${isHovered ? 'hidden' : 'flex'} first flex justify-between w-full transition-all duration-1000  delay-75 ease-in-out`}>
//                                     <p className="text-sm md:text-lg font-Helvetica p-2" style={{ color: textColor, borderColor: buttonBorderColor }}>
//                                         {truncateName(name, 12)}
//                                     </p>
//                                     <div className="flex items-end py-2 w-30% ">
//                                         <IconButton
//                                             Icon={TbShoppingBagPlus}
//                                             bgColor={buttonBgColor}
//                                             textColor={buttonTextColor}
//                                             borderColor={buttonBorderColor}
//                                             hoverBgColor={buttonBgColorOnHover}
//                                             onClick={() => handleProductClick(product)}
//                                         />
//                                         <IconButton
//                                             Icon={FaArrowRightLong}
//                                             bgColor={buttonBgColor}
//                                             textColor={buttonTextColor}
//                                             borderColor={buttonBorderColor}
//                                             hoverBgColor={buttonBgColorOnHover}
//                                             onClick={() => handleProductClick(product)}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className={`${isHovered ? 'flex' : 'hidden'} second flex-col justify-between w-full transition-all duration-1000  delay-75 ease-in-out`}>
//                                     <div className="flex justify-between px-2">
//                                         <p className="text-sm md:text-lg font-Helvetica" style={{ color: textColor, borderColor: buttonBorderColor }}>
//                                             {truncateName(name, 12)}
//                                         </p>
//                                         <p className="text-sm md:text-base" style={{ color: priceColor, borderColor: buttonBorderColor }}>
//                                             $ {price - discount}
//                                         </p>
//                                     </div>
//                                     <p className="text-[8px] md:text-sm text-left px-2">Variants</p>
//                                     <div className="flex justify-between mx-1">
//                                         <div className="flex overflow-x-auto">
//                                             <div
//                                                 className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === -1 ? 'font-bold' : ''} rounded-md`}
//                                                 onClick={handleDefaultImage}
//                                             >
//                                                 <img src={image?.imageUrl} alt="Default" className="md:w-[32px] md:h-[32px] w-[24px] h-[24px] items-center me-2 object-fit" />
//                                             </div>
//                                             {firstVariant?.options?.map((option, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className={`cursor-pointer text-sm sm:text-base ${selectedOptionIndex === index ? 'font-bold' : ''} rounded-md`}
//                                                     onClick={() => handleOptionSelect(index)}
//                                                 >
//                                                     {option?.image?.imageUrl && (
//                                                         <img src={option?.image?.imageUrl} alt={option.name} className="me-2 md:w-[32px] md:h-[32px] w-[24px] h-[24px] items-center" />
//                                                     )}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div className="flex items-end py-2 w-30% ">
//                                             <IconButton
//                                                 Icon={TbShoppingBagPlus}
//                                                 bgColor={buttonBgColor}
//                                                 textColor={buttonTextColor}
//                                                 borderColor={buttonBorderColor}
//                                                 hoverBgColor={buttonBgColorOnHover}
//                                                 onClick={() => handleProductClick(product)}
//                                             />
//                                             <IconButton
//                                                 Icon={FaArrowRightLong}
//                                                 bgColor={buttonBgColor}
//                                                 textColor={buttonTextColor}
//                                                 borderColor={buttonBorderColor}
//                                                 hoverBgColor={buttonBgColorOnHover}
//                                                 onClick={() => handleProductClick(product)}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </AnimatePresence>
//             </div>
//         </motion.div>
//     );
// };

// export default NewProductListCard4;
