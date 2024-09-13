import React from 'react';
import SubProductCard from '../../../Components/SubProductCard/SubProductCard';

const ProductCard = ({ product, handleStyleSelect, handleRemoveProduct, store,handleAddToCartAnalytics }) => { // Pass handleRemoveProduct prop
    
    var categoryType;
    const activeTheme=store.activeTheme
    if (store?.componentSkin[1]?.activeSkin && store?.componentSkin[1]?.activeSkin !== '') {
        categoryType = store?.componentSkin[1]?.activeSkin || 'default';
    } else {
        categoryType = 'default';
    }
    // const categoryType = store?.componentSkin[1]?.activeSkin ||  'default';
    const ProductProps = { categoryType, product, handleStyleSelect, handleRemoveProduct, store ,handleAddToCartAnalytics,activeTheme};
    
    return (
        <SubProductCard {...ProductProps} />
    );
};

export default ProductCard;