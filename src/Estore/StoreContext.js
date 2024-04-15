import React, { createContext, useState, useContext } from 'react';

const StoreContext = createContext();

export const useStore = () => {
    return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
    const [store, setStore] = useState({
        name: 'Store Name',
        logo: '',
        categories: [],
        subCategories: [],
        color: {
            backgroundThemeColor: '#fcfdfd',
            navColor: {
                backgroundnavColor: '#1a1919',
                storeNameTextColor: '#f7f7f7',
                categoryTextColor: '#ffffff',
                searchBarColor: '#fdf3e2',
            },
            headerColor: {
                headerText: "#59CE8F",
                headerBackground: "#000000"
            }
        },
        navbar: {
            logoPosition: { x: 0, y: 0 },
            storeNamePosition: { x: 0, y: 0 },
            categoriesPosition: { x: 0, y: 0 },
            searchBarPosition: { x: 0, y: 0 }
        },
        isPreview: false // Default value for isPreview
    });

    // Function to add a new category
    const addCategory = (newCategory) => {
        setStore(prevState => ({
            ...prevState,
            categories: [...prevState.categories, { name: newCategory }]
        }));
    };

    return (
        <StoreContext.Provider value={{ store, setStore, addCategory }}>
            {children}
        </StoreContext.Provider>
    );
};
