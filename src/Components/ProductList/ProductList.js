import React, { useState, useEffect, useContext } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import ProductListCard1 from './ProductListCard1';
import ProductListCard2 from './ProductListCard2';
import ProductListcard3 from './ProductListCard3';
import useFetch from '../../Hooks/useFetch';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Hooks/AuthContext';
const ProductList = ({ productListProps, productListType, storeName }) => {
    const { products, isEdit, productColor, setStore, store, fetchedFromBackend,isVisitorAddToCart,setIsVisitorAddToCart } = productListProps
    const navigate = useNavigate()
    const { sendRequest } = useFetch();
    const handleExploreClick = (e) => {

        navigate(`${process.env.REACT_APP_BASE_URL}/store/products/:${storeName}`)
    }
    // Filtered products state
    const [filteredProducts, setFilteredProducts] = useState(products);
    const auth = useContext(AuthContext);
    // Delayed filtering function
    useEffect(() => {
        setFilteredProducts(products.slice(0, 4));
    }, [products]);

    const handleDeleteProduct = (productIndex) => {

        setStore(prevStore => ({
            ...prevStore,
            featuredProducts: prevStore.featuredProducts.filter((_, index) => index !== productIndex)
        }));
    };

    const handleRemoveProduct = async (productName) => {
        if (store?.isEdit) {
            try {
                const response = await sendRequest(
                    `product/deleteProduct`,
                    'POST',
                    JSON.stringify(productName),
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + auth.token,
                    }
                );
                toast(response.message);
            } catch (err) {

                toast("Error Deleting Product")
            }
            setStore(prevStore => ({
                ...prevStore,
                products: prevStore.products.filter(product => product._id !== productName.id)
            }));
        }
        else {
            setStore(prevStore => ({
                ...prevStore,
                products: prevStore.products.filter(product => product.id !== productName.id)
            }));
        }
    };
    const handleAddToCartAnalytics=async(product)=>{
        try{
            if(!isVisitorAddToCart){
                setIsVisitorAddToCart(true);
                await sendRequest(
                    `analytics/visitorCartAdd/${store._id}`,
                            'POST',
                            JSON.stringify({}),
                            {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + auth.token,
                            }
                )
            }
                const response=await sendRequest(
                    `analytics/addToCartEvent/${store._id}`,
                            'POST',
                            JSON.stringify({productId:product}),
                            {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + auth.token,
                            }
                )
        }catch(err){
            toast.error(err.message)
        }
    }



    console.log(productListType,"prduct list type")
    const renderProductList = () => {
        switch (productListType) {
            case 'default':
                return (
                    <div className='space-y-10 py-10 flex items-center flex-col mb-16 rounded-sm' style={{ backgroundColor: productColor.backgroundColor }}>
                        <h1 style={{ color: productColor.headerColor }} className="text-3xl font-semibold">Featured Products</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 rounded-lg gap-x-10 gap-y-12 lg:gap-10">
                            {filteredProducts?.map((product, i) => (
                                (product?.id || product?._id) && (
                                    <ProductListCard1
                                        product={product}
                                        productListProps={productListProps}
                                        handleRemoveProduct={handleRemoveProduct}
                                        store={store}
                                        handleDeleteProduct={handleDeleteProduct}
                                        setStore={setStore}
                                        index={i}
                                        handleAddToCartAnalytics={handleAddToCartAnalytics}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                );

            case 'Modern Minimalistic':
                return (
                    <div className='space-y-10 py-20 flex items-center  flex-col' style={{ backgroundColor: productColor.backgroundColor }}>
                        <h1 style={{ color: productColor.headerColor }} className="text-3xl font-semibold">Featured Products</h1>
                        <div >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 rounded-sm gap-x-10 gap-y-12 lg:gap-10 ">
                                {filteredProducts?.map((product, i) => (
                                    (product?.id || product?._id) && <ProductListcard3
                                        key={product.id}
                                        product={product}
                                        productListProps={productListProps}
                                        handleRemoveProduct={handleRemoveProduct}
                                        store={store}
                                        handleAddToCartAnalytics={handleAddToCartAnalytics}

                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'Slider':
                return (
                    <div className='space-y-10 py-20 flex items-center  flex-col' style={{ backgroundColor: productColor.backgroundColor }}>
                        <h1 style={{ color: productColor.headerColor }} className="text-3xl font-semibold">Featured Products</h1>
                        <div >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 rounded-sm gap-x-10 gap-y-12 lg:gap-10 ">
                                {filteredProducts?.map((product, i) => (
                                    (product?.id || product?._id) && <ProductListCard2
                                        key={product.id}
                                        product={product}
                                        productListProps={productListProps}
                                        handleRemoveProduct={handleRemoveProduct}
                                        store={store}
                                        handleAddToCartAnalytics={handleAddToCartAnalytics}

                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            // Add more cases for other product list types
            
       
            default:
                return (<div className='space-y-10 py-20 flex items-center  flex-col' style={{ backgroundColor: productColor.backgroundColor }}>
                    <h1 style={{ color: productColor.headerColor }} className="text-3xl font-semibold">Featured Products</h1>
                    <div >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 rounded-sm gap-x-10 gap-y-12 lg:gap-10 ">
                            {filteredProducts?.map((product, i) => (
                                (product?.id || product?._id) && <ProductListCard1
                                    key={product.id}
                                    product={product}
                                    productListProps={productListProps}
                                    handleRemoveProduct={handleRemoveProduct}
                                    store={store}
                                    handleAddToCartAnalytics={handleAddToCartAnalytics}

                                />
                            ))}
                        </div>
                    </div>
                </div>)
        }
    };
    return (

        <div style={{ fontFamily: store?.fonts?.Featured, backgroundColor: "#ffff" }}>
            {renderProductList()}
            <div className='relative'>
                <Link>
                    <button className="flex  items-center absolute right-10 bottom-0 font-semibold pt-6 px-4 transition ease-in duration-200 border-nore focus:outline-none"
                    >
                        <span>
                            <Link to={`/store/products/${store.name}`} >
                                View More
                            </Link>
                        </span> <IoIosArrowForward />
                    </button>
                </Link>
            </div>
        </div>

    );
};

export default ProductList;
