import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { FaShoppingCart, FaSearch, FaTimes } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import CartDropdown from './CartDropDown';
import CartDropdown from '../../Allproducts/CartDropDown';
import axios from 'axios';

const Navbar1 = ({
    setNewCategory,
    store,
    setStore,
    color,
    previewMode,
    isSidebarOpen,
    searchInput,
    setIsSidebarOpen,
    setSearchInput,
    setLogoFile,
    isEdit, fetchedFromBackend, highlightedButtonId, onClick, newProductRef, categoryRef
}) => {
    const [scrolling, setScrolling] = useState(false);
    const [editableText, setEditableText] = useState("Ecom Template-2");
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchParams] = useSearchParams(); // Hook to access query parameters
    const sidebarRef = useRef();
    const [searchItem, setSearchItem] = useState([])
    const [isAnimating, setIsAnimating] = useState(true);
    const [activeSection, setActiveSection] = useState(null); // Track manually clicked sections

    const [cartItems, setCartItems] = useState([
    ]);


    const linkClass = (path) =>
        location.pathname === path
            ? 'bg-blue-500 text-white hover:underline'  // Active link style
            : 'hover:underline';

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 8000); // Duration of the animation in milliseconds

        return () => clearTimeout(timer);
    }, []);
    const cart = [
        {
            product: "Item 1",
            price: 100,
            discountAmount: 10,
            count: 4,
            selectedvariant: [
                {
                    name: "default",
                    options: {
                        name: "default"
                    }
                }
            ]
        },
        {
            product: "Item 2",
            price: 200,
            discountAmount: 20,
            count: 4,
            selectedvariant: [
                {
                    name: "default",
                    options: {
                        name: "default"
                    }
                }
            ]
        }
    ];

    const handleProductClick = (product) => {
        localStorage.setItem('product', JSON.stringify(product));
        localStorage.setItem('store', JSON.stringify(store));


        if (fetchedFromBackend && !isEdit)
            navigate("/productlanding", { state: { product, store } })
    };

    const loadCartFromLocalStorage = () => {

        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                if (Array.isArray(parsedCart)) {

                    setStore(prevStore => ({ ...prevStore, cart: parsedCart }));
                } else {
                    console.warn('Invalid cart data in localStorage');
                }
            } catch (error) {
                console.error('Error parsing cart data from localStorage:', error);
            }
        } else {

        }
    };
    useEffect(() => {
        loadCartFromLocalStorage();

    }, [setStore]);
    const handleButtonClick = () => {
        if (onClick) {
            onClick();
        }
    };

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        const saveCartToLocalStorage = () => {
            // Load existing cart data from localStorage
            const savedCart = localStorage.getItem('cart');

            // Initialize mergedCart with store.cart
            let mergedCart = [...store.cart];

            if (savedCart) {
                try {
                    const parsedCart = JSON.parse(savedCart);

                    if (Array.isArray(parsedCart)) {
                        // Merge store.cart with existing localStorage cart, ignoring common elements
                        mergedCart = [
                            ...parsedCart.filter(item => !store.cart.some(storeItem => storeItem.id === item.id)),
                            ...store.cart
                        ];
                    } else {
                        console.warn('Invalid cart data in localStorage');
                    }
                } catch (error) {
                    console.error('Error parsing cart data from localStorage:', error);
                }
            }

            // Save mergedCart to localStorage

            localStorage.setItem('cart', JSON.stringify(mergedCart));
        };

        saveCartToLocalStorage(); // Invoke the function on mount and whenever store.cart changes

    }, [store.cart]);



    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const deleteFromCart = (product) => {
        const { product: name, price, selectedVariant } = product;

        // Find the index of the item in cart
        const existingCartItemIndex = store.cart.findIndex(item =>
            item.product === name &&
            item.price === price &&
            JSON.stringify(item.selectedVariant) === JSON.stringify(selectedVariant)
        );

        // If item exists in cart
        if (existingCartItemIndex !== -1) {
            const updatedCart = [...store.cart];

            // Decrease quantity or remove item if count is 1
            if (updatedCart[existingCartItemIndex].count === 1) {
                updatedCart.splice(existingCartItemIndex, 1);
            } else {
                updatedCart[existingCartItemIndex] = {
                    ...updatedCart[existingCartItemIndex],
                    count: updatedCart[existingCartItemIndex].count - 1
                };
            }

            // Update React state
            setStore(prevState => ({
                ...prevState,
                cart: updatedCart,
                cartCount: prevState.cartCount - 1
            }));

            // Update localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            localStorage.setItem('cartCount', (store.cartCount - 1).toString());
        }
    };
    const handleInputChange = (e) => {
        if (!previewMode) {
            setNewCategory(e.target.value);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const onDrop = (acceptedFiles) => {
        if (!previewMode) {
            const file = acceptedFiles[0];
            if (file) {
                setLogoFile(file);
                const reader = new FileReader
                reader.onload = () => {
                    setStore(prevState => ({
                        ...prevState,
                        logo: {
                            ...prevState.logo,
                            logoUrl: reader.result
                        }
                    }));
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleIncreaseQuantity = (index) => {
        setStore(prevStore => {
            const updatedCart = [...prevStore.cart];
            updatedCart[index] = {
                ...updatedCart[index],
                count: updatedCart[index].count + 1
            };
            return { ...prevStore, cart: updatedCart };
        });
    };

    const handleDecreaseQuantity = (index) => {
        setStore(prevStore => {
            if (prevStore.cart[index].count > 1) {
                const updatedCart = [...prevStore.cart];
                updatedCart[index] = {
                    ...updatedCart[index],
                    count: updatedCart[index].count - 1
                };
                return { ...prevStore, cart: updatedCart };
            }
            return prevStore; // No change if count is 1
        });
    };

    const handleDeleteFromCart = (item) => {
        setStore(prevStore => {
            const updatedCart = prevStore.cart.filter(cartItem => cartItem !== item);
            return { ...prevStore, cart: updatedCart };
        });
        deleteFromCart(item); // Call the prop function to delete item from cart
    };


    const handleCartClick = () => {
        setIsCartOpen(!isCartOpen);
        // Log the cart items to the console
    };

    const handleEditableTextChange = (e) => {
        setEditableText(e.target.value);
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}product/getStoreProducts/${store.name}`, {
                params: {
                    page: 1,
                    limit: 5,
                    productName: searchInput // Pass the name filter to the backend
                }
            });
            const data = response.data;
            setSearchItem(response.data.products)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => { console.log(searchItem, "search item") }, [searchItem])
    const handleSearchIconClick = () => {
        if (searchInput === '')
            setIsSearchClicked(!isSearchClicked)
        else fetchProducts();
    };

    const handleClickNavigation = (e, myRef, section) => {
        e.preventDefault();
        setActiveSection(section);
        myRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Set active section when the section comes into view
                        if (entry.target === newProductRef.current) {
                            setActiveSection('new');
                        } else if (entry.target === categoryRef.current) {
                            setActiveSection('categories');
                        }
                    } else {
                        // Remove active state when scrolling out of the section
                        if (entry.target === newProductRef.current && activeSection === 'new') {
                            setActiveSection(null);
                        } else if (entry.target === categoryRef.current && activeSection === 'categories') {
                            setActiveSection(null);
                        }
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of the section is in view
        );

        if (newProductRef.current) observer.observe(newProductRef.current);
        if (categoryRef.current) observer.observe(categoryRef.current);

        return () => {
            if (newProductRef.current) observer.unobserve(newProductRef.current);
            if (categoryRef.current) observer.unobserve(categoryRef.current);
        };
    }, [activeSection]);

    const isActiveFilter = (filter) => {
        return searchParams.get('filter') === filter;
    };


    return (
        <motion.nav
            className={`flex flex-col gap-2 items-center pt-2 md:pb-5 justify-between shadow-md fixed w-screen z-40 transition-all duration-300 ${scrolling ? 'bg-brown-700' : 'bg-transparent'}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 120 }}
            style={{
                fontFamily: store?.fonts?.Navbar,
                backgroundColor: scrolling ? color?.navColor?.backgroundnavColor : 'transparent',
                color: color.navColor.storeNameTextColor,
            }}
        >
            <div className={`flex px-6 lg:px-20 ${scrolling ? "" : " md:py-2 md:mb-3"} justify-between items-center w-full`}>
                {!scrolling && (
                    <div className="flex w-full justify-between items-center relative ">
                        {!isSidebarOpen && (
                            <button
                                style={{ color: color.navColor.storeNameTextColor }}
                                className="block focus:outline-none md:hidden mr-2"
                                onClick={toggleSidebar}
                            >
                                <FiMenu className="h-6 w-6 fill-current" />
                            </button>
                        )}
                        <div className='flex flex-col md:flex-row gap-2 items-center md:justify-between'>
                            {previewMode ? (
                                store.logo && (
                                    <img
                                        src={store?.logo?.logoUrl}
                                        alt="Logo"
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                )
                            ) : (
                                <div {...getRootProps()} className="cursor-pointer flex items-center">
                                    <input {...getInputProps()} />
                                    <img
                                        src={store?.logo?.logoUrl || 'https://via.placeholder.com/50'}
                                        alt="Logo"
                                        className="h-12 w-12 rounded-full object-cover mr-4"
                                    />
                                </div>
                            )}
                            <span className="text-xl font-bold" onClick={() => navigate('./')}>
                                {store.name}
                            </span>
                        </div>

                        <div className={`${isEdit && previewMode && "ml-[5rem]"} mr-[5rem] md:[420px] lg:w-[450px] relative flex items-center hidden md:flex`}>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={handleSearchInputChange}
                                placeholder="Search"
                                className={`w-full relative border border-white outline-none bg-transparent focus:border-none py-2 px-3 rounded-full placeholder-white placeholder:text-base text-xl`}
                            />
                            <FaSearch className="text-lg absolute right-4 cursor-pointer" onClick={handleSearchIconClick} />
                            {searchItem.length > 0 && (
                                <ul className='absolute top-10 -left-2 flex flex-col gap-3 w-full px-3 py-3 rounded-b-2xl' style={{
                                    fontFamily: store?.fonts?.Navbar,
                                    backgroundColor: color?.navColor?.backgroundnavColor,
                                    color: color?.navColor?.storeNameTextColor,
                                }}>
                                    {searchItem.map((n, i) => {
                                        return (
                                            <li onClick={() => handleProductClick(n)} key={i} className='flex items-center gap-4'>
                                                <img src={n.image.imageUrl} className='w-10 h-10 rounded-full border border-2 border-black' />
                                                <div>{n.name}</div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>

                        <div className='flex items-center gap-8'>
                            <button onClick={handleCartClick} className="relative flex">
                                <FaShoppingCart className="text-2xl" />
                                {cartItems.length > 0 && (
                                    <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 rounded-full text-white px-1 py-0.5 text-xs">
                                        {store.cart.length}
                                    </span>
                                )}
                            </button>
                            {isCartOpen && (
                                <CartDropdown cart={store.cart} deleteFromCart={deleteFromCart} backgroundColor={color.navColor.backgroundnavColor} store={store} setStore={setStore} />
                            )}
                            {(store.isEdit || !store.fetchedFromBackend) && (
                                <button
                                    id="navbarButtonId"
                                    onClick={() => {
                                        setStore(prev => ({ ...prev, previewMode: !store.previewMode }));
                                        handleButtonClick();
                                    }}
                                    className={`bg-black ${highlightedButtonId === 'navbarButtonId' ? 'bg-yellow-300 border-2 border-red-500 animate-pulse z-50' : ''} hover:bg-white text-white hover:text-black font-bold py-2 px-4 text-sm rounded transition duration-200 ${isAnimating ? 'animate-flashy-border border-2' : 'border-2 border-transparent hover:border-black'}`}
                                >
                                    {store.previewMode ? 'Preview Mode' : 'Edit'}
                                </button>
                            )}
                        </div>
                    </div>

                )}
            </div>

            <div>
                <div className={`flex items-center space-x-4 py-2 relative ${isSidebarOpen ? 'mr-0' : 'lg:mr-0'}`}>
                    <div className="hidden md:flex space-x-10 lg:space-x-10 font-semibold">
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

                        {/* Links for non-routing based navigation */}
                        <Link
                            onClick={e => handleClickNavigation(e, newProductRef, 'new')}
                            className={activeSection === 'new'
                                ? 'py-1 px-6 rounded-lg bg-blue-500 hover:underline'
                                : 'py-1 px-6 rounded-lg hover:underline'}>
                            New
                        </Link>

                        <Link
                            onClick={e => handleClickNavigation(e, categoryRef, 'categories')}
                            className={activeSection === 'categories'
                                ? 'py-1 px-6 rounded-lg bg-blue-500 hover:underline'
                                : 'py-1 px-6 rounded-lg hover:underline'}>
                            Categories
                        </Link>

                    </div>

                </div>
                <div className="absolute right-2 md:right-5 lg:right-20 top-5">
                    {(store.isEdit || !store.fetchedFromBackend) && (
                        <button
                            id="navbarButtonId"
                            onClick={() => {
                                setStore(prev => ({ ...prev, previewMode: !store.previewMode }));
                                handleButtonClick();
                            }}
                            className={`${scrolling ? "block" : "hidden"} hidden md:block bg-black ${highlightedButtonId === 'navbarButtonId' ? 'bg-yellow-300 border-2 border-red-500 animate-pulse z-50' : ''} hover:bg-white text-white hover:text-black font-bold py-2 px-4 text-sm rounded transition duration-200 ${isAnimating ? 'animate-flashy-border border-2' : 'border-2 border-transparent hover:border-black'}`}
                        >
                            {store.previewMode ? 'Preview Mode' : 'Edit'}
                        </button>
                    )}
                </div>
            </div>


            {isSidebarOpen && (
                <button
                    style={{ color: color.navColor.storeNameTextColor }}
                    className="block focus:outline-none md:hidden absolute right-6"
                    onClick={toggleSidebar}
                >
                    <FaTimes className="h-6 w-6 fill-current" />
                </button>
            )}

            {isSidebarOpen && (
                <div
                    className="md:hidden fixed top-0 left-0 h-full w-64 text-white shadow-lg z-30"
                    style={{ backgroundColor: color.navColor.backgroundnavColor }}
                    ref={sidebarRef}
                >
                    <div className="flex flex-col items-start space-y-4 p-4">
                        <div className="flex items-center mb-4">
                            {store.logo && (
                                <img
                                    src={store?.logo?.logoUrl}
                                    alt="Logo"
                                    className="h-8 mr-4"
                                />
                            )}
                            <span className="text-xl font-bold">{store.name}</span>
                        </div>
                        <div className="relative flex gap-3 items-center w-full">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={handleSearchInputChange}
                                placeholder="Search"
                                className="bg-transparent border-b border-white focus:outline-none placeholder-white text-xl w-full placeholder:text-sm"
                            />
                            <FaSearch className="text-2xl cursor-pointer" onClick={handleSearchIconClick} />
                            {searchItem.length > 0 && (
                                <ul className='absolute top-10 -left-2 flex flex-col gap-3 w-full px-3 py-3 rounded-b-2xl' style={{
                                    fontFamily: store?.fonts?.Navbar,
                                    backgroundColor: color?.navColor?.backgroundnavColor,
                                    color: color?.navColor?.storeNameTextColor,
                                }}>
                                    {searchItem.map((n, i) => {
                                        return (
                                            <li onClick={() => handleProductClick(n)} key={i} className='flex items-center gap-4'>
                                                <img src={n.image.imageUrl} className='w-10 h-10 rounded-full border border-2 border-black' />
                                                <div>{n.name}</div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                        <NavLink
                            to={!isEdit && fetchedFromBackend && `/store/products/${store.name}`}
                            className={({ isActive }) => isActive
                                ? 'py-1 px-6 rounded-lg bg-blue-500 hover:underline'
                                : 'py-1 px-6 rounded-lg hover:underline' /* Keep same padding when inactive */}>
                            All Products
                        </NavLink>

                        <NavLink
                            to={!isEdit && fetchedFromBackend && `/store/products/${store.name}/?filter=featured`}
                            className={({ isActive }) => isActive
                                ? 'py-1 px-6 rounded-lg bg-blue-500 hover:underline'
                                : 'py-1 px-6 rounded-lg hover:underline'}>
                            Featured
                        </NavLink>

                        <NavLink
                            to={!isEdit && fetchedFromBackend && `/store/products/${store.name}/?filter=offers`}
                            className={({ isActive }) => isActive
                                ? 'py-1 px-6 rounded-lg bg-blue-500 hover:underline'
                                : 'py-1 px-6 rounded-lg hover:underline'}>
                            Offers
                        </NavLink>

                        {/* Links for non-routing based navigation */}
                        <Link
                            onClick={e => handleClickNavigation(e, newProductRef, 'new')}
                            className={activeSection === 'new'
                                ? 'py-1 px-6 rounded-lg bg-blue-500 hover:underline'
                                : 'py-1 px-6 rounded-lg hover:underline'}>
                            New
                        </Link>

                        <Link
                            onClick={e => handleClickNavigation(e, categoryRef, 'categories')}
                            className={activeSection === 'categories'
                                ? 'py-1 px-6 rounded-lg bg-blue-500 hover:underline'
                                : 'py-1 px-6 rounded-lg hover:underline'}>
                            Categories
                        </Link>

                    </div>
                </div>
            )}
        </motion.nav>

    );
};

export default Navbar1;


