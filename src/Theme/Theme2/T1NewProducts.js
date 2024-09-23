import React from 'react';

import { useStore } from '../ThemeContext';
import { useDraggable } from "react-use-draggable-scroll";

import NewProductList from '../../Components/NewProductList/NewProductList';
import useFetch from '../../Hooks/useFetch';
import { toast } from 'react-toastify';

const T1NewProducts = () => {
    const { store, setStore, addToCart, isVisitorAddToCart, setIsVisitorAddToCart, setSelectedSubCategory, removeSubCategory, addSubCategory } = useStore();
    const { previewMode, featuredProducts, products, activeTheme } = store;
    const { newProductColor } = store.color;
    const productColor = { ...newProductColor };
    const { sendRequest } = useFetch();

    const handleAddToCartAnalytics = async (product) => {

        // Check if it's the visitor's first time adding to the cart
        if (!isVisitorAddToCart) {
            try {
                setIsVisitorAddToCart(true);
                await sendRequest(
                    `analytics/visitorCartAdd/${store._id}`,
                    'POST',
                    JSON.stringify({}),
                    { 'Content-Type': 'application/json' }
                );
            } catch (err) {
                console.error('Error logging visitor cart addition:', err.message);
                toast.error(err.message);
            }
        }

        // Log the product addition event
        try {
            await sendRequest(
                `analytics/addToCartEvent/${store._id}`,
                'POST',
                JSON.stringify({ productId: product }),
                { 'Content-Type': 'application/json' }
            );
        } catch (err) {
            console.error('Error logging product addition:', err.message);
            toast.error(err.message);
        }
    }

    // Map featured product indices to their actual product objects
    const featuredProductList = products;

    const productListProps = { store, productColor, products: featuredProductList, previewMode, setStore, addToCart, isVisitorAddToCart, setIsVisitorAddToCart, setSelectedSubCategory, removeSubCategory, handleAddToCartAnalytics, addSubCategory, useDraggable, activeTheme };

    var categoryType = 'default'
    if (store?.componentSkin[2]?.activeSkin && store?.componentSkin[2]?.activeSkin !== '') {
        categoryType = store?.componentSkin[2]?.activeSkin || 'default';
    } else {
        categoryType = 'default';
    }


    return (
        <div className=' w-full'>
            <NewProductList productListProps={productListProps} productListType={categoryType} />
        </div>
    );
}

export default T1NewProducts;
