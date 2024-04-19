import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useStore } from '../StoreContext';
import jeans from '../../Assets/jeans.jpg';

const AddProduct = ({ onClose }) => {
    const { addProduct } = useStore();
    const { categories, subCategories } = useStore().store;
    const [image, setImage] = useState(jeans);
    const [name, setName] = useState('Product Name');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [sizes, setSizes] = useState(['']); // Array to store sizes
    const [variants, setVariants] = useState([{ option: '', prices: [''] }]); // Array to store variants

    const onDrop = acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false,
    });

    const handleSizeChange = (index, value) => {
        const updatedSizes = [...sizes];
        updatedSizes[index] = value;
        setSizes(updatedSizes);
    };

    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...variants];
        if (field === 'option') {
            updatedVariants[index][field] = value;
        } else if (field === 'price') {
            updatedVariants[index].prices[0] = value; // Assuming only one price for each variant
        }
        setVariants(updatedVariants);
    };

    const handleAddSize = () => {
        setSizes([...sizes, '']);
    };

    const handleRemoveSize = (index) => {
        const updatedSizes = [...sizes];
        updatedSizes.splice(index, 1);
        setSizes(updatedSizes);
    };

    const handleAddVariant = () => {
        setVariants([...variants, { option: '', prices: [''] }]);
    };

    const handleRemoveVariant = (index) => {
        const updatedVariants = [...variants];
        updatedVariants.splice(index, 1);
        setVariants(updatedVariants);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate inputs
        if (!image || !name || !category || !subcategory || sizes.length === 0 || variants.length === 0) {
            alert('Please fill in all fields.');
            return;
        }

        const newProduct = {
            id: Math.floor(Math.random() * 1000), // Generate a random ID
            name,
            image,
            categories: [category],
            subcategories: [subcategory],
            sizes,
            variants: variants.map(({ option, prices }) => ({
                type: 'Variant',
                option,
                prices: prices.map(price => parseFloat(price) || 0),
            })),
        };
        addProduct(newProduct);
        // Close the AddProduct overlay
        onClose();
    };

    return (
        <div>
            <div className="fixed  pt-0 text-black inset-0 flex  items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="flex p-10 items-center bg-white w-3/5 h-3/5">
                    <div className="w-1/2">
                        <div {...getRootProps()} className="fixed border-2 w-40 h-10 bg-gray-700 flex justify-center items-center border-dashed rounded-md p-6 mb-2">
                            <input {...getInputProps()} />
                            <p className="text-sm text-white">Upload</p>
                        </div>
                        <img src={image} alt="Product" className="w-full rounded-lg" />
                    </div>
                    
                    <div className="w-1/2 pl-10 h-4/5 overflow-y-auto justify-start">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="text-2xl font-semibold mb-2"></input>
                        <div className="mb-4 py-2 space-y-2">
                            <select className="shadow border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                            <select className="shadow border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                                <option value="">Select a subcategory</option>
                                {subCategories.map(subcat => (
                                    <option key={subcat.name} value={subcat.name}>{subcat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="sizes" className="block text-sm font-medium text-gray-800">Sizes</label>
                            {sizes.map((size, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={size}
                                        onChange={(e) => handleSizeChange(index, e.target.value)}
                                        placeholder={`Size ${index + 1}`}
                                        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                    <button type="button" className="text-red-500 ml-2 text-4xl" onClick={() => handleRemoveSize(index)}> - </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="text-sm text-blue-500 underline bg-transparent border-none focus:outline-none hover:text-blue-700"
                                onClick={handleAddSize}
                            >
                                Add
                            </button>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="variants" className="block text-sm font-medium text-gray-800">Variants</label>
                            {variants.map((variant, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={variant.option}
                                        onChange={(e) => handleVariantChange(index, 'option', e.target.value)}
                                        placeholder={` Brown , 10 gms etc .. `}
                                        className="w-1/2 mr-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                    <input
                                        type="number"
                                        value={variant.prices[0]}
                                        onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                        placeholder="Price"
                                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                    <button type="button" className="text-red-500 ml-2 text-4xl" onClick={() => handleRemoveVariant(index)}> - </button>
                                </div>
                            ))}
                            <button type="button" className="text-sm text-blue-500 underline" onClick={handleAddVariant}>Add Variant</button>
                        </div>

                    </div>
                    <div className=" absolute bottom-1/4 right-1/4 flex justify-end">
                        <button type="button" className="mr-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={onClose}>Cancel</button>
                        <button type="button" className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleSubmit}>Add Product</button>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default AddProduct;
