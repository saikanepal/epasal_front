import React, { useState } from 'react';
import AddCategoryModal from "../../Theme/Theme1/AddCategoryModal";


const Category1 = ({ subCategories, previewMode, color,setSelectedSubCategory,removeSubCategory }) => {

    const [showModal, setShowModal] = useState(false);

    const [selectedSubCategory, setSelectedSubCategoryLocally] = useState('');

    const handleAddCategory = () => {
        setShowModal(true);
    };

    console.log(removeSubCategory)
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleRemoveSubCategory = (index) => {
        if (!previewMode) {
            removeSubCategory(index);
        }
    };

    const handleSelectSubCategory = (subcategory) => {
        setSelectedSubCategoryLocally(subcategory); // Update the local state
        setSelectedSubCategory(subcategory.name); // Update the selectedSubCategory in the store
    };


    return (
        <div className=' px-0'>
            <div className="p-4 pb-0  rounded-lg font-Genos text-xl flex justify-center overflow-hidden"
                style={{ backgroundColor: color.subcategoryColor.background, color: color.subcategoryColor.text, border: `1px solid ${color.subcategoryColor.border}` }}>
                <div id='scrollbar2' className="whitespace-nowrap overflow-x-auto">
                    <div className="border-b border-gray-300 mb-4 flex space-x-4 ">
                        {subCategories.map((subcategory, index) => (
                            <div key={index} className="relative">
                                <button
                                    onClick={() => handleSelectSubCategory(subcategory)}
                                    className={`py-2 px-8 hover:bg-gray-100 ${selectedSubCategory === subcategory ? 'border-b border-black' : ''}`}
                                >
                                    {subcategory.name}
                                </button>
                                {!previewMode && (
                                    <button
                                        className="absolute top-0 right-0  focus:outline-none"
                                        onClick={() => handleRemoveSubCategory(index)}
                                    >
                                        <svg className="h-4 w-4 fill-current text-red-500" viewBox="0 0 20 20">
                                            <path d="M3 10h14M10 3v14" stroke="red" strokeWidth="2" transform="rotate(45 10 10)" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        {!previewMode && (
                            <button className="py-2 px-8 hover:bg-gray-100" onClick={handleAddCategory}>Add Subcategory</button>
                        )}
                    </div>
                </div>
                {showModal && <AddCategoryModal onClose={handleCloseModal} />}
            </div>
        </div>
    );
};

export default Category1;
