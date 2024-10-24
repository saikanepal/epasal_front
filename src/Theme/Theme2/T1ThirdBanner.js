
import React from "react";
import { useStore } from "../ThemeContext";

import secondary from "../../Assets/ImageGroup.png";
import ThirdBanner from "../../Components/ThirdBanner/ThirdBanner";

const T1ThirdBanner = () => {
  const { store, setStore  } = useStore();
  const { previewMode,isEdit,fetchedFromBackend,theme } = store;

  return (
    <ThirdBanner theme={theme} previewMode={previewMode} isEdit={isEdit} fetchedFromBackend={fetchedFromBackend} defaultBgImage={secondary} store={store} setStore={setStore}/> 
  );
};

export default T1ThirdBanner;
