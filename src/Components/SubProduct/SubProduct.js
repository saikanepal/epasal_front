import React from 'react';
import SubProduct1 from './SubProduct1';
import Theme2SubProduct1 from './Theme2/SubProduct1'

const SubProduct = (props) => {
    const { subProductType ,activeTheme} = props;
    console.log('active',activeTheme)
    // switch(activeTheme){
    //     case 1:
    //         switch (subProductType) {
    //             case 'Category1':
    //                 return <SubProduct1 {...props} />;
    //             default:
    //                 return null;
    //         }
    //     case 2:
    //         switch (subProductType) {
    //             case 'Category1':
                    return <Theme2SubProduct1 {...props} />;
    //             default:
    //                 return null;
    //         }
    //         default:
    //             switch (subProductType) {
    //                 case 'Category1':
    //                     return <Theme2SubProduct1 {...props} />;
    //                 default:
    //                     return null;
    //             }
    // }
};

export default SubProduct;

