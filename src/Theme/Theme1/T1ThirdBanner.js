
import React from "react";
import { useStore } from "./T1Context";

import secondary from "../../Assets/ImageGroup.png";
import ThirdBanner1 from "../../Components/ThirdBanner/ThirdBanner1";

const T1ThirdBanner = () => {
  const { store } = useStore();
  const { previewMode } = store;

  return (
    <ThirdBanner1 previewMode={previewMode} defaultBgImage={secondary} /> 
  );
};

export default T1ThirdBanner;
