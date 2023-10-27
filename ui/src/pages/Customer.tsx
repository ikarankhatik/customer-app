import { useState } from 'react';
import CustomerAddForm from '../components/CustomerAddForm';
import CustomerDetail from '../components/CustomerDetail';

const Customer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <div className='container p-10'>
            <button
                data-modal-target="customer-modal"
                data-modal-toggle="customer-modal"
                className="block mt-5 items-center  text-white bg-blue    font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
                onClick={openModal}
            >
                Add Customer
            </button>
            {isModalOpen && (
                <div
                    id="customer-modal"
                    tabIndex={-1} 
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50"
                >
                    <div className="relative bg-gray-200 rounded-lg p-10 shadow-lg  max-h-screen">
                        <button
                            type="button"
                            className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="customer-modal"
                            onClick={closeModal}
                        >
                            <svg
                                className="w-3 h-3"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <CustomerAddForm />
                    </div>
                </div>
            )}
            <CustomerDetail/>
            </div>
        </>
    );
};

export default Customer;
