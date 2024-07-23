import React from 'react';
import SubProduct1 from './SubProduct1';
import SubProduct2 from './SubProduct2';

const SubProduct = (props) => {
    const { subProductType } = props;

    switch (subProductType) {
        case 'Category1':
            return <SubProduct1 {...props} />;
        case 'Category2':
            return <SubProduct2 {...props}/>;
        default:
            return null;
    }
};

export default SubProduct;

