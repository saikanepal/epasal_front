import React, { useState, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import useFetch from '../../../../Hooks/useFetch';
import { AuthContext } from '../../../../Hooks/AuthContext';
import { useImage } from '../../../../Hooks/useImage';
import { toast } from 'react-toastify';
import Loading from "../../../Loading/Loading"

const General = ({ store, setDashboardState }) => {
    const { uploadImage } = useImage();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...store });
    const [newSubCategory, setNewSubCategory] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const auth = useContext(AuthContext);

    const handleInputChange2 = (e) => {
        const inputScript = e.target.value;
        const scriptRegex = /s1\.src\s*=\s*['"]([^'"]+)['"]/;
        const match = inputScript.match(scriptRegex);

        if (match) {
            const extractedSrc = match[1];
            setFormData({ ...formData, liveChatSource: extractedSrc });
        } else {
            setFormData({ ...formData, liveChatSource: '' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, arrayName, index) => {
        const { value } = e.target;
        const newArray = [...formData[arrayName]];
        newArray[index].name = value;
        setFormData({ ...formData, [arrayName]: newArray });
    };

    const handleCopyLink = () => {
        const link = `${process.env.REACT_APP_DIRECT_URL}/${store?.name}`;
        navigator.clipboard.writeText(link).then(() => {
            setCopySuccess('Link copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }).catch(err => {
            setCopySuccess('Failed to copy!');
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const uploadImages = async () => {
                const updatedData = { ...formData };

                const uploadIfNeeded = async (image, type, subType = 'qr') => {
                    if (image) {
                        const uploadedImage = await uploadImage(image);
                        updatedData[type][subType].imageUrl = uploadedImage.img;
                        updatedData[type][subType].imageID = uploadedImage.id;
                    }
                };

                await Promise.all([
                    uploadIfNeeded(formData.esewa?.qr?.imageUrl, 'esewa'),
                    uploadIfNeeded(formData.bank?.qr?.imageUrl, 'bank'),
                    uploadIfNeeded(formData.khalti?.qr?.imageUrl, 'khalti')
                ]);

                return updatedData;
            };

            const updatedFormData = await uploadImages();

            const responseData = await sendRequest(
                'store/update/dashboard/' + store._id,
                'PUT',
                JSON.stringify(updatedFormData),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token
                }
            );
            toast.success(responseData.message);
            window.location.reload();
        } catch (error) {
            toast.error(error.message)
            console.error(error.message || 'An error occurred during login');
        }
        setIsEditing(false);
    };

    const handleDrop = useCallback((acceptedFiles, type) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            const imageUrl = reader.result;
            setFormData((prevData) => ({
                ...prevData,
                [type]: {
                    ...prevData[type],
                    qr: {
                        ...prevData[type].qr,
                        imageUrl: imageUrl
                    }
                }
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }, []);

    const handleAddSubCategory = () => {
        if (newSubCategory.trim()) {
            setFormData({
                ...formData,
                subCategories: [...formData.subCategories, { name: newSubCategory.trim() }]
            });
            setNewSubCategory('');
        }
    };

    const esewaDropzone = useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'esewa')
    });

    const bankDropzone = useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'bank')
    });

    const khaltiDropzone = useDropzone({
        onDrop: (acceptedFiles) => handleDrop(acceptedFiles, 'khalti')
    });

    const renderDropzone = (type, dropzoneProps) => (
        <div className="mb-4 flex justify-center flex-col items-center mx-auto">
            <div {...dropzoneProps.getRootProps({ className: 'dropzone' })} className="flex flex-col justify-center items-center w-full h-72 p-4 border-dashed border-2 border-gray-400 rounded-lg cursor-pointer text-center">
                <input {...dropzoneProps.getInputProps()} />
                <h1 className='font-bold'>QR CODE</h1>
                <p>Drag 'n' drop an image here, or click to select one</p>
            </div>
            {formData[type]?.qr?.imageUrl && <img src={formData[type].qr.imageUrl} alt={`${type} QR`} className="w-60 h-60 mt-2 border border-gray-400 rounded-lg" />}
        </div>
    );

    function capitalizeFirstLetter(word) {
        if (typeof word !== 'string' || word.length === 0) {
            return word; // Return the word as is if it's not a string or is empty
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    if (!store) {
        return <div className="text-center py-10">No store data available</div>;
    }


    const {
        name,
        logo,
        email,
        subCategories,
        location,
        socialMediaLinks,
        owner,
        esewa,
        bank,
        khalti,
        phoneNumber,
        promoCode,
        subscriptionStatus,
        expectedDeliveryTime,
        expectedDeliveryPrice,
        liveChatSource,
        subscriptionExpiry,
        componentSkin,
        skin,
        audioUrl
    } = formData;

    return (
        isLoading ? <Loading /> :
            <div className="p-2 md:p-6 bg-white rounded-lg w-full">
                <div className="flex gap-5 justify-end mb-4">
                    {isEditing && <button
                        type="submit"
                        className="bg-[#3E813A] text-white px-5 md:px-8 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                        Save
                    </button>
                    }
                    <button
                        className={`${isEditing ? "bg-[#A23728] hover:bg-red-700 " : "bg-blue-600 hover:bg-blue-600 "} text-white px-5 md:px-8 py-2 rounded-md transition-colors`}
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                </div>
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {/* General Info Section */}
                            <label className="col-span-1 md:col-span-2 text-[#E9960C] font-semibold text-lg ">General Info</label>

                            {/* First Section */}
                            <div className="shadow-bottom-right p-4 bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Owner:</h2>
                                    <p className="text-lg text-gray-600 font-semibold">{owner.name}</p>
                                </section>
                                <section className="p-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Subscription Information:</h2>
                                    <p className="text-[15px] text-gray-600"><span className='text-gray-900'>Subscription Status: </span>{subscriptionStatus}</p>
                                    <p className="text-[15px] text-gray-600"><span className='text-gray-900'>Subscription Expiry:</span> {new Date(subscriptionExpiry).toLocaleDateString()}</p>
                                </section>
                            </div>

                            {/* Second Section */}
                            <div className="shadow-bottom-right p-4 flex flex-col bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Store URL</h2>
                                    <div className="flex items-center space-x-2">
                                        <li className="text-gray-600 hover:text-gray-700">
                                            <Link to={`/store/${store?.name}`} target="_blank" rel="noopener noreferrer">
                                                {`${process.env.REACT_APP_DIRECT_URL}/${store?.name}`}
                                            </Link>
                                        </li>
                                        <button
                                            onClick={handleCopyLink}
                                            className="ml-2 p-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded flex items-center"
                                        >
                                            <FaCopy className="mr-1" /> Copy
                                        </button>
                                    </div>
                                    {copySuccess && <p className="text-sm text-green-500 mt-2">{copySuccess}</p>}
                                </section>
                                <section className="px-2 py-2">
                                    {
                                        (subscriptionStatus !== 'Silver') ? (
                                            <div>
                                                <div className='flex flex-col'>
                                                    <label className="text-sm font-semibold text-[#AD7A29] mb-2">Name:</label>
                                                    <input
                                                        type="text"
                                                        value={promoCode[0]?.name}
                                                        onChange={(e) => setFormData({ ...formData, promoCode: [{ name: e.target.value, value: formData?.promoCode[0]?.value }] })}
                                                        placeholder="PromoCode"
                                                        className="p-2 border text-sm text-gray-800 border-gray-400 rounded flex-grow"
                                                    />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <label className="text-sm font-semibold text-[#AD7A29] my-2">Discount (%):</label>
                                                    <input
                                                        type="number"
                                                        value={promoCode[0]?.value}
                                                        onChange={(e) => setFormData({ ...formData, promoCode: [{ value: e.target.value, name: formData?.promoCode[0]?.name }] })}
                                                        placeholder="Discount"
                                                        className="p-2 border text-sm text-gray-800 border-gray-400 rounded flex-grow"
                                                    />
                                                </div>
                                                <button className='bg-[#3E813A] mt-4     text-sm text-white px-10 p-2 rounded-md hover:bg-green-600 transition-colors' >Add</button>
                                            </div>
                                        ) : ''
                                    }
                                </section>
                            </div>

                            {/* Webpage Info Section */}
                            <label className="col-span-1 md:col-span-2 text-[#E9960C] font-semibold text-lg mt-4">Webpage Info</label>

                            {/* Delivery Status Section */}
                            <div className="shadow-bottom-right p-4 bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Delivery Status:</h2>
                                    <p className="text-sm text-gray-800"><span> Expected Delivery Time: </span>
                                        <input
                                            type="text"
                                            name="DeliveryTime"
                                            value={expectedDeliveryTime}
                                            onChange={(e) => { setFormData({ ...formData, expectedDeliveryTime: e.target.value }) }}
                                            placeholder="Expected Delivery Time"
                                            className="my-2 p-2 w-full border border-gray-400 rounded"
                                        /></p>
                                    <p className="text-sm text-gray-800"><span> Expected Delivery Price: </span>
                                        <input
                                            type="text"
                                            name="DeliveryTime"
                                            value={expectedDeliveryTime}
                                            onChange={(e) => { setFormData({ ...formData, expectedDeliveryTime: e.target.value }) }}
                                            placeholder="Expected Delivery Time"
                                            className="my-2 p-2 w-full border border-gray-400 rounded"
                                        /></p>
                                </section>
                            </div>

                            <div className="shadow-bottom-right p-4 bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Live Chat URL (tawk.io)</h2>
                                    {(subscriptionStatus === 'Silver') && <div className='text-gray-400'>Upgrade to higher tier for this section <button onClick={() => { setDashboardState('Shop') }} className='ml-2 px-4 py-1 bg-black text-white rounded-2xl'>Go</button></div>}
                                    {
                                        (subscriptionStatus !== 'Silver') && (
                                            <>
                                                <div>
                                                    <textarea
                                                        name="liveChatSourceScript"
                                                        onChange={handleInputChange2}
                                                        placeholder="Paste the Tawk.to script here"
                                                        className="mb-2 text-sm text-gray-800 p-2 w-full border border-gray-400 rounded"
                                                        rows="5"
                                                    ></textarea>

                                                    <input
                                                        type="text"
                                                        name="liveChatSource"
                                                        value={formData.liveChatSource}
                                                        readOnly
                                                        placeholder="Live Chat URL"
                                                        className="mb-2 p-2 text-sm text-gray-800 w-full border border-gray-400 rounded"
                                                    />
                                                </div>
                                            </>
                                        )
                                    }
                                </section>
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Audio URL</h2>
                                    {(subscriptionStatus !== 'Platinum') && <div className='text-gray-400'>Upgrade to Platinum tier for this section <button onClick={() => { setDashboardState('Shop') }} className='ml-2 mt-2 md:mt-0 px-4 py-1 bg-black text-white rounded-2xl'>Go</button></div>}
                                    {
                                        (subscriptionStatus === 'Platinum') && (
                                            <>
                                                <div className='flex flex-col'>
                                                    <input
                                                        type="text"
                                                        name="audioUrl"
                                                        value={audioUrl}
                                                        onChange={handleInputChange}
                                                        placeholder="Audio Url"
                                                        className="p-2 border text-sm text-gray-800 border-gray-400 rounded flex-grow"
                                                    />
                                                </div>
                                            </>
                                        )
                                    }
                                </section>
                            </div>



                            {/* Categories Section */}
                            <div className="shadow-bottom-right p-4 bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Categories</h2>
                                    {subCategories.map((subCategory, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={subCategory?.name}
                                            onChange={(e) => handleArrayChange(e, 'subCategories', index)}
                                            placeholder="Category"
                                            className="mb-2 p-2 w-full border text-sm text-gray-800 border-gray-400 rounded"
                                        />
                                    ))}
                                    <div className="flex mt-4">
                                        <input
                                            type="text"
                                            value={newSubCategory}
                                            onChange={(e) => setNewSubCategory(e.target.value)}
                                            placeholder="New Category"
                                            className="p-2 border text-sm text-gray-800 border-gray-400 rounded flex-grow"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddSubCategory}
                                            className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </section>
                            </div>

                            <div className="shadow-bottom-right p-4 flex flex-col gap-2 bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Contact Information</h2>
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className="mb-2 p-2 w-full border border-gray-400 text-sm text-gray-800 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="location"
                                        value={location}
                                        onChange={handleInputChange}
                                        placeholder="Location"
                                        className="mb-2 p-2 w-full border border-gray-400 text-sm text-gray-800 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="Phone Number"
                                        className="mb-2 p-2 w-full border border-gray-400 text-sm text-gray-800 rounded"
                                    />
                                </section>
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Social Media Links</h2>
                                    {Object.entries(socialMediaLinks).map(([platform, url], index) => (
                                        <div key={index} className="mb-2">
                                            <label className="text-sm font-semibold text-[#AD7A29] mb-2">{capitalizeFirstLetter(platform)}</label>
                                            <input
                                                type="text"
                                                name={`socialMediaLinks.${platform}`}
                                                value={url}
                                                onChange={(e) => {
                                                    const newLinks = { ...socialMediaLinks, [platform]: e.target.value };
                                                    setFormData({ ...formData, socialMediaLinks: newLinks });
                                                }}
                                                placeholder={`${platform} URL`}
                                                className="p-2 w-full text-sm text-gray-800 border border-gray-400 rounded"
                                            />
                                        </div>
                                    ))}
                                </section>
                            </div>

                            {/* Payment Details Section */}
                            <div className="col-span-1 md:col-span-2 shadow-bottom-right p-4 bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Payment Details</h2>
                                    <div className='flex flex-col md:flex-row gap-8 '>
                                        <div className="mb-4 w-full md:w-[30%]">
                                            <h3 className="text-sm font-semibold text-[#AD7A29] mb-2">eSewa</h3>
                                            <input
                                                type="text"
                                                name="esewa.accountNumber"
                                                value={esewa?.accountNumber}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, esewa: { ...esewa, accountNumber: e.target.value } });
                                                }}
                                                placeholder="Phone Number"
                                                className="mb-4 p-2 w-full border text-sm text-gray-800 border-gray-400 rounded"
                                            />
                                            {renderDropzone('esewa', esewaDropzone)}
                                        </div>
                                        <div className="mb-4 w-full md:w-[30%]">
                                            <h3 className="text-sm font-semibold text-[#AD7A29] mb-2">Khalti</h3>
                                            <input
                                                type="text"
                                                name="khalti.accountNumber"
                                                value={khalti?.accountNumber}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, khalti: { ...khalti, accountNumber: e.target.value } });
                                                }}
                                                placeholder="Phone Number"
                                                className="mb-4 p-2 w-full border text-sm text-gray-800 border-gray-400 rounded"
                                            />
                                            {renderDropzone('khalti', khaltiDropzone)}
                                        </div>
                                        <div className="mb-4 w-full md:w-[30%]">
                                            <h3 className="text-sm font-semibold text-[#AD7A29] mb-2">Bank</h3>
                                            <div className="flex gap-1">
                                                <input
                                                    type="text"
                                                    name="bank.accountNumber"
                                                    value={bank?.accountNumber}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, bank: { ...bank, accountNumber: e.target.value } });
                                                    }}
                                                    placeholder="Account Number"
                                                    className="mb-2 p-2 w-full border text-sm text-gray-800 border-gray-400 rounded"
                                                />
                                                <input
                                                    type="text"
                                                    name="bank.fullname"
                                                    value={bank?.fullname}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, bank: { ...bank, fullname: e.target.value } });
                                                    }}
                                                    placeholder="Full Name"
                                                    className="mb-2 p-2 w-full border text-sm text-gray-800 border-gray-400 rounded"
                                                />
                                            </div>
                                            {renderDropzone('bank', bankDropzone)}
                                        </div>
                                    </div>


                                </section>
                            </div>



                        </div>

                    </form>
                ) : (
                    <>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {/* General Info Section */}
                            <label className="col-span-1 md:col-span-2 text-[#E9960C] font-semibold text-lg ">General Info</label>

                            {/* First Section */}
                            <div className="shadow-bottom-right p-4 bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Owner:</h2>
                                    <p className="text-lg text-gray-600 font-semibold">{owner.name}</p>
                                </section>
                                <section className="p-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Subscription Information:</h2>
                                    <p className="text-[15px] text-gray-600"><span className='text-gray-900'>Subscription Status: </span>{subscriptionStatus}</p>
                                    <p className="text-[15px] text-gray-600"><span className='text-gray-900'>Subscription Expiry:</span> {new Date(subscriptionExpiry).toLocaleDateString()}</p>
                                </section>
                            </div>

                            {/* Second Section */}
                            <div className="shadow-bottom-right p-4 bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Store URL</h2>
                                    <div className="flex items-center space-x-2">
                                        <li className="text-gray-600 hover:text-gray-700">
                                            <Link to={`/store/${store?.name}`} target="_blank" rel="noopener noreferrer">
                                                {`${process.env.REACT_APP_DIRECT_URL}/${store?.name}`}
                                            </Link>
                                        </li>
                                        <button
                                            onClick={handleCopyLink}
                                            className="ml-2 p-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 rounded flex items-center"
                                        >
                                            <FaCopy className="mr-1" /> Copy
                                        </button>
                                    </div>
                                    {copySuccess && <p className="text-sm text-green-500 mt-2">{copySuccess}</p>}
                                </section>
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Promo Code</h2>
                                    {promoCode.length === 0 &&
                                        <div className='text-gray-600 text-sm'>None available</div>}
                                    {(subscriptionStatus === 'Silver') ? (
                                        <div className='text-gray-400 text-sm'>
                                            Upgrade to a higher tier for this section
                                            <button onClick={() => { setDashboardState('Shop') }} className='ml-2 px-4 py-1 bg-black text-white rounded-2xl'>Go</button>
                                        </div>
                                    ) : (
                                        promoCode?.map((data, i) => (
                                            <div key={i} className="text-sm">
                                                {data?.name} : {data?.value}%
                                            </div>
                                        ))
                                    )}
                                </section>
                            </div>

                            {/* Webpage Info Section */}
                            <label className="col-span-1 md:col-span-2 text-[#E9960C] font-semibold text-lg mt-4">Webpage Info</label>

                            {/* Delivery Status Section */}
                            <div className="shadow-bottom-right p-4 bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Delivery Status:</h2>
                                    <p className="text-sm text-gray-600"><span className='text-gray-800'>Expected Delivery Time: </span> {expectedDeliveryTime}</p>
                                    <p className="text-sm text-gray-600"><span className='text-gray-800'> Expected Delivery Price: </span> {expectedDeliveryPrice}</p>
                                </section>
                            </div>

                            <div className="shadow-bottom-right p-4 bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Live Chat URL (tawk.io)</h2>
                                    {(subscriptionStatus === 'Silver') ? (
                                        <div className='text-gray-400 text-sm'>
                                            Upgrade to a higher tier for this section
                                            <button onClick={() => { setDashboardState('Shop') }} className='ml-2 px-4 py-1 bg-black text-white rounded-2xl'>Go</button>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-600">URL Source: {liveChatSource}</p>
                                    )}
                                </section>
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Audio URL</h2>
                                    {(subscriptionStatus !== 'Platinum') ? (
                                        <div className='text-gray-400 text-sm'>
                                            Upgrade to Platinum tier for this section
                                            <button onClick={() => { setDashboardState('Shop') }} className='ml-2 px-4 py-1 bg-black text-white rounded-2xl'>Go</button>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-600">URL Source: {audioUrl}</p>
                                    )}
                                </section>
                            </div>



                            {/* Categories Section */}
                            <div className="shadow-bottom-right p-4 bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Categories</h2>
                                    <ul className="list-disc pl-5 space-y-2">
                                        {subCategories.map((subCategory, index) => (
                                            <li key={index} className="text-sm text-gray-600">{subCategory.name}</li>
                                        ))}
                                    </ul>
                                </section>
                            </div>

                            {/* Payment Details Section */}
                            <div className="shadow-bottom-right p-4 bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Payment Details</h2>
                                    <div className="mb-4">
                                        <h3 className="text-md font-medium text-gray-600">eSewa</h3>
                                        <p className="text-sm text-gray-600">Account Number: {esewa?.accountNumber}</p>
                                        {esewa?.qr?.imageUrl && <img src={esewa.qr.imageUrl} alt="eSewa QR" className="w-32 h-32 mt-2 border border-gray-200 rounded-lg" />}
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-md font-medium text-gray-600">Bank</h3>
                                        <p className="text-sm text-gray-600">Account Number: {bank?.accountNumber}</p>
                                        <p className="text-sm text-gray-600">Full Name: {bank?.fullname}</p>
                                        {bank?.qr?.imageUrl && <img src={bank.qr.imageUrl} alt="Bank QR" className="w-32 h-32 mt-2 border border-gray-200 rounded-lg" />}
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="text-md font-medium text-gray-600">Khalti</h3>
                                        <p className="text-sm text-gray-600">Account Number: {khalti?.accountNumber}</p>
                                        {khalti?.qr?.imageUrl && <img src={khalti.qr.imageUrl} alt="Khalti QR" className="w-32 h-32 mt-2 border border-gray-200 rounded-lg" />}
                                    </div>
                                </section>
                            </div>

                            {/* Contact Information Section */}
                            <div className="shadow-bottom-right p-4 bg-white rounded-lg">
                                <section className="px-2 py-2 space-y-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Contact Information</h2>
                                    <p className="text-[15px] text-gray-600">Email: <a href={`mailto:${email}`} className="text-blue-500 hover:underline">{email}</a></p>
                                    <p className="text-[15px] text-gray-600">Location: {location}</p>
                                    <p className="text-[15px] text-gray-600">Phone Number: {phoneNumber}</p>
                                </section>
                            </div>

                            {/* Social Media Links Section */}
                            <div className="shadow-bottom-right p-4 bg-white rounded-lg">
                                <section className="px-2 py-2">
                                    <h2 className="text-base font-semibold text-[#AD7A29] mb-2">Social Media Links</h2>
                                    <ul className="space-y-2">
                                        {Object.entries(socialMediaLinks).map(([platform, url], index) => (
                                            <li key={index}>
                                                <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline capitalize">{platform}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>
                        </div>

                    </>
                )
                }
            </div >
    );
};

export default General;
