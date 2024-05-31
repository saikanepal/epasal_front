import React, { useState, useEffect } from 'react';
import { useStore } from '../../Theme/Theme1/T1Context';
import ProductList1 from './ProductList1';

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
        <div className='px-3 md:px-16 lg:px-28 space-y-10 flex flex-col'>
            <input
                type="text"
                placeholder="Search products by name..."
                className="px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
                value={searchQuery}
                onChange={handleSearchQueryChange}
            />
            <ProductList1
                products={filteredProducts}
                productListColor={productListColor}
                handleDeleteProduct={handleDeleteProduct}
            />
        </div>
    );
};

export default ProductList;
