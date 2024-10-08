import React, { useContext, useEffect, useState } from 'react';
import useFetch from '../../../Hooks/useFetch';
import { AuthContext } from '../../../Hooks/AuthContext';
import { FaEdit, FaMapMarkerAlt, FaUser, FaDollarSign, FaHourglassHalf, FaPhone, FaEye, FaEnvelope, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { store } from '../../AdminPanel/Dashboard/Home/homeStore';
import { IoMedalOutline } from "react-icons/io5";
import { IoMedalSharp } from "react-icons/io5";
import { FaFilter, FaTimes } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
// import { FaEye } from 'react-icons/fa';
import { esewaIcon, fonepayIcon, khaltiIcon } from '../../../Assets/icons';
import { Link } from 'react-router-dom';

const Stores = () => {
    const [storesArr, setStoresArr] = useState([]);
    const [search, setSearch] = useState('');
    const [ownername, setOwnername] = useState('');
    const [staffname, setStaffname] = useState('');
    const [minPendingAmount, setMinPendingAmount] = useState(0);
    const [maxPendingAmount, setMaxPendingAmount] = useState(500000);
    const [minDueAmount, setMinDueAmount] = useState(0);
    const [maxDueAmount, setMaxDueAmount] = useState(500);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [selectedStore, setSelectedStore] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const auth = useContext(AuthContext);
    const [updatingPayment, setUpdatingPayment] = useState(false);
    const [filterType, setFilterType] = useState('pendingAmount');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [orderType, setOrderType] = useState('dsc');
    /* 
    * * Handle Payment 
     */
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [paymentMethodDetails, setPaymentMethodDetails] = useState(null);
    const [paymentTransferred, setPaymentTransferred] = useState(0);

    const [payNowDetails, setPayNowDetails] = useState({
        paymentGiven: 0,

    });

    const openPaymentModal = (methodDetails) => {

        setTransactionLogs((prevLogs) => ({ ...prevLogs, store: methodDetails.store._id }));
        setTransactionLogs((prevLogs) => ({ ...prevLogs, subscriptionStatus: methodDetails.store.subscriptionStatus }));
        setTransactionLogs((prevLogs) => ({ ...prevLogs, paymentMethod: methodDetails.paymentMethod }));
        setTransactionLogs((prevLogs) => ({ ...prevLogs, customerName: methodDetails.store.name }));
        setTransactionLogs((prevLogs) => ({ ...prevLogs, pendingAmount: methodDetails.store.pendingAmount }));
        setTransactionLogs((prevLogs) => ({ ...prevLogs, dueAmount: methodDetails.store.dueAmount }));
        setPaymentMethodDetails(methodDetails);
        setSelectedStore(methodDetails.store);
        setPaymentModalOpen(true);
    };
    /*
    * * This is for paynow 
    */
    const handlePaymentSubmit = async () => {


        try {

            if (Number(transactionLogs.paymentGiven) > Number(transactionLogs.pendingAmount))
                throw new Error("[+] Invalid payment Number");

            setUpdatingPayment(true);

            const updatedData = {
                payment: Number(transactionLogs.paymentGiven)
            };

            const transactionLog = {
                employee: transactionLogs.employee,
                subscriptionStatus: transactionLogs.subscriptionStatus,
                logDescription: transactionLogs.logDescription,
                customerName: transactionLogs.customerName,
                paymentMethod: transactionLogs.paymentMethod,
                dueAmount: transactionLogs.dueAmount,
                pendingAmount: Math.abs(Number(transactionLogs.pendingAmount) - Number(transactionLogs.paymentGiven)),
                paymentMethod: transactionLogs.paymentMethod,
                store: transactionLogs.store,
                paymentGiven: Number(transactionLogs.paymentGiven),
                paymentReceived: Number(transactionLogs.paymentReceived)
            };

            const data = {
                updatedData,
                transactionLog,
            };



            const responseData = await sendRequest(
                'store/update/dashboard/banau/paymenttostore/' + selectedStore._id,
                'POST',
                JSON.stringify(data),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token,
                }
            );
            toast.success(responseData.message);
            setPaymentModalOpen(false);
            setUpdatingPayment(false);
        } catch (error) {
            toast.error(error.message);
            setUpdatingPayment(false);
            setPaymentModalOpen(false);
        }
    };
    const [transactionLogs, setTransactionLogs] = useState({
        employee: auth.userID,
        pendingAmount: 0,
        dueAmount: 0,
        paymentReceived: 0,
        paymentGiven: 0,
        subscriptionStatus: 'Silver',
        logDescription: '',
        customerName: '',
        store: '',
        paymentMethod: 'Cash',
    });
    /* This Is For Duration To Update */
    const [duration, setDuration] = useState(
        {
            duration: ''
        }
    );

    const { isLoading, error, sendRequest, onCloseError } = useFetch();
    const [updatingStore, setUpdatingStore] = useState(false);



    const fetchStores = async (flag = false) => {

        try {
            const order = orderType;
            const params = new URLSearchParams({
                search,
                ownername,
                staffname,
                page,
                limit,
                order
            });
            // Add parameters based on filterType
            if (filterType === 'pendingAmount') {
                params.append('minPendingAmount', minPendingAmount);
                params.append('maxPendingAmount', maxPendingAmount);
                params.append('filterType', 'pendingAmount');
            } else if (filterType === 'dueAmount') {
                params.append('minDueAmount', minDueAmount);
                params.append('maxDueAmount', maxDueAmount);
                params.append('filterType', 'dueAmount');
            }

            const response = await sendRequest(
                `store/getstorebyfilter?${params.toString()}`,
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            if (!response)
                throw new Error('[+] No response');

            setHasNextPage(response.hasNextPage);
            setStoresArr(response.stores);
            setTotalCount(response.totalCount);
            setIsFilterVisible(false)
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
    };

    useEffect(() => {
        fetchStores();
    }, [page]);

    const handleNextPage = () => {
        if (hasNextPage) setPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage((prevPage) => prevPage - 1);
    };


    /* This is for edit and will update the  */
    const handleEdit = (store) => {
        setSelectedStore(store);
        setTransactionLogs((prevLogs) => ({ ...prevLogs, store: store._id }));
        setTransactionLogs((prevLogs) => ({ ...prevLogs, subscriptionStatus: store.subscriptionStatus }));
        setModalOpen(true);
    };

    /* 
    * * Update the Store and create the log
     */
    const handleUpdate = async () => {
        try {
            setUpdatingStore(true);
            /* This is to update the store*/
            const updatedData = {
                name: selectedStore.name,
                phoneNumber: selectedStore.phoneNumber,
                pendingAmount: selectedStore.pendingAmount,
                dueAmount: selectedStore.dueAmount,
                location: selectedStore.location,
                subscriptionStatus: transactionLogs.subscriptionStatus,

            };
            /* this is for transaction log */
            const transactionLog = {
                employee: transactionLogs.employee,
                subscriptionStatus: transactionLogs.subscriptionStatus,
                logDescription: transactionLogs.logDescription,
                customerName: transactionLogs.customerName,
                paymentMethod: updatedData.paymentMethod,
                dueAmount: updatedData.dueAmount,
                pendingAmount: transactionLogs.pendingAmount,
                paymentMethod: transactionLogs.paymentMethod,
                store: transactionLogs.store,
                paymentGiven: Number(transactionLogs.paymentGiven),
                paymentReceived: Number(transactionLogs.paymentReceived)
            };
            const data = {
                updatedData,
                transactionLog,
                duration
            };


            const responseData = await sendRequest(
                'store/update/dashboard/banau/' + selectedStore._id,
                'PUT',
                JSON.stringify(data),
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token,
                }
            );
            toast.success(responseData.message);
            setModalOpen(false);
            setUpdatingStore(false);
        } catch (error) {
            toast.error(error.message);
            setUpdatingStore(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedStore((prevStore) => ({
            ...prevStore,
            [name]: value,
        }));
    };

    const handleInputChangev1 = (e, cb) => {
        const { name, value } = e.target;
        cb((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTransactionLogChange = (e) => {
        const { name, value } = e.target;
        setTransactionLogs((prevLogs) => ({
            ...prevLogs,
            [name]: value,
        }));
    };
    /* 
     */
    // switch(paymentMethod) {
    //     case 'esewa':
    //         textColor = "text-green-600";
    //         bgColor = "bg-green-100";
    //         icon = esewaIcon;
    //         break;
    //     case 'khalti':
    //         textColor = "text-indigo-600";
    //         bgColor = "bg-indigo-100";
    //         icon = khaltiIcon;
    //         break;
    //     case 'bank':
    //         textColor = "text-red-600";
    //         bgColor = "bg-red-100";
    //         icon = bankIcon;
    //         break;
    //     default:
    //         textColor = "text-gray-600";
    //         bgColor = "bg-gray-100";
    //         break;
    // }

    const enableDisableStoreFunction = async (store, flag = true) => {
        try {
            let route = ``;
            if (flag == false)
                route = `store/disable/store/${store._id}`;
            else
                route = `store/activate/store/${store._id}`;
            const responseData = await sendRequest(
                route,
                'PUT',
                null,
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token,
                }
            );
            if (!responseData)
                throw new Error("[-] Something went wrong while store enable disable mechanism");
            toast.success(responseData?.message);

        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleEnable = (store) => {
        // Implement your logic for enabling the store

        enableDisableStoreFunction(store, true);
    };

    const handleDisable = (store) => {
        // Implement your logic for disabling the store

        enableDisableStoreFunction(store, false);
    };

    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible); // Toggle the visibility state
    };

    return (
        <div className="min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-4 text-start text-md">Stores</h1>
            <div className="mb-4 flex gap-2 flex-col overflow-scroll">
                <div className="flex w-full gap-2 md:gap-3">
                    <input
                        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        type="text"
                        placeholder="Search Store"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            if (page !== 1) setPage(1);
                        }}
                    />
                    <button
                        className="px-4 md:px-10 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        onClick={fetchStores}
                    >
                        Search
                    </button>
                    {!isFilterVisible && (
                        <button
                            onClick={toggleFilterVisibility}
                            className="px-3 md:px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            <FaFilter size={15} />
                        </button>
                    )}

                    {isFilterVisible && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5 py-0 z-50">
                            <div className="bg-white w-full md:w-[60%] p-8 py-10 rounded-lg shadow-xl relative">
                                <button
                                    onClick={toggleFilterVisibility}
                                    className="absolute top-3 right-3 p-2 rounded-full bg-red-500 text-white"
                                >
                                    <FaTimes size={15} />
                                </button>
                                <h3 className="font-bold mb-4 text-xl text-center">Filters</h3>
                                <label className=" font-semibold">Staffs:</label>
                                <div className="mt-2 block mb-8">
                                    <div className="flex gap-2 items-center">
                                        <input
                                            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                            type="text"
                                            placeholder="Owner Name"
                                            value={ownername}
                                            onChange={(e) => {
                                                setOwnername(e.target.value);
                                                if (page !== 1) setPage(1);
                                            }}
                                        />
                                        <input
                                            className="px-2 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                            type="text"
                                            placeholder="Staff Name"
                                            value={staffname}
                                            onChange={(e) => {
                                                setStaffname(e.target.value);
                                                if (page !== 1) setPage(1);
                                            }}
                                        />
                                    </div>
                                </div>

                                <label className="block mb-8">
                                    <div className="mb-8 flex gap-2 flex-col sm:flex-col md:flex-row lg:flex-row overflow-scroll">
                                        <div className="flex items-center">
                                            <select
                                                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                value={filterType}
                                                onChange={(e) => setFilterType(e.target.value)}
                                            >
                                                <option value="pendingAmount">Pending Amount</option>
                                                <option value="dueAmount">Due Amount</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center">
                                            <select
                                                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                value={orderType}
                                                onChange={(e) => setOrderType(e.target.value)}
                                            >
                                                <option value="dsc">Descending</option>
                                                <option value="asc">Ascending</option>
                                            </select>
                                        </div>
                                    </div>
                                </label>
                                <div className="mb-8">
                                    <label className='font-semibold'>Price range on the basis of {filterType === 'pendingAmount' ? "Pending amount" : "Due Amount"}:</label>
                                    <div className='mt-2 flex gap-2 flex-col sm:flex-col md:flex-row lg:flex-row overflow-scroll'>
                                        {filterType === 'pendingAmount' ? (
                                            <>
                                                <input
                                                    className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                    type='number'
                                                    placeholder="Min Pending Amount"
                                                    value={minPendingAmount}
                                                    onChange={(e) => {
                                                        setMinPendingAmount(e.target.value);
                                                        if (page !== 1) setPage(1);
                                                    }}
                                                />
                                                <input
                                                    className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                    type='number'
                                                    placeholder="Max Pending Amount"
                                                    value={maxPendingAmount}
                                                    onChange={(e) => {
                                                        setMaxPendingAmount(e.target.value);
                                                        if (page !== 1) setPage(1);
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                    type='number'
                                                    value={minDueAmount}
                                                    onChange={(e) => {
                                                        setMinDueAmount(e.target.value);
                                                        if (page !== 1) setPage(1);
                                                    }}
                                                />
                                                <input
                                                    className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                    type='number'
                                                    value={maxDueAmount}
                                                    onChange={(e) => {
                                                        setMaxDueAmount(e.target.value);
                                                        if (page !== 1) setPage(1);
                                                    }}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>

                                <button
                                    className="px-10 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                    onClick={fetchStores}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    )}
                    {/* ENDS HERE  */}

                </div>
                <div className="py-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto h-64 md:h-96 lg:h-full flex-1 w-full">
                    {storesArr.length > 0 ? (
                        storesArr.map((store) => (
                            <div key={store._id} className="bg-white p-6 text-sm rounded-xl shadow-lg transform transition duration-500 hover:scale-105 w-full h-full overflow-auto">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex gap-5 items-center">
                                        <Link
                                            to={`/store/${store?.name}`}
                                            target="_blank" className="text-sm md:text-xl lg:text-xl font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                                            {store.name.toUpperCase()}
                                        </Link>
                                        <Link to={`/adminpanel/${store?.name}`} target="_blank" className='cursor-pointer'>
                                            <FaRegUser size={22} />
                                        </Link>
                                    </div>
                                    <button
                                        className="text-gray-500 hover:text-gray-700 text-xl"
                                        onClick={() => handleEdit(store)}
                                    >
                                        <FaEdit />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-2 gap-1 mt-5">
                                    <div className="flex items-center text-gray-700">
                                        <FaMapMarkerAlt className="mr-2 text-red-500" />
                                        <span>{store.location}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <FaUser className="mr-2 text-indigo-500" />
                                        <span>{store.owner.name}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <FaDollarSign className="mr-2 text-green-500" />
                                        <span>Revenue: <span className="text-green-500">{store.revenueGenerated}</span></span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <FaDollarSign className="mr-2 text-green-500" />
                                        <span>Due Amount: <span className="text-green-500">{store.dueAmount}</span></span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <FaDollarSign className="mr-2 text-red-500" />
                                        <span>Pending Amount: <span className="text-red-500">{store.pendingAmount}</span></span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        {store.subscriptionStatus === 'Gold' && <IoMedalSharp className='text-yellow-400 mr-2' />}
                                        {store.subscriptionStatus === 'Silver' && <IoMedalSharp className='text-[#C0C0C0] mr-2' />}
                                        {store.subscriptionStatus === 'Platinum' && <IoMedalSharp className='text-[#E5E4E2] mr-2' />}
                                        <span>Status: {store.subscriptionStatus}</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <FaHourglassHalf className="mr-2 text-[#C0C0C0]" />
                                        <span>Expiry:  {store.subscriptionExpiry ? new Date(store.subscriptionExpiry).toLocaleDateString() : 'Unlimited'}</span>
                                    </div>

                                    <div className="flex items-center text-gray-700">
                                        <FaPhone className="mr-2 text-green-500" />
                                        <u className='text-blue-600 cursor-pointer'>{store.phoneNumber}</u>
                                    </div>

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mt-5">
                                    <div className="flex items-center text-gray-700">
                                        <FaEnvelope className="mr-2 text-red-500" />
                                        <u className='text-blue-600 cursor-pointer'>{store.email}</u>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-1 mt-5">
                                    <div>
                                        <button
                                            className="flex items-center text-sm border border-blue-500 text-black px-2 py-1 rounded hover:bg-blue-700 hover:text-white w-full"
                                            onClick={() => console.log({ store })}
                                        >
                                            <FaEye className="mr-2" />
                                            Transactions
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className="flex items-center text-sm border border-green-500 text-black px-2 py-1 rounded hover:bg-green-700 hover:text-white w-full"
                                            onClick={() => {

                                                openPaymentModal(
                                                    {
                                                        name: store.name,
                                                        pendingAmount: store.pendingAmount,
                                                        dueAmount: store.dueAmount,
                                                        store: store,
                                                        paymentMethod: 'Esewa',
                                                        methodData: store.esewa
                                                    });
                                            }}
                                        >
                                            <img src={esewaIcon} alt="icon" className="mr-2 w-4 h-4 " />
                                            Pay Now
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className="flex items-center text-sm border border-indigo-500 text-black px-2 py-1 rounded hover:bg-indigo-700 hover:text-white w-full"
                                            onClick={() => {

                                                openPaymentModal(
                                                    {
                                                        name: store.name,
                                                        pendingAmount: store.pendingAmount,
                                                        dueAmount: store.dueAmount,
                                                        store: store,
                                                        paymentMethod: 'Khalti',
                                                        methodData: store.khalti
                                                    });
                                            }}
                                        >
                                            <img src={khaltiIcon} alt="icon" className="mr-2 w-4 h-4 " />
                                            Pay Now
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className="flex items-center text-sm border-2 border-red-500 text-black px-2 py-1 rounded hover:bg-red-600 hover:text-white w-full"
                                            onClick={() => {

                                                openPaymentModal(
                                                    {
                                                        name: store.name,
                                                        pendingAmount: store.pendingAmount,
                                                        dueAmount: store.dueAmount,
                                                        store: store,
                                                        paymentMethod: 'Bank',
                                                        methodData: store.bank
                                                    });
                                            }}
                                        >
                                            <img src={fonepayIcon} alt="icon" className="mr-2 w-4 h-4 " />
                                            Pay Now
                                        </button>
                                    </div>
                                </div>
                                {/* <div className='grid grid-cols-1 md:grid-cols-1 gap-2 mt-5'>
                                <div className="flex items-center text-gray-700">
                                    <FaPhone className="mr-2 text-green-500" />
                                    <u className='text-blue-600 cursor-pointer'>{store.phoneNumber}</u>
                                </div>
                                <div className="flex items-center text-gray-700">
                                    <FaEnvelope className="mr-2 text-red-500" />
                                    <u className='text-blue-600 cursor-pointer'>{store.email}</u>
                                </div>
                            </div> */}
                                {store.staff.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mt-4">Staff:</h3>
                                        <ul className="list-disc pl-5 text-gray-600">
                                            {store.staff.map((staff, index) => (
                                                <li key={index}>{staff.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {/* Enable and disable store*/}
                                <div className="flex justify-end mt-2">
                                    {store.isDisabled ? (
                                        <button
                                            className="flex items-center text-sm bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 w-full md:w-auto"
                                            onClick={(e) => handleEnable(store)}
                                        >
                                            <FaToggleOn className="mr-2" />
                                            Enable
                                        </button>
                                    ) : (
                                        <button
                                            className="flex items-center text-sm bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 w-full md:w-auto"
                                            onClick={(e) => handleDisable(store)}
                                        >
                                            <FaToggleOff className="mr-2" />
                                            Disable
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No stores found.</p>
                    )}

                </div>
                <div className="mt-8 flex justify-between sm:justify-between md:justify-start lg:justify-center items-center space-x-4">
                    <button
                        className="px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                        onClick={handlePrevPage}
                        disabled={page === 1}
                    >
                        ←
                    </button>
                    <span className="text-xl">{page}</span>
                    <button
                        className="px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                        onClick={handleNextPage}
                        disabled={!hasNextPage}
                    >
                        →
                    </button>
                </div>
                {/* 
             * * Edit Store Details
             */}
                {
                    modalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-sm">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 h-[85vh] md:h-[70vh] lg:h-[90vh] overflow-auto">
                                <h2 className="text-xl font-bold mb-8">Edit Store</h2>
                                {selectedStore && (
                                    <form>
                                        <div className="mb-8">
                                            <label className="block text-gray-700">Store Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={selectedStore.name}
                                                onChange={handleInputChange}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-8">
                                            <label className="block text-gray-700">Location</label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={selectedStore.location}
                                                onChange={handleInputChange}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-8">
                                            <label className="block text-gray-700">Phone Number</label>
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                value={selectedStore.phoneNumber}
                                                onChange={handleInputChange}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-8">
                                            <label className="block text-gray-700">Pending Amount</label>
                                            <input
                                                type="number"
                                                name="pendingAmount"
                                                value={selectedStore.pendingAmount}
                                                onChange={handleInputChange}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-8">
                                            <label className="block text-gray-700">Due Amount</label>
                                            <input
                                                type="number"
                                                name="dueAmount"
                                                value={selectedStore.dueAmount}
                                                onChange={handleInputChange}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <h2 className="text-xl font-bold mb-8 mt-6">Transaction Logs</h2>
                                        <div className="mb-8">
                                            <label className="block text-gray-700">Employee</label>
                                            <input
                                                type="text"
                                                name="employee"
                                                value={transactionLogs.employee}
                                                onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        {/* <div className="mb-8">
                                    <label className="block text-gray-700">Pending Amount</label>
                                    <input
                                        type="number"
                                        name="pendingAmount"
                                        value={transactionLogs.pendingAmount}
                                        onChange={handleTransactionLogChange}
                                        className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div> */}
                                        {/* <div className="mb-8">
                                    <label className="block text-gray-700">Due Amount</label>
                                    <input
                                        type="number"
                                        name="dueAmount"
                                        value={transactionLogs.dueAmount}
                                        onChange={handleTransactionLogChange}
                                        className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div> */}
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Payment Received</label>
                                            <input
                                                type="number"
                                                name="paymentReceived"
                                                value={transactionLogs.paymentReceived}
                                                // onChange={handleTransactionLogChange}
                                                onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Payment Given</label>
                                            <input
                                                type="number"
                                                name="paymentGiven"
                                                value={transactionLogs.paymentGiven}
                                                // onChange={handleTransactionLogChange}
                                                onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Subscription Status</label>
                                            <select
                                                name="subscriptionStatus"
                                                value={transactionLogs.subscriptionStatus}
                                                // onChange={handleTransactionLogChange}
                                                onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="Silver">Silver</option>
                                                <option value="Gold">Gold</option>
                                                <option value="Platinum">Platinum</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Duration</label>
                                            <select
                                                name="duration"
                                                value={duration.duration}
                                                // onChange={handleTransactionLogChange}
                                                onChange={(e) => handleInputChangev1(e, setDuration)}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >

                                                <option value="">None</option>
                                                <option value="Monthly">Monthly</option>
                                                <option value="Quarterly">Quaterly</option>
                                                <option value="Yearly">Yearly</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Log Description</label>
                                            <textarea
                                                name="logDescription"
                                                value={transactionLogs.logDescription}
                                                // onChange={handleTransactionLogChange}
                                                onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            ></textarea>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Customer Name</label>
                                            <input
                                                type="text"
                                                name="customerName"
                                                value={transactionLogs.customerName}
                                                onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700">Payment Method</label>
                                            <select
                                                name="paymentMethod"
                                                value={transactionLogs.paymentMethod}
                                                onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="Cash">Cash</option>
                                                <option value="Bank">Bank</option>
                                                <option value="Esewa">Esewa</option>
                                                <option value="Khalti">Khalti</option>
                                            </select>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors mr-2"
                                                disabled={updatingStore}
                                                onClick={() => {
                                                    setModalOpen(false);
                                                    toast.error('Canceled');
                                                }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-colors"
                                                onClick={handleUpdate}
                                                disabled={updatingStore}
                                            >
                                                Update
                                            </button>
                                            {/* <button
                                        type="button"
                                        className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors ml-2"
                                        onClick={logTransactionState}
                                    >
                                        Log Transaction State
                                    </button> */}
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    )
                }
                {
                    paymentModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-sm">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-auto transform transition duration-500 hover:scale-105">
                                <div className='flex items-center justify-between'>
                                    <h2 className="text-sm md:text-xl lg:text-xl font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                                        {paymentMethodDetails.store.name.toUpperCase()}
                                    </h2>
                                    <button
                                        className={`text-sm md:text-xl lg:text-xl font-bold px-2 py-1 rounded flex items-center ${paymentMethodDetails?.paymentMethod === 'Esewa'
                                            ? 'text-green-600 bg-green-100'
                                            : paymentMethodDetails?.paymentMethod === 'Khalti'
                                                ? 'text-indigo-600 bg-indigo-100'
                                                : paymentMethodDetails?.paymentMethod === 'Bank'
                                                    ? 'text-red-600 bg-red-100'
                                                    : 'text-gray-600 bg-gray-100'
                                            }`}
                                    >
                                        Make Payment
                                        {paymentMethodDetails?.paymentMethod === 'Esewa' && <img src={esewaIcon} alt="icon" className="ml-2 w-5 h-5" />}
                                        {paymentMethodDetails?.paymentMethod === 'Khalti' && <img src={khaltiIcon} alt="icon" className="ml-2 w-5 h-5" />}
                                        {paymentMethodDetails?.paymentMethod === 'Bank' && <img src={fonepayIcon} alt="icon" className="ml-2 w-5 h-5" />}
                                    </button>


                                </div>


                                <div className='px-2 mt-2'>
                                    <p className="mb-2">Pending Amount: {paymentMethodDetails.pendingAmount}</p>
                                    <p className="mb-2">Due Amount: {paymentMethodDetails.dueAmount}</p>

                                </div>
                                <div className='px-2 mt-2'>
                                    <div>
                                        <p className="mb-2"> Account Number:{paymentMethodDetails.methodData.accountNumber}</p>
                                        <p className="mb-2"> QR:</p>
                                        <img src={paymentMethodDetails.methodData.qr.imageUrl} alt='Not Provided' className='w-[150px] h-[150px]'></img>
                                    </div>
                                </div>

                                <div className='px-2 mt-2'>
                                    <label className="block font-bold mb-1">Payment Given:</label>
                                    <input
                                        type="number"
                                        name="paymentGiven"
                                        value={transactionLogs.paymentGiven}
                                        // onChange={handleTransactionLogChange}
                                        onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                        // className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                                    />
                                </div>

                                <div className='px-2 mt-2'>
                                    <label className="block font-bold mb-1">Description:</label>
                                    <label className="block text-gray-700"></label>
                                    <textarea
                                        name="logDescription"
                                        value={transactionLogs.logDescription}
                                        // onChange={handleTransactionLogChange}
                                        onChange={(e) => handleInputChangev1(e, setTransactionLogs)}
                                        className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    ></textarea>

                                </div>


                                <div className="flex justify-end gap-x-2 items-center px-3">
                                    <button
                                        onClick={handlePaymentSubmit}
                                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                    >
                                        Submit
                                    </button>
                                    <button
                                        onClick={() => setPaymentModalOpen(false)}
                                        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        </div>
    )
}

export default Stores;
