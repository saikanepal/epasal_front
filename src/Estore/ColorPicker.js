import React, { useState, useEffect } from 'react';
import { useStore } from './StoreContext';
import { motion, useMotionValue } from 'framer-motion';

const ColorPicker = () => {
    const { store, setStore } = useStore();
    const { color } = store;
    const {previewMode} = store;
    const [showColorPicker, setShowColorPicker] = useState(true);

    // Calculate maximum allowable positions based on viewport size and component size
    const maxLeft = window.innerWidth - 70; // Adjusted for button width
    const maxTop = window.innerHeight - 100; // Adjusted for header height and component height

    // State variables for position
    const x = useMotionValue(50);
    const y = useMotionValue(50);

    // Update constraints on window resize
    useEffect(() => {
        const handleResize = () => {
            const newMaxLeft = window.innerWidth - 70;
            const newMaxTop = window.innerHeight - 800;
            x.set(Math.min(x.get(), newMaxLeft));
            y.set(Math.min(y.get(), newMaxTop));
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [x, y]);

    // Constraints for drag
    const dragConstraints = {
        left: 0,
        right: maxLeft,
        top: 0,
        bottom: maxTop,
    };

    const handleColorChange = (value, field, colorValueObject) => {
        setStore((prevState) => ({
            ...prevState,
            color: {
                ...prevState.color,
                [colorValueObject]: {
                    ...prevState.color[colorValueObject],
                    [field]: value,
                },
            },
        }));
    };

    const handleHexCodeChange = (e, field) => {
        const hexCode = e.target.value;
        // Validate hex code (optional)
        if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexCode)) {
            handleColorChange(hexCode, field);
        }
    };

    const handleSingleColorChange = (e, field) => {
        console.log(e,field);
        const newValue = e.target.value;
        // Update the store directly
        setStore((prevState) => ({
            ...prevState,
            color: {
                ...prevState.color,
                [field]: newValue,
            },
        }));
    };
   // Function to toggle preview mode
   const togglePreviewMode = () => {
    setStore((prevState) => ({
        ...prevState,
        previewMode: !prevState.previewMode, // Toggle the value of previewMode
    }));
};

    return (
        <motion.div
            className={`absolute ${showColorPicker ? 'w-0' : 'w-0'} left-5 right-5  border bg-transparent rounded-md shadow-l  z-10`}
            drag
            dragElastic={0}
            dragConstraints={dragConstraints}
            initial={{ x: 350, y: 50 }}
            style={{ x, y }}
        >
           <button onClick={togglePreviewMode} className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center focus:outline-none">
            </button>
           
            {showColorPicker && (
                <div className="relative   w-60 right-60  bg-[#EEEDEB] p-4 border border-gray-300 rounded-md shadow-lg z-10">
                    <div className="flex flex-col gap-4">
                        {!previewMode && Object.entries(color).map(([colorKey, colorValue], index) => {
                            if (typeof colorValue === 'object') {
                                return (
                                    <div key={index}>
                                        <h4 className="text-lg font-semibold mb-2">{colorKey}</h4>
                                        {Object.entries(colorValue).map(([nestedKey, nestedValue], nestedIndex) => (
                                            <div key={nestedIndex} className="flex flex-col justify-start items-start">
                                                <label className="text-gray-700  w-24">{nestedKey}</label>
                                                <div className="flex md:flex-row  items-start justify-start flex-grow ml-4">
                                                    <input
                                                        type="color"
                                                        value={nestedValue}
                                                        onChange={(e) => handleColorChange(e.target.value, nestedKey, colorKey)}
                                                        className="rounded-full  px-1 border border-gray-300 shadow-md focus:outline-none"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={nestedValue}
                                                        onChange={(e) => handleHexCodeChange(e, nestedKey)}
                                                        className="ml-4 w-20 rounded-md border border-gray-300 px-2 focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={index} className="flex flex-col items-start">
                                        <label className="text-gray-700 w-24">{colorKey}</label>
                                        <div className="flex items-center flex-grow ml-4">
                                            <input
                                                type="color"
                                                value={colorValue}
                                                onChange={(e) => handleSingleColorChange(e, colorKey)}
                                                className="rounded-full px-1 border border-gray-300 shadow-md focus:outline-none"
                                            />
                                            <input
                                                type="text"
                                                value={colorValue}
                                                onChange={(e) => handleSingleColorChange(e, colorKey)}
                                                className="ml-4 w-20 rounded-md border border-gray-300 px-2 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default ColorPicker;
