import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import { useImage } from "../../../Hooks/useImage";
import { Link } from "react-router-dom";
const ThirdBanner1 = ({ previewMode, isEdit, defaultBgImage, storeName, fetchedFromBackend, store, setStore }) => {
  const { color, secondaryBannerText, thirdBannerText, thirdSemiBannerText } = store;
  const { uploadImage } = useImage();
  const navigate = useNavigate()
  const onDropBackground = (acceptedFiles) => {
    const backgroundImage = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = async () => {

      setStore((prevState) => ({
        ...prevState,
        thirdBanner: {
          ...prevState.thirdBanner,
          thirdBannerUrl: reader.result
        },

      }));

    };
    reader.readAsDataURL(backgroundImage);
  };

  const onDropSemiBackground = (acceptedFiles) => {
    const backgroundImage = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = async () => {

      setStore((prevState) => ({
        ...prevState,
        thirdBanner: {
          ...prevState.thirdBanner,
          thirdSemiBannerUrl: reader.result
        },

      }));

    };
    reader.readAsDataURL(backgroundImage);
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setStore((prevState) => ({
      ...prevState,
      thirdBannerText: {
        ...prevState.thirdBannerText,
        [name]: value,
      },
    })
    );
  };

  const handleSemiTextChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setStore((prevState) => ({
      ...prevState,
      thirdSemiBannerText: {
        ...prevState.thirdSemiBannerText,
        [name]: value,
      },
    })
    );
  };

  const {
    getRootProps: getRootPropsBackground,
    getInputProps: getInputPropsBackground,
  } = useDropzone({ onDrop: onDropBackground });

  const {
    getRootProps: getRootPropsSemiBackround,
    getInputProps: getInputPropsSemiBackground,
  } = useDropzone({ onDrop: onDropSemiBackground });

  return (
    <div className="flex justify-center" >
      <div className="w-screen md:w-[98%] flex gap-4">
        <motion.div
          className="box-border font-roboto relative shadow-2xl min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[400px] flex flex-col sm:flex-col md:flex-row lg:flex-row justify-between items-center text-black w-screen md:min-w-[65%] rounded-2xl overflow-hidden border border-gray-200"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: store?.fonts?.Banner1,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: previewMode ? 0.4 : 1,
            backgroundColor: color.firstBannerColor.backgroundThemeColor1

          }}
        >
          <input {...getInputPropsBackground()} />
          <div className="w-full sm:w-full mx-4 my-4 rounded-2xl overflow-hidden md:w-1/2 lg:w-1/2">
            <img
              src={store?.thirdBanner?.thirdBannerUrl}
              alt="Product"
              className="w-full h-60 sm:h-[350px] md:h-[400px] lg:h-[400px] object-cover"
            />
          </div>
          <div className="w-full  pl-4 my-4 sm:w-full md:w-1/2  lg:w-1/2 md:min-h-[400px] lg:min-h-[400px] flex flex-col justify-between text-center md:text-left">
            {previewMode ? (
              <div className="mb-6 md:mb-0">
                <h2
                  className="text-[20px] lg:text-[24px] xl:text-[32px] font-bold"
                  style={{ color: color.firstBannerColor.textColor }}
                >
                  {thirdBannerText?.heading || "Rekindle with class"}
                </h2>
                <p
                  className="mt-2 text-[12px] lg:text-[16px] font-normal"
                  style={{ color: color.firstBannerColor.textColor }}
                >
                  {thirdBannerText.paragraph ||
                    "Step into a realm of refined allure with the latest masterpiece in beauty."}
                </p>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  name="heading"
                  value={thirdBannerText?.heading || ""}
                  onChange={handleTextChange}
                  className="text-[20px] lg:text-[24px] xl:text-[32px] font-bold mb-2 w-[90%] border border-gray-500"
                  style={{ color: color.firstBannerColor.textColor }}
                  placeholder="Rekindle with class"
                />
                <textarea
                  name="paragraph"
                  value={thirdBannerText?.paragraph || ""}
                  onChange={handleTextChange}
                  className="mt-2 text-[12px] lg:text-[16px] font-normal w-[90%] border border-gray-500"
                  style={{ color: color.firstBannerColor.textColor }}
                  placeholder="Step into a realm of refined allure with the latest masterpiece in beauty."
                />
              </div>
            )}

            <div className="flex justify-center items-center md:block">
              <button
                className={`w-[85%] md:w-auto h-12 rounded-lg border-2 border-success px-6 py-8 text-xs font-light md:text-xs lg:text-base uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-success-50/50 hover:text-success-600 focus:border-success-600 focus:bg-success-50/50 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 motion-reduce:transition-none hover:border-2 flex items-center justify-center
                        ${!previewMode ? "cursor-not-allowed opacity-50" : ""
                  }`}
                style={{
                  color: color.firstBannerColor?.buttonText,
                  backgroundColor: color.firstBannerColor?.buttonColor,
                }}
              >
                <Link to={!isEdit && fetchedFromBackend && `/store/products/${store.name}`}>
                  Explore More <span className="text-lg ml-3 my-auto">&gt;</span>
                </Link>

              </button>
            </div>
          </div>
          {(!previewMode) && (
            <div className="absolute top-0 left-0 mt-2 mr-2">
              <div
                className="inline-block bg-gray-100 h-10 rounded border-2 border-success px-6 pb-[6px] pt-2 p-auto text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-success-50/50 hover:text-success-600 focus:border-success-600 focus:bg-success-50/50 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 motion-reduce:transition-none hover:bg-slate-400"
                {...getRootPropsBackground()}
              >
                Upload Image
              </div>
            </div>
          )}
        </motion.div>
        <div className="hidden md:flex flex-col relative">
          <div className="h-1/2">
            <img
              src={store?.thirdBanner?.thirdSemiBannerUrl}
              alt="Product"
              className="object-cover h-full"
            />

          </div>
          <div
            className="box-border flex-grow font-roboto relative shadow-2xl h-1/2 flex flex-col sm:flex-col md:flex-row lg:flex-row text-black rounded-2xl overflow-hidden border border-gray-200 pl-4"
            style={{
              fontFamily: store?.fonts?.Banner1,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: color.firstBannerColor.backgroundThemeColor1
            }}
          >
            {previewMode ? (
              <div >
                <h2
                  className="text-[16px] font-bold"
                  style={{ color: color.firstBannerColor.textColor }}
                >
                  {thirdSemiBannerText?.heading || "Rekindle with class"}
                </h2>
                <p
                  className="mt-2 text-[16px] font-normal"
                  style={{ color: color.firstBannerColor.textColor }}
                >
                  {thirdSemiBannerText?.paragraph ||
                    "Step into a realm of refined allure with the latest masterpiece in beauty."}
                </p>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  name="heading"
                  value={thirdSemiBannerText?.heading || ""}
                  onChange={handleSemiTextChange}
                  className="text-[16px] font-bold mb-2 w-[90%] border border-gray-500"
                  style={{ color: color.firstBannerColor.textColor }}
                  placeholder="Rekindle with class"
                />
                <textarea
                  name="paragraph"
                  value={thirdSemiBannerText?.paragraph || ""}
                  onChange={handleSemiTextChange}
                  className="mt-2 text-[16px] font-normal w-[90%] border border-gray-500"
                  style={{ color: color.firstBannerColor.textColor }}
                  placeholder="Step into a realm of refined allure with the latest masterpiece in beauty."
                />
              </div>
            )}


          </div>
          {(!previewMode) && (
            <div className="absolute top-0 right-0 mt-2 mr-2" >
              <div
                className="inline-block bg-gray-100 h-10 rounded border-2 border-success px-6 pb-[6px] pt-2 p-auto text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-success-50/50 hover:text-success-600 focus:border-success-600 focus:bg-success-50/50 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 motion-reduce:transition-none hover:bg-slate-400"
                {...getRootPropsSemiBackround()}
              >
                <input {...getInputPropsSemiBackground()} />
                Upload Image
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThirdBanner1;