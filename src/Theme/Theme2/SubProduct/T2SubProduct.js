import React from 'react';
import { useStore } from '../T2Context';
import ProductCard from './T1ProductCard';
import ProductForm from './ProductForm';
import { useDraggable } from "react-use-draggable-scroll";
import CategorySelector from '../T1Category';
import SubProduct from '../../../Components/SubProduct/SubProduct';

const T2SubProduct = ({subProductType}) => {
    const { store, setStore ,addToCart} = useStore();
    const { products, categories, subCategories, previewMode } = store;
    

    const subProductsProps = {
        products, addToCart, categories, subCategories, previewMode, store, setStore, subProductType, CategorySelector, AddProduct: ProductForm, ProductCard, useDraggable
    };

    return (
        <SubProduct {...subProductsProps} />
    );
};

export default T2SubProduct;
