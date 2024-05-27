import React from 'react';
import Header1 from './Header1';
// import Header2 from './Header2';
// import Header3 from './Header3';

const Header = ({ headerProps, headerType }) => {
    const renderHeader = () => {
        switch (headerType) {
            case 'Header1':
                return <Header1 {...headerProps} />;
            // case 'Header2':
            //     return <Header2 {...headerProps} />;
            // case 'Header3':
            //     return <Header3 {...headerProps} />;
            default:
                return null;
        }
    };

    return <>{renderHeader()}</>;
};

export default Header;
