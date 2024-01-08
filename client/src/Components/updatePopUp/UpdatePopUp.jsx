import React, { useEffect, useState } from 'react'
import { newRequest } from '../utills/newRequest';

export const UpdatePopUp = ({ updateFormData, setUpdateFormData, setUpdatePopupOpen, id }) => {
    const [error, setError] = useState(false)

    const handleUpdateClosePopup = () => {
        setUpdatePopupOpen(false);
    };

    const handleUpdateInputChange = (e) => {
        e.preventDefault();
        setUpdateFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };



    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            if (updateFormData.color === "") {
                setError(true)
                return;
            }
            await newRequest.put(`/user/update/${id}`, updateFormData);
            // console.log("Update successful");
        } catch (error) {
            console.log(error);
        }
        // try {
        //     if (formData.color === "") {
        //       setError(true)
        //       return;
        //     }
        //     const getData = await newRequest.post("user/create", formData);
        //     // console.log("getdata", getData);
        //   } catch (err) {
        //     console.log(err);
        //   }

        handleUpdateClosePopup();
    };



    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <button
                    onClick={handleUpdateClosePopup}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <form className="space-y-4" onSubmit={handleUpdateSubmit}>
                    <div>
                        <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={updateFormData.name}
                            onChange={handleUpdateInputChange}
                            className="mt-1 p-2 block w-full border rounded-md"
                        />
                    </div>

                    <div>
                        <select
                            required
                            id="shape"
                            name="shape"
                            value={updateFormData.shape}
                            onChange={handleUpdateInputChange}
                            className="mt-1 p-2 block w-full border rounded-md"
                        >
                            <option value="circle">Circle</option>
                            <option value="square">Square</option>
                            <option value="triangle">Triangle</option>
                        </select>
                    </div>

                    <div className='flex flex-col justify-start items-start'>
                        <label htmlFor="color" className='text-start text-[14px] font-[400]'>Select a Color</label>
                        <input
                            required
                            type="color"
                            id="color"
                            name="color"
                            placeholder="Color"
                            value={updateFormData.color}
                            onChange={handleUpdateInputChange}
                            className="mt-1 p-2 block w-full border rounded-md"
                        />
                        {error && (<span className='text-red-600 text-sm'>Color is required</span>)}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleUpdateClosePopup}
                            className="mr-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
