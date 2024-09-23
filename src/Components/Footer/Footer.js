import React from 'react';
import Footer1 from './Footer1';
import Theme2Footer1 from './Theme2/Footer1';


const Footer = ({ footerProps, footerType }) => {
    const { activeTheme } = footerProps;

    const renderFooter = () => {
        switch (2) {
            case 1:
                switch (footerType) {
                    case 'Footer1':
                        return <Footer1 {...footerProps} />;
                    default:
                        return null;
                }
            case 2:
                switch (footerType) {
                    case 'Footer1':
                        return <Theme2Footer1 {...footerProps} />;
                    default:
                        return null;
                }
            default:
                switch (footerType) {
                    case 'Footer1':
                        return <Footer1 {...footerProps} />;
                    default:
                        return null;
                }
        }

    };

    return <>{renderFooter()}</>;

};

export default Footer;
