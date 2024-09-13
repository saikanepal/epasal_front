import React from 'react';
import Category1 from './Category1';
import Theme2Category1 from './Theme2/Category1'

const Category = ({ categoryType,activeTheme, ...props }) => {
    switch(activeTheme){
        case 1:
            switch (categoryType) {
                case 'Category1':
                    return <Category1 {...props} />;
                default:
                    return <div>Unknown category type</div>;
            }
        case 2:
            switch (categoryType) {
                case 'Category1':
                    return <Theme2Category1 {...props} />;
                default:
                    return <div>Unknown category type</div>;
            }
        default:
            switch (categoryType) {
                case 'Category1':
                    return <Category1 {...props} />;
                default:
                    return <div>Unknown category type</div>;
            }
    }
};

export default Category;
