import React from "react";
import OfferBanner1 from "./OfferBanner1";
import Theme2OfferBanner1 from './Theme2/OfferBanner1'
const OfferBanner = (props) => {
  const { previewMode,activeTheme } = props;
  const offerBannerType = "offer1"
  const renderBanner = () => {
    switch (activeTheme){
      case 1:
        return <OfferBanner1 {...props} />;
      case 2:
        return <Theme2OfferBanner1 {...props} />;
      default:
        return <OfferBanner1 {...props} />;
    }
  };

  return <>{renderBanner()}</>;
};

export default OfferBanner;
