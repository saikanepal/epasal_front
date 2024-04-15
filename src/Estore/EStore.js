import React, { useState } from 'react';
import { StoreProvider, useStore } from './StoreContext';
import EStoreNavbar from './EStoreNavbar';
import AboutPage from './AboutPage';
import ColorPicker from './ColorPicker';
import StoreHeader from './StoreHeader';
import CategorySelector from './CategorySelector';
import { useMediaQuery } from 'react-responsive';

const EStore = () => {
    const { store } = useStore();
    const { color } = store;
    const [showColorPicker, setShowColorPicker] = useState(true);

    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker);
    };

    const isMobile = useMediaQuery({ maxWidth: 768 }); // Define a breakpoint for mobile devices

    return (
        <div className='h-screen' style={{ backgroundColor: color.backgroundThemeColor }}>
            <StoreHeader />
            <ColorPicker />
            <EStoreNavbar toggleColorPicker={toggleColorPicker} />
            {isMobile && <CategorySelector />} {/* Render CategorySelector only on mobile devices */}
            <div className="px-5 py-5 box-border">
                <AboutPage />
            </div>
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
