import React, { useEffect, useState, useRef } from 'react';
import { useStore } from '../StoreContext';
import ProductCard from './ProductCard'; // Import the ProductCard component
import AddProduct from './AddProduct'; // Import the AddProduct component
import { useDraggable } from "react-use-draggable-scroll";

const SubProduct = () => {
    const ref = useRef();
    const { store ,setStore} = useStore();
    const { products, selectedSubCategory, categories, subCategories } = store;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedStyles, setSelectedStyles] = useState({});
    const [showAddProduct, setShowAddProduct] = useState(false);
    const containerRef = useRef(null);
    const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:
    // Filter products based on the selected subcategory
    useEffect(() => {
        const filtered = products.filter(product =>
            product.subcategories.includes(selectedSubCategory)
        );
        setFilteredProducts(filtered);
        // Scroll back to the start whenever selectedSubCategory changes
        if (containerRef.current) {
            containerRef.current.scrollLeft = 0;
        }
    }, [products, selectedSubCategory]);

    // Handle style selection
    const handleStyleSelect = (productId, styleIndex) => {
        setSelectedStyles(prevStyles => ({
            ...prevStyles,
            [productId]: prevStyles[productId] === styleIndex ? null : styleIndex,
        }));
    };

    const handleRemoveProduct = (productId) => {
        setStore(prevStore => ({
            ...prevStore,
            products: prevStore.products.filter(product => product.id !== productId)
        }));
    };


    const toggleAddProduct = () => {
        setShowAddProduct(prev => !prev);
    };

    const subProductColor = store.color.subProductColor;

    return (
        <div className=' px-5'>
            <div className="px-8 pb-8 font-Cinzel overflow-x-auto" style={{
                maxWidth: '100vw', backgroundColor: subProductColor.categoryColor
            }}
                {...events}
                ref={ref}
            >
                <div ref={containerRef} className="flex py-4 gap-12 pb-6 overflow-x-scroll scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ scrollbarWidth: 'thin', scrollbarColor: '#718096 #CBD5E0' }}>
                    {filteredProducts.map(product => (
                        <div key={product.id} className="flex-none mr-4">
                            <ProductCard
                                product={product}
                                selectedStyle={selectedStyles[product.id]}
                                handleStyleSelect={handleStyleSelect}
                                handleRemoveProduct={handleRemoveProduct}
                                store={store} // Pass the store object as a prop
                            />
                        </div>
                    ))}
                    <div className="flex-none mr-4">
                        <button onClick={toggleAddProduct} className="flex flex-col items-center justify-center w-32 h-40 border border-dashed border-gray-300 rounded-md hover:bg-gray-50/50 focus:outline-none">
                            <svg className="w-12 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <span className="text-gray-900">Add Product</span>
                        </button>
                    </div>
                </div>
                {showAddProduct && <AddProduct onClose={toggleAddProduct} />}
            </div>
        </div>
    );
};

export default SubProduct;
