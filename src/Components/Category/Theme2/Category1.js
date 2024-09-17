import React, { useState } from 'react';
import AddCategoryModal from '../../../Theme/Theme1/AddCategoryModal';


const Category1 = ({ subCategories, previewMode, color, setSelectedSubCategory, removeSubCategory,isEdit ,addSubCategory}) => {

    const [showModal, setShowModal] = useState(false);

    //   const [inputValue, setInputValue] = useState('');
    // const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    // const [showSuggestions, setShowSuggestions] = useState(false);

    const [selectedSubCategory, setSelectedSubCategoryLocally] = useState(subCategories[0]);

    const handleAddCategory = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleRemoveSubCategory = (index) => {
        if (!previewMode) {
            removeSubCategory(index);
        }
    };
    // const handleChangeSuggestion = (e) => {
    //     const userInput = e.target.value;
    //     setInputValue(userInput);
    //     const filtered = subCategories.filter(
    //       (suggestion) =>
    //         suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    //     ).map((suggestion) => suggestion.name);

    //     setFilteredSuggestions(filtered);
    //     setShowSuggestions(true);
    //   };

    // const handleClickSuggestion = (suggestion) => {
    //  
    //   setInputValue(suggestion);
    //   setFilteredSuggestions([]);
    //   setShowSuggestions(false);
    //   setSelectedSubCategory(suggestion);
    //   setSelectedSubCategoryLocally({name:suggestion}); 


    // };
    const handleSelectSubCategory = (subcategory) => {
       
        setSelectedSubCategoryLocally(subcategory); // Update the local state
        setSelectedSubCategory(subcategory.name); // Update the selectedSubCategory in the store

    };

    const handleChangeCategory = (e) => {
        setSelectedSubCategoryLocally(e.target.value);
        setSelectedSubCategory(e.target.value);
    }
    // const renderSuggestions = () => {
    //     if (showSuggestions && inputValue) {
    //       if (filteredSuggestions.length) {
    //         return (
    //           <ul className="suggestions absolute top-7 w-full z-10 bg-white">
    //             {filteredSuggestions.map((suggestion, index) => {
    //               return (
    //                 <li className='py-2 px-3' key={index} onClick={() => handleClickSuggestion(suggestion)}>
    //                   {suggestion}
    //                 </li>
    //               );
    //             })}
    //           </ul>
    //         );
    //       } else {
    //         return (
    //           <div className="no-suggestions">
    //             <em>No suggestions available.</em>
    //           </div>
    //         );
    //       }
    //     }
    //     return null;
    //   };


    return (
        <div className=' px-0'>
            <div className="relative pb-0 flex justify-center h-full"
                style={{ backgroundColor: color.subcategoryColor.background, color: color.subcategoryColor.text }}>
                <div id='scrollbar2' className="whitespace-nowrap hidden md:flex overflow-x-auto min-h-14 w-full h-full">
                    <div className=" mb-4 flex flex-col justify-center overflow-scroll h-full gap-4">
                        {subCategories.map((subcategory, index) => (
                            <div key={index} className="relative">
                                <button
                                    onClick={() => handleSelectSubCategory(subcategory)}
                                    className={`py-2 px-8 rounded-lg hover:bg-gray-100 w-full ${selectedSubCategory === subcategory ? 'font-extrabold ' : ''}`}
                                    style={{ backgroundColor: `${selectedSubCategory === subcategory ? color.subProductColor.borderColor : ''}` }}
                                >
                                    {subcategory.name}
                                </button>
                                {(!previewMode) && (
                                    <button
                                        className="absolute top-2 right-2  focus:outline-none"
                                        onClick={() => handleRemoveSubCategory(index)}
                                    >
                                        <svg className="h-4 w-4 fill-current text-red-500" viewBox="0 0 20 20">
                                            <path d="M3 10h14M10 3v14" stroke="red" strokeWidth="2" transform="rotate(45 10 10)" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        {(!previewMode) && (
                            <button className="py-2 px-8 hover:bg-gray-100" onClick={handleAddCategory}>Add Category</button>
                        )}
                    </div>
                </div>
                <div className='md:hidden flex items-center mb-4'>
                    <div className='relative'>
                        {/* <input type='text' placeholder='Search' className='text-center border border-2 border-black rounded' onChange={handleChangeSuggestion} value={inputValue}/>{renderSuggestions()} */}
                        <select name="category" id="category" className='px-5 py-1' onChange={handleChangeCategory}>
                            {subCategories.map((n, i) => (
                                <option value={n.name}>{n.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {showModal && <AddCategoryModal onClose={handleCloseModal} addSubCategory={addSubCategory}/>}
            </div>
        </div>
    );
};

export default Category1;
