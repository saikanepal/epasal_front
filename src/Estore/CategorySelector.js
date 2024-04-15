import React, { useState } from 'react';
import { useStore } from './StoreContext';
import AddCategoryModal from './AddCategoryModal';

const   CategorySelector = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { store } = useStore();
    const { categories } = store;
    const handleAddCategory = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div className="p-4 flex justify-center overflow-hidden">
            <div id='scrollbar2' className="whitespace-nowrap overflow-x-auto">
                <div className="border-b border-gray-300 mb-4 flex space-x-4 ">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedCategory(category)}
                            className={`py-2 px-8 hover:bg-gray-100 ${selectedCategory === category ? 'border-b border-black' : ''}`}
                        >
                            {category.name}
                        </button>
                    ))}
                    <button className="py-2 px-8 hover:bg-gray-100" onClick={handleAddCategory}>Add Category</button>
                </div>
            </div>
            {showModal && <AddCategoryModal onClose={handleCloseModal} />}
        </div>
    );
};

export default CategorySelector;
