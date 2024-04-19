import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from './StoreContext';
import { useDropzone } from 'react-dropzone';
import { FaShoppingCart } from 'react-icons/fa';
import LeftSidebar from "./LeftSidebar"

const EStoreNavbar = ({ toggleColorPicker }) => {
    const { store, setStore, addCategory, removeCategory } = useStore(); // Destructure removeCategory from useStore
    const { color, navbar } = store;
    const { previewMode } = store;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [logoFile, setLogoFile] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
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
                const reader = new FileReader();
                reader.onload = () => {
                    setStore(prevState => ({
                        ...prevState,
                        logo: reader.result
                    }));
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const handleCartClick = () => {
        // Add your cart click functionality here
        console.log('Cart clicked');
    };

    return (
        <motion.nav
            className="flex flex-wrap rounded-sm items-center justify-between text-gray-800 px-4 py-2 shadow-md"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 120 }}
            style={{ backgroundColor: color.navColor.backgroundnavColor }}
        >
            {/* Logo */}
            <div {...getRootProps()} className="cursor-pointer flex items-center ">
                <input {...getInputProps()} />
                <img
                    src={store.logo || 'https://via.placeholder.com/50'}
                    alt="Logo"
                    className="h-8 mr-2 "
                    style={{ borderRadius: '50%' }}
                />

            </div>
            <input
                type="text"
                value={store.name}
                onChange={(e) => !previewMode && setStore(prevState => ({ ...prevState, name: e.target.value }))}
                readOnly={previewMode} // Set readOnly based on previewMode
                className=" md:block font-Cinzel w-60  font-bold text-lg outline-none border-none"
                style={{ color: color.navColor.storeNameTextColor, backgroundColor: color.navColor.backgroundnavColor }}
            />

            {/* Categories */}
            <div className="hidden md:flex md:flex-grow justify-center ml-16 font-semibold font-Cinzel text-xl space-x-2">
                <ul className="flex">
                    {store.categories.map((category, index) => (
                        <motion.li key={index} className="flex items-center justify-between px-4 py-2 cursor-pointer">
                            <span style={{ color: color.navColor.categoryTextColor }}>{category.name}</span>
                            {!previewMode && <button className="text-red-500 pb-2 focus:outline-none" onClick={() => removeCategory(index)}>
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M3 10h14M10 3v14" stroke="red" strokeWidth="2" transform="rotate(45 10 10)" />
                                </svg>
                            </button>}
                        </motion.li>
                    ))}
                </ul>
                {/* Input field to add new category */}
                {!previewMode && <div className="h-30 flex flex-row space-x-3 mt-2">
                    <input
                        type="text"
                        placeholder="New Category"
                        value={newCategory}
                        onChange={handleInputChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                addCategory(newCategory); // Call addCategory directly here
                                setNewCategory('');
                            }
                        }}
                        className="relative bg-gray-50 ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-blue-500 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-32 h-8 p-2.5 checked:bg-emerald-500"
                    />
                    <button
                        title="Add New"
                        className="group cursor-pointer outline-none hover:rotate-90 duration-300 flex items-center justify-center -mt-1"
                        onClick={() => {
                            addCategory(newCategory); // Call addCategory directly here
                            setNewCategory('');
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50px"
                            height="50px"
                            viewBox="0 0 24 24"
                            className="stroke-zinc-300 w-10 h-10 group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
                        >
                            <path
                                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                strokeWidth="1.5"
                            ></path>
                            <path d="M8 12H16" strokeWidth="1.5"></path>
                            <path d="M12 16V8" strokeWidth="1.5"></path>
                        </svg>
                    </button>
                </div>}
            </div>
            <div className=" flex mr-6 flex-row items-center space-x-4">
                <button className="focus:outline-none" onClick={handleCartClick}>
                    <FaShoppingCart className="text-xl" style={{ color: color.navColor.storeNameTextColor }} />
                </button>
            </div> 

            {/* Searchbar */}
            <div className="hidden md:flex mr-5 justify-center items-center sm:justify-center md:w-auto sm:w-screen">
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    placeholder="Search"
                    className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                    style={{ backgroundColor: color.navColor.searchBarColor, color: color.navColor.storeNameTextColor }}
                />
            </div>

            {/* Cart Icon */}
      

            {/* Sidebar Toggle Button for Small Devices */}
            <div className="md:hidden box-border">
                <button style={{ color: color.navColor.storeNameTextColor }} className="blockfocus:outline-none  py-2" onClick={toggleSidebar}>
                    <svg
                        className="h-6 w-6 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5h18a1 1 0 010 2H3a1 1 0 110-2zm0 6h18a1 1 0 010 2H3a1 1 0 110-2zm0 6h18a1 1 0 010 2H3a1 1 0 010-2z"
                        />
                    </svg>
                </button>
            </div>

            {/* Render LeftSidebar component on small devices */}
            {isSidebarOpen && <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}

        </motion.nav>
    );
};

export default EStoreNavbar;
