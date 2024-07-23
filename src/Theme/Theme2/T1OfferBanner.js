import React from "react";
import { useStore } from "./T2Context";
import offerBanner from "../../Assets/offerbanner.webp";
import OfferBanner from "../../Components/OfferBanner/OfferBanner";

const T1OfferBanner = () => {
  const { store } = useStore();
  const { previewMode,isEdit } = store;

  return (
    <OfferBanner previewMode={previewMode} isEdit={isEdit} defaultBgImage={offerBanner} />
  );
};

export default T1OfferBanner;
