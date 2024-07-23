import React from "react";
import SecondaryBanner1 from "./SecondaryBanner1";
import SecondaryBanner2 from "./SecondaryBanner2";

const SecondaryBanner = (props) => {
  const { previewMode ,secondaryBannerType} = props;

  const renderBanner = () => {
    switch (secondaryBannerType) {
      case 'SecondaryBanner1':
        return <SecondaryBanner1 {...props} />;
      case 'SecondaryBanner2':
        return <SecondaryBanner2 {...props} />;
      default:
        return <SecondaryBanner1 {...props} />;
    }
  };

  return <>{renderBanner()}</>;
};

export default SecondaryBanner;
