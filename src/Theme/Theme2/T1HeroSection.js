import React from 'react';
import { useStore } from './T2Context';
import HeroSection from '../../Components/HeroSection/HeroSection';
const AboutPage = ({heroSectionType}) => {
    const { store,setStore } = useStore();
    const { previewMode } = store;

    const heroSectionProps = {
        previewMode,
        store,
        setStore
    };

    return (
        <HeroSection
            heroSectionProps={heroSectionProps}
            heroSectionType={heroSectionType} // Change this to "HeroSection2" or "HeroSection3" to switch hero section types
        />
    );
};

export default AboutPage;
