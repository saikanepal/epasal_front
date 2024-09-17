import React, { useRef, useState, useEffect, useContext } from 'react';
import useFetch from '../../../Hooks/useFetch';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Hooks/AuthContext';
import { MdOutlineNavigateNext,MdOutlineNavigateBefore } from "react-icons/md";
const SubProduct1 = ({
    products, categories, subCategories, previewMode, store, CategorySelector, setStore, AddProduct, ProductCard, useDraggable
    , addToCart,handleAddToCartAnalytics,setSelectedSubCategory, removeSubCategory }) => {
    const ref = useRef();
    const containerRef = useRef(null);
    const { events } = useDraggable(ref);
    const { sendRequest } = useFetch();
    const auth = useContext(AuthContext);
    const selectedSubCategory = store.selectedSubCategory || subCategories[0].name;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [paginatedProducts,setPaginatedProducts]=useState([]);
    const [selectedStyles, setSelectedStyles] = useState({});
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [pageNo,setPageNo]=useState(1);
    useEffect(() => {
        const filtered = products.filter(product =>
            product.subcategories && product.subcategories.includes(selectedSubCategory)
        );
        setFilteredProducts(filtered);

        if (containerRef.current) {
            containerRef.current.scrollLeft = 0;
        }
    }, [products, selectedSubCategory]);
    useEffect(()=>{
        setPaginatedProducts(filteredProducts.length>3?filteredProducts.slice(0,3):filteredProducts)
    },[filteredProducts])
    useEffect(()=>{
        setPaginatedProducts(filteredProducts.slice((pageNo-1)*3,(pageNo)*3))
    },[pageNo])
    const handleStyleSelect = (productId, styleIndex) => {
        setSelectedStyles(prevStyles => ({
            ...prevStyles,
            [productId]: prevStyles[productId] === styleIndex ? null : styleIndex,
        }));
    };

    const handleRemoveProduct = async (productName) => {
        if (store.isEdit) {
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

    const toggleAddProduct = () => {
        setShowAddProduct(prev => !prev);
    };

    const subProductColor = store.color.subProductColor;

    const handlePaginationValue=(e,index)=>{
        e.preventDefault();
        if(index===1){
            if(pageNo*3<filteredProducts.length)
                setPageNo(pageNo+1)
        }else{
            if(pageNo>1)
                setPageNo(pageNo-1)
        }
    }
    return (
        <div className='flex mb-16 px-10 gap-10' style={{ fontFamily: store?.fonts?.Categories ,backgroundColor: subProductColor.categoryColor}}>
            <CategorySelector store={store} setSelectedSubCategory={setSelectedSubCategory} removeSubCategory={removeSubCategory} />
            <div className="px-4 pb-8 overflow-x-scroll flex-grow"
                {...events}
                ref={ref}
            >
                <div ref={containerRef} className="  flex py-4">
                    {/* <style>{`
                            .scrollbar::-webkit-scrollbar {
                                height: 12px;
                            }
                            .scrollbar::-webkit-scrollbar-track {
                                background: ${subProductColor.scrollbarColor};
                                border: 5px solid ${subProductColor.categoryColor};
                            }
                            .scrollbar::-webkit-scrollbar-thumb {
                                background-color: ${subProductColor.scrollbarColor};
                                border-radius: 10px;
                            }
                        `}</style> */}
                    <div className='flex flex-grow justify-around'>
                        <button className='' onClick={e=>handlePaginationValue(e,0)}>
                            <MdOutlineNavigateBefore className='w-10 h-10 rounded-full ' style={{backgroundColor:subProductColor.scrollbarColor, color:subProductColor.categoryColor}}/>
                            
                        </button>
                        <div className='flex'>
                        {paginatedProducts.map((product, index) => (
                            <div key={index} className="flex-none mr-4 ml-2">
                                <ProductCard
                                    product={product}
                                    selectedStyle={selectedStyles[product.id]}
                                    handleStyleSelect={handleStyleSelect}
                                    handleRemoveProduct={handleRemoveProduct}
                                    store={store}
                                    addToCart={addToCart}
                                    handleAddToCartAnalytics={handleAddToCartAnalytics}
                                />
                            </div>
                        ))}
                         {(!previewMode || store.isEdit) && (
                        <div className="flex items-center mr-4 h-full">
                            <button onClick={toggleAddProduct} className="flex flex-col items-center justify-center w-32 h-40 border border-dashed border-gray-300 rounded-md hover:bg-gray-50/50 focus:outline-none">
                                <svg className="w-12 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <span className="text-gray-900">Add Product</span>
                            </button>
                        </div>
                        )}
                        </div>
                        <button className=''>
                            <MdOutlineNavigateNext  className='w-10 h-10 rounded-full' style={{backgroundColor:subProductColor.scrollbarColor, color:subProductColor.categoryColor}} onClick={e=>handlePaginationValue(e,1)}/>
                        </button>
                    </div>
                   
                </div>
                {showAddProduct && <AddProduct onClose={toggleAddProduct} store={store} setStore={setStore}/>}
            </div>
        </div>
    );
};

export default SubProduct1;