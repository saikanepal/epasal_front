import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CartDropDown from './CartDropDown';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Theme2Navbar = ({ color, store, addToCart, setStore }) => {
    const [scrolling, setScrolling] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const location = useLocation();  // Get current location
    const [searchParams] = useSearchParams(); // Hook to access query parameters

    // Function to check if a specific filter is active
    const isActiveFilter = (filter) => {
        return searchParams.get('filter') === filter;
    };

    const toggleCartDropdown = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <motion.nav
            className={`flex items-center justify-between px-6 py-6 shadow-md fixed w-full z-20 transition-all duration-300 ${scrolling ? 'bg-brown-700' : 'bg-transparent'}`}
            style={{
                fontFamily: store?.fonts?.Navbar,
                backgroundColor: color?.navColor?.backgroundnavColor,
                color: color?.navColor?.storeNameTextColor,
            }}
        >
            {/* Logo on the left */}
            <div className="flex items-center">
                <div className="cursor-pointer flex items-center">
                    <img
                        src={store?.logo?.logoUrl || 'https://via.placeholder.com/50'}
                        alt="Logo"
                        className="h-8 mr-4 rounded-full"
                    />
                </div>
                <span className="text-xl font-bold cursor-pointer">
                    {store?.name}
                </span>
            </div>

            {/* Links in the middle */}
            <div className="flex space-x-8">
                <Link
                    to={!store.isEdit && store.fetchedFromBackend && `/store/products/${store.name}`}
                    className={`py-1 px-6 rounded-lg ${location.pathname === `/store/products/${store.name}` ? 'bg-blue-500' : 'hover:underline'}`}>
                    All Products
                </Link>

                <Link
                    to={!store.isEdit && store.fetchedFromBackend && `/store/products/${store.name}/?filter=featured`}
                    className={`py-1 px-6 rounded-lg ${isActiveFilter('featured') ? 'bg-blue-500' : 'hover:underline'}`}>
                    Featured
                </Link>

                <Link
                    to={!store.isEdit && store.fetchedFromBackend && `/store/products/${store.name}/?filter=offers`}
                    className={`py-1 px-6 rounded-lg ${isActiveFilter('offers') ? 'bg-blue-500' : 'hover:underline'}`}>
                    Offers
                </Link>
            </div>

            {/* Cart on the right */}
            <div className="flex items-center space-x-4 relative">
                <button className="focus:outline-none" onClick={toggleCartDropdown} aria-label="Open Cart">
                    <AiOutlineShoppingCart className="mt-1 size-6" />
                    {store?.cart?.length > 0 && (
                        <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs absolute -top-1 -right-1">
                            {store?.cart?.length}
                        </span>
                    )}
                </button>

                {isCartOpen && (
                    <CartDropDown
                        cart={store?.cart}
                        addToCart={addToCart}
                        deleteFromCart={() => { }}
                        backgroundColor={color?.navColor?.backgroundnavColor}
                        store={store}
                        setStore={setStore}
                    />
                )}
            </div>
        </motion.nav>
    );
};

export default Theme2Navbar;
