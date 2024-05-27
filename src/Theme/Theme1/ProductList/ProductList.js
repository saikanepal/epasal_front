import React, { useState, useEffect } from 'react';
import { useStore } from '../T1Context';
import ProductListCard from './ProductListCard';

const ProductList = () => {
    const { store ,setStore} = useStore();
    const { products } = store;
    const {productListColor} = store.color;


    // Set initial state for search query
    const [searchQuery, setSearchQuery] = useState('');

    // Filtered products state
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Function to handle search query change


    // Delayed filtering function
    useEffect(() => {
        // Set a timeout to filter products after 1 second of inactivity
        const timeoutId = setTimeout(() => {
            // Filter products based on the search query
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            console.log(filtered);
            setFilteredProducts(filtered);
        }, 1000);

        // Clear the timeout on each key stroke to restart the countdown
        return () => clearTimeout(timeoutId);
    }, [searchQuery, products]); // Update the dependency array



    const handleDeleteProduct = (productId) => {
        setStore(prevStore => ({
            ...prevStore,
            products: prevStore.products.filter(product => product.id !== productId)
        }));
    };

    
    return (
        <div className='px-3 md:px-5 space-y-10 flex flex-col items-center' 
            style={{backgroundColor:productListColor.productBackground}}
        >
            {/* Search input field */}
            {/* <input
                type="text"
                placeholder="Search products by name..."
                className="px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
                value={searchQuery}
                onChange={handleSearchQueryChange}
            /> */}
            <div className="font-Cinzel grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-8 mt-4 md:mt-8">
                {products.map(product => (
                    <ProductListCard key={product.id} product={product} handleDeleteProduct={handleDeleteProduct} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
