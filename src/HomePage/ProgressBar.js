import React, { useState, useEffect } from 'react';
import slider from '../Assets/slider.png';

const steps = [
    {
        label: 'Build Your Store',
        gif: 'https://i.pinimg.com/originals/58/26/22/582622377739ce42b29d020e35335541.gif',
    },
    {
        label: 'Customize Your Store',
        gif: 'https://www.drip.com/hubfs/gifs_in_emails-BLOG.gif',
    },
    {
        label: 'Add Products',
        gif: 'https://assets.wpdeveloper.com/2020/09/Customize-Your-WooCommerce-Product-Page.gif',
    },
    {
        label: 'Launch your Store',
        gif: 'https://cdn.dribbble.com/users/331307/screenshots/4515838/street-800x600.gif   ',
    },
];

const ProgressBar = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
        }, 2000); // Change step every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='bg-white p-4'>
            <div className="flex flex-col md:flex-row items-center justify-between mx-auto md:p-4 gap-5 space-y-4 md:space-y-0 md:space-x-8">
                <div className="mt-4 md:mt-0 hidden 2xl:block">
                    <div className="relative w-full max-w-sm h-96 p-4 mx-auto">
                        <img src={slider} alt="Decorative" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center md:items-start gap-5 w-full md:w-auto">
                    <h2 className="font-bold text-2xl  mr-24 text-orange-500 mb-4 md:text-left 
                     sm:mr-0">Get Started</h2>
                    <div className="flex flex-col items-start space-y-2 md:space-y-0 lg:space-y-2">
                        {steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <div className="flex items-center space-x-2 text-xl md:text-sm lg:text-xl text-[#262626]">
                                    <div className={`w-4 h-4 rounded-full ${index <= currentStep ? 'bg-[#1E1E1E]' : 'bg-gray-300'}`}></div>
                                    <span className={`ml-2 ${index === currentStep ? 'font-bold' : ''}`}>{step.label}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-[2px] h-8 ml-2 ${index < currentStep ? 'bg-[#1E1E1E]' : 'bg-gray-300'}`}></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="w-full max-w-lg md:max-w-md lg:max-w-2xl xl:max-w-3xl mx-auto md:mx-0">
                    <div className="border-8  max-w-[600px] border-[#2D2D2D] shadow-md flex items-center justify-center bg-[#1E1E1E] rounded-xl overflow-hidden">
                        <img src={steps[currentStep].gif} alt="GIF" className=" h-[350px] object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
