import React from 'react';
import Category1 from './Category1';

const Category = ({ categoryType, ...props }) => {
    switch (categoryType) {
        case 'Category1':
            return <Category1 {...props} />;
        default:
            return <div>Unknown category type</div>;
    }
};

export default Category;
