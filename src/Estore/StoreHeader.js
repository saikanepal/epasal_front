import React from 'react';
import { useStore } from './StoreContext';

const StoreHeader = () => {
    const { store } = useStore();
    const { color } = store;

    return (
        <div
            className="font-Sixtyfour w-full h-8 flex justify-center items-center"
            style={{ backgroundColor: color.headerColor.headerBackground}}
        >
            <h1 className="font-bold text-sm" style={{color: color.headerColor.headerText }}>10% Sale!</h1>
        </div>
    );
};

export default StoreHeader;
