

import React from "react";
import { useStore } from "../ThemeContext";
import SecondaryBanner from "../../Components/SecondaryBanner/SecondaryBanner";
import secondary from "../../Assets/ImageGroup.png";

const T1SecondaryBanner = () => {
  const { store,setStore } = useStore();

  const { previewMode, isEdit ,fetchedFromBackend,theme} = store;

  return (
    <SecondaryBanner theme={theme} previewMode={previewMode} isEdit={isEdit} fetchedFromBackend={fetchedFromBackend} defaultBgImage={secondary} store={store} setStore={setStore}/>
  );
};

export default T1SecondaryBanner;
