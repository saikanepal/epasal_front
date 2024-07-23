

import React from "react";
import { useStore } from "./T2Context";
import secondary from "../../Assets/ImageGroup.png";
import SecondaryBanner from "../../Components/SecondaryBanner/SecondaryBanner";

const T1SecondaryBanner = ({secondaryBannerType}) => {
  const { store } = useStore();
  const { previewMode,isEdit } = store;

  return (
    <SecondaryBanner previewMode={previewMode} isEdit={isEdit} defaultBgImage={secondary} store={store} secondaryBannerType={secondaryBannerType}/> 
  );
};

export default T1SecondaryBanner;
