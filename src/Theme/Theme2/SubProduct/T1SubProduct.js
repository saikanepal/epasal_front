import React from 'react';
import { useStore } from '../../ThemeContext';
import ProductCard from './T1ProductCard';
import ProductForm from './ProductForm';
import { useDraggable } from "react-use-draggable-scroll";
import CategorySelector from '../T1Category';
import SubProduct from '../../../Components/SubProduct/SubProduct';

const T1SubProduct = () => {
    const { store, setStore ,addToCart,setSelectedSubCategory, removeSubCategory,addSubCategory} = useStore();
    const { products, categories, subCategories, previewMode } = store;
    const subProductType = 'Category1';

    const subProductsProps = {
        products, addToCart, categories, subCategories, previewMode, store, setStore, subProductType, CategorySelector, AddProduct: ProductForm, ProductCard, useDraggable,setSelectedSubCategory, removeSubCategory
    };

    return (
        <SubProduct {...subProductsProps} />
    );
};

export default T1SubProduct;
