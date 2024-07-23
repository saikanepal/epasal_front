import React, { useState } from 'react';
import { useStore } from './T2Context';
import Navbar from "../../Components/Navbar/Navbar";
const EStoreNavbar = ({navbarType}) => {
    const { store, setStore, addCategory, removeCategory, deleteFromCart } = useStore();
    const { color, previewMode, cartCount, cart, isEdit, fetchedFromBackend } = store;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [logoFile, setLogoFile] = useState(null);

    const navbarProps = {
        setNewCategory,
        store,
        setStore,
        addCategory,
        removeCategory,
        color,
        previewMode,
        isSidebarOpen,
        newCategory,
        searchInput,
        setIsSidebarOpen,
        setSearchInput,
        setLogoFile,
        cart,
        cartCount,
        deleteFromCart,
        isEdit,
        fetchedFromBackend
    };
    return (
        <Navbar
            navbarProps={navbarProps}
            navbarType={navbarType}// Change this to "Navbar2" or "Navbar3" to switch navbar types
        />
    );
};

export default EStoreNavbar;
