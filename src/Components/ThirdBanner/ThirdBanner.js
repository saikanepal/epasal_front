import React from "react";
import ThirdBanner1 from "./ThirdBanner1";
import ThirdBanner2 from "./ThirdBanner2";
const ThirdBanner = (props) => {
  const { thirdProductType } = props;

  const renderBanner = () => {
    switch (thirdProductType) {
      case 'ThirdBanner1':
        return <ThirdBanner1 {...props} />;
      case 'ThirdBanner2':
        return <ThirdBanner2 {...props} />;
      default:
        return null;
    }
  };

  return <>{renderBanner()}</>;
};

export default ThirdBanner;