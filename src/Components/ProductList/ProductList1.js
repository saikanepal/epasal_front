import React from 'react';
import ProductListCard from './ProductListCard';

const ProductList1 = ({ products, productListColor, handleDeleteProduct }) => {
    return (
        <div
            style={{ backgroundColor: productListColor.productBackground }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-12 lg:gap-10 ">
                {/* <div className="flex flex-wrap justify-between gap-5 "> */}
                {products.map(product => (
                    <ProductListCard key={product.id} product={product} handleDeleteProduct={handleDeleteProduct} />
                ))}
            </div>
        </div>
    );
};

export default ProductList1;
