import React from 'react';
import { useStore } from '../../ThemeContext';
import Footer from '../../../Components/Footer/Footer';
const T1Footer = () => {
    const { store, setStore, activeTheme } = useStore();

    const footerProps = {
        store,
        logo: store.logo,
        socialMediaLinks: store.socialMediaLinks,
        footerDescription: store.footerDescription,
        color: store.color,
        previewMode: store.previewMode,
        location: store.location,
        email: store.email,
        phoneNumber: store.phoneNumber,
        setStore,
        isEdit: store.isEdit,
        activeTheme
    };

    return (
        <Footer footerProps={footerProps} footerType="Footer1" />
    );
};

export default T1Footer;
