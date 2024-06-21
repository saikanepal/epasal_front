import React, { useState, useEffect } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { useStore } from '../../Theme/Theme1/T1Context';

const Checkout = ({ onClose, store }) => {
    const { setStore } = useStore();

    const [promoCode, setPromoCode] = useState('');
    const [deliveryCharge] = useState(5); // Fixed delivery charge
    const [discount, setDiscount] = useState(0); // Discount amount

    // Calculate total amount whenever store or discount changes
    const totalAmount = store.cart.reduce((total, item) => total + item.price * item.count, 0) + deliveryCharge - discount;

    // Close checkout if cart is empty
    useEffect(() => {
        if (store.cart.length === 0) {
            onClose();
        }
    }, [store.cart, onClose]);

    const handleApplyCode = () => {
        // Implement the logic to apply the promo code
        alert(`Promo code ${promoCode} applied!`);
    };

    const handleDeleteFromCart = (index) => {
        const updatedCart = store.cart.filter((_, i) => i !== index);
        setStore({ ...store, cart: updatedCart });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 overflow-auto">
            <div className="relative p-4 mt-24 flex flex-col lg:flex-row gap-4 bg-white shadow-md rounded-md max-h-full overflow-auto">
                {/* Close button */}
                <IoCloseCircleOutline
                    size={24}
                    className="absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                />

                {/* Checkout Section (2/5 width on larger screens) */}
                <div className="lg:w-2/5 p-4">
                    <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                    <div className="flex flex-col h-full overflow-auto">
                        <div>
                            <h2 className="text-xl font-bold mb-2">Cart Items</h2>
                            {store.cart.map((item, index) => (
                                <div className="flex items-center justify-between mb-4" key={index}>
                                    <div className="flex items-center">
                                        {/* Uncomment and use if the image URL is valid */}
                                        {/* <img src={item.variant[0].options[0].image.imageUrl} alt={item.product} className="h-12 w-12 mr-4" /> */}
                                        <div>
                                            <p className="font-semibold">{item.product}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-xl flex-1 justify-between">
                                        <span className="mx-auto text-center">{item.count}</span> {/* Quantity centered */}
                                        <span className='mr-4'>रु {item.price}</span> {/* Item price on the left */}
                                        <IoCloseCircleOutline size={20} onClick={() => handleDeleteFromCart(index)} /> {/* Delete icon on the right */}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex mt-4">
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder="Promo code"
                                className="border border-gray-300 rounded-md px-4 py-1 mr-3 w-2/5 placeholder-center"
                            />
                            <button
                                onClick={handleApplyCode}
                                className="bg-gray-700 text-white rounded-md px-6 py-1 ml-auto sm:px-3 sm:py-1"
                            >
                                <span className="hidden sm:inline">Apply Promo Code</span>
                                <span className="inline sm:hidden">Apply</span>
                            </button>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <p className="text-sm font-medium">Delivery Charge</p>
                                <p className="text-sm">रु {deliveryCharge}</p>
                            </div>
                            <div className="flex justify-between mt-8">
                                <p className="text-sm font-medium">Discount</p>
                                <p className="text-sm">-रु {discount}</p>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between font-bold">
                                <p className="text-lg">Total Amount</p>
                                <p className="text-lg">रु {totalAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Contact Information Section (3/5 width on larger screens) */}
                <div className="lg:w-3/5 p-4">
                    <h2 className="text-xl font-bold mb-2">Contact Information</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="fullName" name="fullName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" id="phoneNumber" name="phoneNumber" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                        </div>
                        <hr className="my-6 border-gray-400 border-t-2 w-full" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <input type="text" id="address" name="address" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">Nearby Landmark</label>
                                <input type="text" id="landmark" name="landmark" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                        </div>
                        <hr className="my-6 border-gray-400 border-t-2 w-full" />
                        <p className="text-lg font-semibold mb-2">Payment Options</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <img src="https://cdn.esewa.com.np/ui/images/esewa_og.png?111" alt="eSewa" className="h-16 object-contain border border-gray-300 rounded-md mb-4 sm:w-1/6 sm:self-center" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Khalti_Digital_Wallet_Logo.png.jpg/640px-Khalti_Digital_Wallet_Logo.png.jpg" alt="Khalti" className="h-16 object-contain border border-gray-300 rounded-md mb-4 sm:w-1/6 sm:self-center" />
                            <img src="https://cdn.iconscout.com/icon/free/png-256/free-cash-on-delivery-1851649-1569374.png?f=webp" alt="Cash on Delivery" className="h-16 object-contain border border-gray-300 rounded-md mb-4 sm:w-1/6 sm:self-center" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
