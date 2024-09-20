import React from "react";
import { useStore } from "../ThemeContext";
import OfferBanner from "../../Components/OfferBanner/OfferBanner";
import offerBanner from "../../Assets/offerbanner.webp";

const T1OfferBanner = () => {
  const { store,setStore } = useStore();
  const { previewMode,isEdit ,fetchedFromBackend } = store;

  return (
    <OfferBanner previewMode={previewMode} isEdit={isEdit} fetchedFromBackend={fetchedFromBackend} defaultBgImage={offerBanner} store={store} setStore={setStore}/>
  );
};

export default T1OfferBanner;
