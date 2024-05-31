import React from 'react';
import ProductListCard from './ProductListCard';

const ProductList1 = ({ products, productListColor, handleDeleteProduct }) => {
    return (
        <div
            style={{ backgroundColor: productListColor.productBackground }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 ">
                {products.map(product => (
                    <ProductListCard key={product.id} product={product} handleDeleteProduct={handleDeleteProduct} />
                ))}
            </div>
        </div>
    );
};

export default ProductList1;
