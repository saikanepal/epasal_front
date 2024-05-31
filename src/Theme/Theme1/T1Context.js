import React, { createContext, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import useFetch from '../../Hooks/useFetch';
import { AuthContext } from '../../Hooks/AuthContext';
const StoreContext = createContext();

export const useStore = () => {
    return useContext(StoreContext);
};

export const StoreProvider = ({ children, passedStore }) => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, onCloseError } = useFetch();

    const { storeID } = useParams(); // Extract storeID using useParams
    console.log(storeID);

    const defaultStoreData = {
        name: 'Store Name',
        location: 'Your Store Location',
        email: 'store@example.com',
        phoneNumber: '+1234567890',
        logo: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305',
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
            // {
            //     id: 1,
            //     name: 'Watch1',
            //     image: 'https://cdn4.ethoswatches.com/the-watch-guide/wp-content/uploads/2020/01/Parmigiani-Fleurier-Toric-Chronometer-Michel-Vintage-Inspired-Watch-Retro-Nostalgic-1-1.jpg?tr=q-70',
            //     categories: ['Men'],
            //     subcategories: ['Watch'],
            //     sizes: ['S', 'M', 'L'],
            //     variants: [
            //         { type: 'Color', option: 'Black', prices: [50, 60, 70] },
            //         { type: 'Color', option: 'White', prices: [55, 65, 75] },
            //         { type: 'Color', option: 'Red', prices: [60, 70, 80] }
            //     ]
            // },
            // {
            //     id: 2,
            //     name: 'Watch2',
            //     image: 'https://i.etsystatic.com/8887640/r/il/630e09/5842875807/il_fullxfull.5842875807_poyj.jpg',
            //     categories: ['Men'],
            //     subcategories: ['Watch'],
            //     sizes: ['S', 'M', 'L'],
            //     variants: [
            //         { type: 'Color', option: 'Black', prices: [50, 60, 70] },
            //         { type: 'Color', option: 'White', prices: [55, 65, 75] },
            //         { type: 'Color', option: 'Red', prices: [60, 70, 80] }
            //     ]
            // },
            {
                id: 3,
                name: 'Watch3',
                image: 'https://w7.pngwing.com/pngs/416/422/png-transparent-wrist-watch.png',
                categories: ['Men'],
                subcategories: ['Watch'],
                sizes: ['S', 'M', 'L'],
                variants: [
                    { type: 'Image', option: 'https://w7.pngwing.com/pngs/416/422/png-transparent-wrist-watch.png', prices: [50, 60, 70] },
                    { type: 'Image', option: 'https://w7.pngwing.com/pngs/416/422/png-transparent-wrist-watch.png', prices: [55, 65, 75] },
                ]
            }, {
                id: 4,
                name: 'Watch4',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4d5te_kUPD-pUQ69hVjP1x1yuS59y-ksjw&s',
                categories: ['Men'],
                subcategories: ['Watch'],
                sizes: ['S', 'M', 'L'],
                variants: [
                    { type: 'Image', option: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4d5te_kUPD-pUQ69hVjP1x1yuS59y-ksjw&s', prices: [50, 60, 70] },
                    { type: 'Image', option: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4d5te_kUPD-pUQ69hVjP1x1yuS59y-ksjw&s', prices: [55, 65, 75] },
                ]
            },
            {
                id: 5,
                name: 'Watch5',
                image: 'https://d2xamzlzrdbdbn.cloudfront.net/products/5a3c2380-816a-43a9-a34d-88a743874d55_416x416.jpg',
                categories: ['Men'],
                subcategories: ['Watch'],
                sizes: ['S', 'M', 'L'],
                variants: [
                    { type: 'Image', option: 'https://d2xamzlzrdbdbn.cloudfront.net/products/5a3c2380-816a-43a9-a34d-88a743874d55_416x416.jpg', prices: [50, 60, 70] },
                    { type: 'Image', option: 'https://d2xamzlzrdbdbn.cloudfront.net/products/5a3c2380-816a-43a9-a34d-88a743874d55_416x416.jpg', prices: [55, 65, 75] },
                ]
            },
            // {
            //     id: 6,
            //     name: 'Watch6',
            //     image: 'https://i.pinimg.com/originals/2f/7a/9f/2f7a9f72f64dfb34a9942cf3f15f6ed4.jpg',
            //     categories: ['Men'],
            //     subcategories: ['Watch'],
            //     sizes: ['S', 'M', 'L'],
            //     variants: [
            //         { type: 'Color', option: 'Black', prices: [50, 60, 70] },
            //         { type: 'Color', option: 'White', prices: [55, 65, 75] },
            //         { type: 'Color', option: 'Red', prices: [60, 70, 80] }
            //     ]
            // },
            // {
            //     id: 7,
            //     name: 'Product 2 - Jacket',
            //     image: 'https://img4.dhresource.com/webp/m/0x0/f3/albu/km/y/03/8527bf64-ccfa-4ba8-869d-d27318be5fe5.jpg',
            //     categories: ['Women'],
            //     subcategories: ['Jacket'],
            //     sizes: ['S', 'M', 'L'],
            //     variants: [
            //         { type: 'Color', option: 'Blue', prices: [70, 80, 90] },
            //         { type: 'Color', option: 'Green', prices: [75, 85, 95] },
            //         { type: 'Color', option: 'Yellow', prices: [80, 90, 100] }
            //     ]
            // },
            // {
            //     id: 8,
            //     name: 'Product 3 - Pants',
            //     image: 'https://urbanwearoutsiders.com/cdn/shop/products/H1fe8973abaae4b30aa2e18a0a3e8bec3V.jpg?v=1660239498',
            //     categories: ['Unisex'],
            //     subcategories: ['Pants'],
            //     sizes: ['S', 'M', 'L'],
            //     variants: [
            //         { type: 'Color', option: 'Black', prices: [40, 45, 50] },
            //         { type: 'Color', option: 'Gray', prices: [45, 50, 55] },
            //         { type: 'Color', option: 'Navy', prices: [50, 55, 60] }
            //     ]
            // },

            // Add more products here...
        ]
        ,
        color: {
            backgroundThemeColor: '#B6947D',
            navColor: {
                backgroundnavColor: '#B6947D',
                storeNameTextColor: '#000000',
                categoryTextColor: '#1d2830',
                searchBarColor: '#fcf3f3',
            },
            headerColor: {
                headerText: "#ffffff",
                headerBackground: "#7a5C5c"
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
            productSection: "ffffff",
            productListColor: { // Define productListColor object
                productBackground: "ffffff",
                backgroundColor: '#fefbfb',
                priceColor: "B5A297",
                textColor: '#4F3100',
                borderColor: '#4F3100',
                buttonBackgroundColor: '#ffffff'
            },
            footerColor: {
                background: '#333333',
                textColor: '#ffffff',
                linkColor: '#59CE8F'
            }
        },

        secondaryBanner: '../Assets/secondarybanner.jpg',
        previewMode: true,
        selectedSubCategory: 'Watch',
        cart: [], // New cart array to store product IDs

        socialMediaLinks: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: ''
        },
        footerDescription: 'A modern online store for all your needs.',
        fetchedFromBackend: false,
        // Rest of the default store data...
    };

    useEffect(() => {
        console.log(passedStore)
    }, [passedStore]);
    const [store, setStore] = useState(defaultStoreData); // Start with null while fetching

    useEffect(() => {
        const fetchStoreData = async () => {
            try {
                console.log("inside fetching");
                // Fetch store data from the server using the provided store ID
                const response = await sendRequest(
                    `store/get/${storeID}`, // Replace 'your-api-endpoint' with your actual API endpoint
                    'GET',
                    null,
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + auth.token,
                    }
                ); // Use storeID from useParams
                console.log(response);
                setStore({
                    ...response.store,
                    fetchedFromBackend: true, // Set fetchedFromBackend to true when data is fetched
                });
            } catch (error) {
                // If an error occurs during fetch, set default store data
                setStore(defaultStoreData);
                console.error('Error fetching store data:', error);
            }
        };

        if (window.location.pathname.includes('/store/')) {
            fetchStoreData();
        } else {
            setStore(defaultStoreData);
        }
    }, [storeID]);


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


    if (isLoading) {
        return (
            <div>
                is Loading
            </div>
        )
    }
    else
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

