import React from 'react';
import HeroSection1 from './HeroSection1';
// import HeroSection2 from './HeroSection2';
// import HeroSection3 from './HeroSection3';

const HeroSection = ({ heroSectionProps, heroSectionType }) => {
    const renderHeroSection = () => {
        switch (heroSectionType) {
            case 'HeroSection1':
                return <HeroSection1 {...heroSectionProps} />;
            // case 'HeroSection2':
            //     return <HeroSection2 {...heroSectionProps} />;
            // case 'HeroSection3':
            //     return <HeroSection3 {...heroSectionProps} />;
            default:
                return null;
        }
    };

    return <>{renderHeroSection()}</>;
};

export default HeroSection;
