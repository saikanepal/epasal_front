import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Link } from 'react-router-dom';

const OfferBanner1 = ({ previewMode, isEdit,fetchedFromBackend, defaultBgImage,store,setStore}) => {

  const { color, offerBannerText } = store;
  const [bgImage, setBgImage] = useState(store?.offerBanner?.offerBannerUrl);

  const onDropBackground = (acceptedFiles) => {
    const backgroundImage = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setBgImage(reader.result);
      setStore((prevState) => ({
        ...prevState,
        offerBanner: {
          ...prevState.offerBanner,
          offerBannerUrl: reader.result
        }
        ,
      }));
    };
    reader.readAsDataURL(backgroundImage);
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setStore((prevState) => ({
      ...prevState,
      offerBannerText: {
        ...prevState.offerBannerText,
        [name]: value,
      },
    }));
  };

  const {
    getRootProps: getRootPropsBackground,
    getInputProps: getInputPropsBackground,
  } = useDropzone({ onDrop: onDropBackground });

  return (
    <div className="py-8 mb-16 flex justify-center" style={{
    }}>
      <div className="w-[95%] flex justify-between">
      <div>
        <div className=" sm:py-1 md:py-1 lg:py-1 h-full">
          <div
            className=" mx-auto mb-8 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0 md:mx-auto h-full "
            style={{
              backgroundColor: color?.offerBannerColor?.backgroundBoxThemeColor1,
            }}
          >
            {" "}
            <div
              className=" mx-4 my-4 p-4  py-4 h-full"
              style={{ borderColor: color?.offerBannerColor?.textColor }}
            >
              <Link to={!isEdit && fetchedFromBackend &&  `/store/products/${store.name}`} className="flex flex-col justify-between h-full">
                {previewMode ? (
                  <>
                    <div>
                      <p
                        className="my-2 lg:my-4 font-bold text-[32px]"
                        style={{ color: color?.offerBannerColor?.textColor }}
                      >
                        {offerBannerText?.para1 || "Offer Info"}
                      </p>
                      <p
                        className="mt-2 lg:my-4  text-[16px] font-normal"
                        style={{ color: color.offerBannerColor.textColor }}
                      >
                        {offerBannerText?.para2 || "What is on discount or what offer do you have"}
                      </p>
                    </div>
                    <div className="flex">
                    <p
                      className="mt-2  lg:my-4  text-[16px] font-normal px-16 py-4 bg-gray-200 rounded-xl"
                      style={{ color: color.offerBannerColor.textColor }}
                    >
                      {offerBannerText?.para3 || "Call to Action Button"}
                    </p>
                    </div>
                  </>
                ) : (

                  <>
                    <div>
                      <textarea
                        name="para1"
                        value={offerBannerText?.para1 || ""}
                        onChange={handleTextChange}
                        className="mt-2 text-[32px] font-normal w-[90%] border border-gray-500"
                        style={{ color: color?.offerBannerColor?.textColor }}
                        placeholder="OUR NISCHE COLLECTION"
                      />
                      <textarea
                        name="para2"
                        value={offerBannerText?.para2 || ""}
                        onChange={handleTextChange}
                        className="mt-2 text-[16px] font-normal w-[90%] border border-gray-500"
                        style={{ color: color?.offerBannerColor?.textColor }}
                        placeholder="40% OFF"
                      />{" "}
                    </div>
                    <textarea
                      name="para3"
                      value={offerBannerText?.para3 || ""}
                      onChange={handleTextChange}
                      className="mt-2 text-[16px] font-normal w-[90%] border border-gray-500"
                      style={{ color: color?.offerBannerColor?.textColor }}
                      placeholder="GET YOURS NOW"
                    />{" "}
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className="box-border relative w-[65%] shadow-lg min-h-[300px] sm:h-[600px] md:h-[800px] lg:h-[400px] lg:min-h-[450px] flex flex-col sm:flex-col sm:space-y-5 lg:space-y-0  lg:flex-row md:justify-center items-center   px-3  py-10 text-black  rounded-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: color?.offerBannerColor?.backgroundThemeColor,
          fontFamily: store?.fonts?.Banner3,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: previewMode ? 0.4 : 1,
          backgroundColor: color.offerBannerColor.backgroundThemeColor1,
        }}
      >
        

        <div className="flex">

                <div className=" w-2/3">
                <input {...getInputPropsBackground()} />
                <div className=" h-full ">
                    <img
                    src={store?.offerBanner?.offerBannerUrl}
                    alt="Product"
                    className="relative rounded-md  md:h-[400px] w-full xl:h-[380px] xl:pr-10 2xl:h-[380px] object-cover "
                    />
                </div>
                </div>
                <div>
                {previewMode ? (
                  <>
                      <p
                        className="my-2 lg:my-4 font-bold text-[16px]"
                        style={{ color: color?.offerBannerColor?.textColor }}
                      >
                        {offerBannerText?.para4 || "Some Additional information"}
                      </p>
                      <p
                        className="mt-2 lg:my-4  text-[16px] font-normal"
                        style={{ color: color.offerBannerColor.textColor }}
                      >
                        {offerBannerText?.para5 || "Further Explanation"}
                      </p>
                    
                  </>
                ) : (

                  <>
                      <textarea
                        name="para4"
                        value={offerBannerText?.para4 || ""}
                        onChange={handleTextChange}
                        className="mt-2 text-[16px] font-normal w-[90%] border border-gray-500"
                        style={{ color: color?.offerBannerColor?.textColor }}
                        placeholder="Some Additional information"
                      />
                      <textarea
                        name="para5"
                        value={offerBannerText?.para5 || ""}
                        onChange={handleTextChange}
                        className="mt-2 text-[16px] font-normal w-[90%] border border-gray-500"
                        style={{ color: color?.offerBannerColor?.textColor }}
                        placeholder="Further Explanation"
                      />{" "}
                    
                  </>
                )}
                </div>
                {(!previewMode) && (
                <div className="absolute top-0 right-0 mt-2 mr-2">
                    <div
                    className="inline-block bg-gray-100 h-10 rounded border-2 border-success px-6 pb-[6px] pt-2 p-auto text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-success-50/50 hover:text-success-600 focus:border-success-600 focus:bg-success-50/50 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 motion-reduce:transition-none hover:bg-slate-400"
                    {...getRootPropsBackground()}
                    >
                    Upload Image
                    </div>
                </div>
                )}
                
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default OfferBanner1;
