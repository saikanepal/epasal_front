import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useStore } from '../StoreContext';

const Footer = () => {
    const { store, setStore } = useStore();
    const { logo, socialMediaLinks, footerDescription, color, previewMode } = store;

    const handleSaveChanges = () => {
        setStore(prevState => ({
            ...prevState,
            socialMediaLinks: {
                facebook: prevState.socialMediaLinks.facebook,
                twitter: prevState.socialMediaLinks.twitter,
                instagram: prevState.socialMediaLinks.instagram,
                linkedin: prevState.socialMediaLinks.linkedin
            }
        }));
    };

    return (
        <footer style={{ backgroundColor: color.footerColor.background, color: color.footerColor.textColor }} className="py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    {logo && <img src={logo} alt="Store Logo" className="h-12 w-auto mb-2" />}
                    <p className="mt-2 text-center">Contact us:</p>
                </div>

                {!previewMode && (
                    <div className="flex flex-col items-center justify-center md:text-right">
                        <input
                            type="text"
                            value={footerDescription}
                            onChange={(e) => setStore(prevState => ({ ...prevState, footerDescription: e.target.value }))}
                            className="py-1 px-2 mb-2 border border-gray-300 rounded"
                        />
                        <button onClick={handleSaveChanges} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                            Save
                        </button>
                    </div>
                )}

                {previewMode && (
                    <div className=" flex flex-col items-center justify-center md:text-right">
                        <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
                        <p className="mt-2 text-center pl-4">{footerDescription}</p>
                    </div>
                )}

                <div className="flex justify-center mb-4 md:mb-0">
                    {!previewMode && (
                        <>
                            <input
                                type="text"
                                placeholder='Facebook'
                                value={socialMediaLinks.facebook}
                                onChange={(e) => setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, facebook: e.target.value } }))}
                                className="py-1 px-2 mb-2 border border-gray-300 text-black rounded mr-2"
                            />
                            <input
                                type="text"
                                placeholder='Twitter'
                                value={socialMediaLinks.twitter}
                                onChange={(e) => setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, twitter: e.target.value } }))}
                                className="py-1 px-2 mb-2 border border-gray-300 rounded mr-2"
                            />
                            <input
                                type="text"
                                placeholder='Instagram'
                                value={socialMediaLinks.instagram}
                                onChange={(e) => setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, instagram: e.target.value } }))}
                                className="py-1 px-2 mb-2 border border-gray-300 rounded mr-2"
                            />
                            <input
                                type="text"
                                placeholder='Linked In'
                                value={socialMediaLinks.linkedin}
                                onChange={(e) => setStore(prevState => ({ ...prevState, socialMediaLinks: { ...prevState.socialMediaLinks, linkedin: e.target.value } }))}
                                className="py-1 px-2 mb-2 border border-gray-300 rounded mr-2"
                            />
                            <button onClick={handleSaveChanges} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                                Save
                            </button>
                        </>
                    )}

                    {previewMode && (
                        <>
                            <a href={socialMediaLinks.facebook} className="mr-4">
                                <FaFacebook className="text-xl hover:text-blue-500" />
                            </a>
                            <a href={socialMediaLinks.twitter} className="mr-4">
                                <FaTwitter className="text-xl hover:text-blue-400" />
                            </a>
                            <a href={socialMediaLinks.instagram} className="mr-4">
                                <FaInstagram className="text-xl hover:text-pink-500" />
                            </a>
                            <a href={socialMediaLinks.linkedin} className="mr-4">
                                <FaLinkedin className="text-xl hover:text-blue-600" />
                            </a>
                        </>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
