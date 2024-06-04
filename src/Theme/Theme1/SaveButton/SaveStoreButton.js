import React, { useContext } from 'react';
import { useStore } from '../T1Context';
import { AuthContext } from '../../../Hooks/AuthContext';
import Loading from '../Loading/Loading';
import useFetch from "../../../Hooks/useFetch";
const SaveStoreButton = () => {
    const auth = useContext(AuthContext);
    const { store } = useStore();
    const {previewMode} = store;
    const { isLoading, error, sendRequest, onCloseError } = useFetch();

    const saveStore = async () => {
        try {
            const responseData = await sendRequest(
                'store/create', // Replace 'your-api-endpoint' with your actual API endpoint
                'POST',
                JSON.stringify({ store }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token,
                }
            );
            console.log(responseData); // Handle response data as needed
        } catch (error) {
            console.error('Error saving store data:', error);
        }
    };
    if (!store.fetchedFromBackend) {
        return (
            <div className='mt-4 h-20 flex justify-center'>
                {isLoading ? (
                    <Loading /> // Render Loading component when isLoading is true
                ) : (
                    <button className="group group-hover:before:duration-500 group-hover:after:duration-1000 after:duration-500 hover:border-sky-300 duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-sky-300 hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-sky-900 relative bg-sky-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-400 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-cyan-600 after:right-8 after:top-3 after:rounded-full after:blur" onClick={saveStore}>Save Store</button>
                )}
            </div>
        );
    } else {
        return null;
    }
};

export default SaveStoreButton;
