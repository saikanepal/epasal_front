import React from "react";
import OfferBanner1 from "./OfferBanner1";
import OfferBanner2 from "./OfferBanner2";

const OfferBanner = (props) => {
  const { previewMode ,offerBannerType } = props;
  const renderBanner = () => {
    switch (offerBannerType) {
      case "offer1":
        return <OfferBanner1 {...props} />;
      case "offer2":
        return <OfferBanner2 {...props} />;
    }
  };

  return <>{renderBanner()}</>;
};

export default OfferBanner;
