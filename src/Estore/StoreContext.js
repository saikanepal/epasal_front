import React, { createContext, useState, useContext } from 'react';

const StoreContext = createContext();

export const useStore = () => {
    return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
    const [store, setStore] = useState({
        name: 'Store Name',
        logo: '',
        categories: [
            { name: 'Men' },
            { name: 'Women' },
            { name: 'Unisex' }
        ],
        subCategories: [
            { name: 'Watch' },
            { name: 'Jacket' },
            { name: 'Pants' }
        ],
        products: [
            {
                id: 1,
                name: 'Watch1',
                image: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw34d84041/images/Titan/Catalog/1698KM02_1.jpg?sw=800&sh=800',
                categories: ['Men'],
                subcategories: ['Watch'],
                sizes: ['S', 'M', 'L'],
                variants: [
                    { type: 'Color', option: 'Black', prices: [50, 60, 70] },
                    { type: 'Color', option: 'White', prices: [55, 65, 75] },
                    { type: 'Color', option: 'Red', prices: [60, 70, 80] }
                ]
            }, {
                id: 2,
                name: 'Watch2',
                image: 'https://cdn.thewirecutter.com/wp-content/media/2023/10/smartwatches-2048px-3x2-1.jpg?auto=webp&quality=75&crop=3:2&width=1024',
                categories: ['Men'],
                subcategories: ['Watch'],
                sizes: ['S', 'M', 'L'],
                variants: [
                    { type: 'Color', option: 'Black', prices: [50, 60, 70] },
                    { type: 'Color', option: 'White', prices: [55, 65, 75] },
                    { type: 'Color', option: 'Red', prices: [60, 70, 80] }
                ]
            },
            {
                id: 3,
                name: 'Watch3',
                image: 'https://media.wired.com/photos/650c80a777e4baffa125b82b/4:3/w_1805,h_1354,c_limit/Apple-Watch-SE-Gen-2-Featured-Gear.jpg',
                categories: ['Men'],
                subcategories: ['Watch'],
                sizes: ['S', 'M', 'L'],
                variants: [
                    { type: 'Color', option: 'Black', prices: [50, 60, 70] },
                    { type: 'Color', option: 'White', prices: [55, 65, 75] },
                    { type: 'Color', option: 'Red', prices: [60, 70, 80] }
                ]
            }, {
                id: 4,
                name: 'Watch4',
                image: 'https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdhdGNoZXN8ZW58MHx8MHx8fDA%3D',
                categories: ['Men'],
                subcategories: ['Watch'],
                sizes: ['S', 'M', 'L'],
                variants: [
                    { type: 'Color', option: 'Black', prices: [50, 60, 70] },
                    { type: 'Color', option: 'White', prices: [55, 65, 75] },
                    { type: 'Color', option: 'Red', prices: [60, 70, 80] }
                ]
            }, {
                id: 5,
                name: 'Watch5',
                image: 'https://www.fastrack.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dwbc347167/images/Fastrack/Catalog/38074AP04_1.jpg?sw=800&sh=800',
                categories: ['Men'],
                subcategories: ['Watch'],
                sizes: ['S', 'M', 'L'],
                variants: [
                    { type: 'Color', option: 'Black', prices: [50, 60, 70] },
                    { type: 'Color', option: 'White', prices: [55, 65, 75] },
                    { type: 'Color', option: 'Red', prices: [60, 70, 80] }
                ]
            }, {
                id: 6,
                name: 'Watch6',
                image: 'https://www.cnet.com/a/img/resize/939c151970e70d040f0e2b8f1ff4ed0c8f650939/hub/2023/07/28/30aaf33c-b641-40b2-99f8-4022c0209bb3/t5a6683.jpg?auto=webp&fit=crop&height=675&width=1200',
                categories: ['Men'],
                subcategories: ['Watch'],
                sizes: ['S', 'M', 'L'],
                variants: [
                    { type: 'Color', option: 'Black', prices: [50, 60, 70] },
                    { type: 'Color', option: 'White', prices: [55, 65, 75] },
                    { type: 'Color', option: 'Red', prices: [60, 70, 80] }
                ]
            },
            {
                id: 7,
                name: 'Product 2 - Jacket',
                image: 'https://i.ebayimg.com/images/g/4vcAAOSwgIBjwnYO/s-l1200.jpg',
                categories: ['Women'],
                subcategories: ['Jacket'],
                sizes: ['S', 'M', 'L'],
                variants: [
                    { type: 'Color', option: 'Blue', prices: [70, 80, 90] },
                    { type: 'Color', option: 'Green', prices: [75, 85, 95] },
                    { type: 'Color', option: 'Yellow', prices: [80, 90, 100] }
                ]
            },
            {
                id: 8,
                name: 'Product 3 - Pants',
                image: 'https://example.com/pants_product3.jpg',
                categories: ['Unisex'],
                subcategories: ['Pants'],
                sizes: ['S', 'M', 'L'],
                variants: [
                    { type: 'Color', option: 'Black', prices: [40, 45, 50] },
                    { type: 'Color', option: 'Gray', prices: [45, 50, 55] },
                    { type: 'Color', option: 'Navy', prices: [50, 55, 60] }
                ]
            },
            // Add more products here...
        ]
        ,
        color: {
            backgroundThemeColor: '#fcfdfd',
            navColor: {
                backgroundnavColor: '#fcfdfd',
                storeNameTextColor: '#000000',
                categoryTextColor: '#1d2830',
                searchBarColor: '#fcf3f3',
            },
            headerColor: {
                headerText: "#59CE8F",
                headerBackground: "#000000"
            },
            subcategoryColor: {
                background: '#ffffff',
                text: '#333333',
                border: '#ffffff'
            },
            subProductColor: {
                categoryColor: "#ffffff",
                backgroundColor: '#fefbfb',
                textColor: '#333333',
                borderColor: '#cccccc',
                selectedBackground: '##c8bcbc'
            },
            productListColor: { // Define productListColor object
                backgroundColor: '#fefbfb',
                textColor: '#333333',
                borderColor: '#cccccc',
                selectedBackground: '#c8bcbc'
            }
        },
        secondaryBanner: '../Assets/secondarybanner.jpg',
        previewMode: true,
        selectedSubCategory: 'Watch',
        cart: [], // New cart array to store product IDs
    });

    const addProduct = (newProduct) => {
        setStore((prevState) => ({
            ...prevState,
            products: [...prevState.products, newProduct],
        }));
    };

    const updateSecondaryBanner = (newBannerUrl) => {
        setStore((prevState) => ({
            ...prevState,
            secondaryBanner: newBannerUrl,
        }));
    };
    const addToCart = (productId) => {
        if (!store.cart.includes(productId)) {
            setStore((prevState) => ({
                ...prevState,
                cart: [...prevState.cart, productId],
            }));
        }
    };


    const setSelectedSubCategory = (subcategoryName) => {
        setStore((prevState) => ({
            ...prevState,
            selectedSubCategory: subcategoryName,
        }));
    };

    const addCategory = (newCategory) => {
        if (newCategory.trim() === '') {
            console.error('Category name cannot be empty.');
            return;
        }

        if (store.categories.some(category => category.name === newCategory.trim())) {
            console.error('Category already exists.');
            return;
        }

        setStore(prevState => ({
            ...prevState,
            categories: [...prevState.categories, { name: newCategory.trim() }]
        }));
    };

    const addSubCategory = (newCategory) => {
        if (newCategory.trim() === '') {
            console.error('Subcategory name cannot be empty.');
            return;
        }

        if (store.subCategories.some(subcategory => subcategory.name === newCategory.trim())) {
            console.error('Subcategory already exists.');
            return;
        }

        setStore(prevState => ({
            ...prevState,
            subCategories: [...prevState.subCategories, { name: newCategory.trim() }]
        }));
    };

    const removeCategory = (index) => {
        if (index < 0 || index >= store.categories.length) {
            console.error('Invalid index for category removal.');
            return;
        }

        setStore(prevState => ({
            ...prevState,
            categories: prevState.categories.filter((_, i) => i !== index)
        }));
    };

    const removeSubCategory = (index) => {
        if (index < 0 || index >= store.subCategories.length) {
            console.error('Invalid index for subcategory removal.');
            return;
        }

        setStore(prevState => ({
            ...prevState,
            subCategories: prevState.subCategories.filter((_, i) => i !== index)
        }));
    };

    return (
        <StoreContext.Provider
            value={{
                store,
                setStore,
                addCategory,
                addSubCategory,
                removeCategory,
                removeSubCategory,
                setSelectedSubCategory,
                addToCart,
                updateSecondaryBanner,
                addProduct
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};
