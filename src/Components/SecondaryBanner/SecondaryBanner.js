import React from "react";
import SecondaryBanner1 from "./SecondaryBanner1";
import Theme2SecondaryBanner1 from './Theme2/SecondaryBanner1';
const SecondaryBanner = (props) => {
  const { previewMode,theme } = props;

  const renderBanner = () => {
    switch (theme){
      case 1:
        return <SecondaryBanner1 {...props}/>;
      case 2:
        return <Theme2SecondaryBanner1 {...props}/>;
      default:
        return <SecondaryBanner1 {...props}/>;
    }
    //return <Theme2SecondaryBanner1 {...props}/>;
  };

  return <>{renderBanner()}</>;
};

export default SecondaryBanner;
