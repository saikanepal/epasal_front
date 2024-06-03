import React, { useState, useEffect } from 'react';
import { useStore } from '../../Theme/Theme1/T1Context';
import ProductList1 from './ProductList1';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';


const ProductList = () => {
    const { store, setStore } = useStore();
    const { products } = store;
    const { productListColor } = store.color;

    // Set initial state for search query
    const [searchQuery, setSearchQuery] = useState('');

    // Filtered products state
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Function to handle search query change
    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Delayed filtering function
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, products]);

    const handleDeleteProduct = (productId) => {
        setStore(prevStore => ({
            ...prevStore,
            products: prevStore.products.filter(product => product.id !== productId)
        }));
    };

    return (
        <>
            <div className='space-y-10 flex items-center flex-col'>
                <h1 className="text-3xl font-semibold">Featured Products</h1>
                <ProductList1
                    products={filteredProducts}
                    productListColor={productListColor}
                    handleDeleteProduct={handleDeleteProduct}
                />
            </div>
            <Link>
                <button className="w-full flex items-center justify-end font-semibold pt-6 px-4 transition ease-in duration-200 border-nore focus:outline-none">
                    <span>View More</span> <IoIosArrowForward />
                </button>
            </Link>
        </>

    );
};

export default ProductList;
