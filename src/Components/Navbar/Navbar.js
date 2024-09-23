import React, { useEffect } from 'react';
import Navbar1 from './Navbar1';
import Theme2Navbar1 from './Theme2/Navbar1';
// import Navbar3 from './Navbar3';

const Navbar = ({ navbarProps, navbarType, onClick, activeTheme }) => {
    useEffect(() => {
        console.log(activeTheme, "active heme")
    }, [activeTheme])
    switch (activeTheme) {
        case 1:
            switch (navbarType) {
                case 'Navbar1':
                    return <Navbar1 {...navbarProps} onClick={onClick} />;
                default:
                    return null;
            }
        case 2:
            switch (navbarType) {
                case 'Navbar1':
                    return <Theme2Navbar1 {...navbarProps} onClick={onClick} />;
                default:
                    return null;
            }
        default:
            switch (navbarType) {
                case 'Navbar1':
                    return <Navbar1 {...navbarProps} onClick={onClick} />;
                default:
                    return null;
            }
    }
};

export default Navbar;

