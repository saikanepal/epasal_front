import React, { useState } from 'react';
import { StoreProvider, useStore } from './StoreContext';
import EStoreNavbar from './EStoreNavbar';
import AboutPage from './AboutPage';
import ColorPicker from './ColorPicker';
import StoreHeader from './StoreHeader';
import CategorySelector from './CategorySelector';
import { useMediaQuery } from 'react-responsive';
import SubProduct from './SubProduct/SubProduct';
import SecondaryBanner from './SecondaryBanner';
import ProductList from './ProductList/ProductList';
import Footer from './Footer/Footer';
import SaveStoreButton from './SaveButton/SaveStoreButton';
import Loading from './Loading/Loading';
const EStore = () => {
    const { store } = useStore();
    const {previewMode} = store;
    // Ensure useState and useMediaQuery are called unconditionally
    const [showColorPicker, setShowColorPicker] = useState(true);
        const isMobile = useMediaQuery({ maxWidth: 768 });

    if (!store) {
        return <div>Loading...</div>;
    }


    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };

    console.log(store);
    if(window.location.pathname.includes('/store/') && !store.fetchedFromBackend){
        return (
            <div className=' w-screen'>
           <Loading></Loading>
           </div>
        )
    }else
    return (
        store &&
        <div className=' h-full' style={{ backgroundColor: store.color.backgroundThemeColor }}>
            <StoreHeader />
            <ColorPicker />
            <EStoreNavbar toggleColorPicker={toggleColorPicker} />
            <AboutPage />
            <CategorySelector /> {/* Render CategorySelector only on mobile devices */}
            <SubProduct />
            <SecondaryBanner/>
            <ProductList/>
            <Footer/>
            {previewMode &&
            <SaveStoreButton/>
            }
            </div>
    );
};


const EStoreWithStoreProvider = () => {
    return (
        <StoreProvider>
            <EStore />
        </StoreProvider>
    );
};

export default EStoreWithStoreProvider;
