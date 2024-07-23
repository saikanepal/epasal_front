
import React from "react";
import { useStore } from "./T2Context";

import secondary from "../../Assets/ImageGroup.png";
import ThirdBanner from "../../Components/ThirdBanner/ThirdBanner";

const T1ThirdBanner = ({thirdProductType}) => {
  const { store } = useStore();
  const { previewMode,isEdit } = store;

  return (
    <ThirdBanner previewMode={previewMode} isEdit={isEdit} defaultBgImage={secondary} thirdProductType={thirdProductType}/> 
  );
};

export default T1ThirdBanner;
