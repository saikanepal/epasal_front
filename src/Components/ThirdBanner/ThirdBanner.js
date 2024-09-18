import React from "react";
import ThirdBanner1 from "./ThirdBanner1";
import Theme2ThirdBanner1 from './Theme2/ThirdBanner1'
const SecondaryBanner = (props) => {
  const { previewMode } = props;

  const renderBanner = () => {
    // switch (previewMode) {
    //   case true:
    //     return <ThirdBanner1 {...props} />;
    //   case false:
    //     return <ThirdBanner1 {...props} />;
    //   default:
    //     return <ThirdBanner1 {...props} />;
    // }
    return <Theme2ThirdBanner1 {...props}/>
  };

  return <>{renderBanner()}</>;
};

export default SecondaryBanner;