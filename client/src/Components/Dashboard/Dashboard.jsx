import React, { Fragment, useEffect, useState } from 'react'
import { newRequest } from '../utills/newRequest';
import axios from 'axios';
import { Navbar } from '../navbar/Navbar';
import AddUser from '../addUser/AddUser';
import { UpdatePopUp } from '../updatePopUp/UpdatePopUp';

export const Dashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [data, setData] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    shape: 'circle',
    color: '',
  });

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleOpenUpdatePopup = (id) => {
    const selectedRowData = data.find(item => item._id === id);

    // Check if selectedRowData is defined, set default values otherwise
    if (selectedRowData) {
      setUpdateFormData({
        name: selectedRowData.name,
        shape: selectedRowData.shape,
        color: selectedRowData.color,
      });
      setSelectedRowId(selectedRowData._id); // Add this line to store the ID
    } else {
      setUpdateFormData({
        name: '',
        shape: 'circle',
        color: '',
      });
    }

    setUpdatePopupOpen(true);
  };


  const handleDelete = async (id) => {
    try {
      await newRequest.delete(`user/delete/${id}`);
      // Update the state by filtering out the deleted user
      setData((prevData) => prevData.filter((user) => user._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await newRequest.get("user/get");
        const result = getData.data;
        setData(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });


  return (
    <div className='container-fluid'>
      <div className='flex justify-end'>
        <Navbar />
      </div>
      {currentUser.role === "Admin" && (
        <div className='mt-10 mx-10 text-start'>
          <button className='bg-blue-400 text-sm py-3 hover:text-gray-300  font-bold text-white px-5 border rounded' onClick={handleOpenPopup}>Add User</button>
        </div>
      )}
      <div className="table mt-10 px-10 w-full">
        <div className="flex flex-col border border-solid-black-500 justify-center text-center">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">TimeStamp</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Shape</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Color</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data.length > 0 ? data.map((val) => (
                      <Fragment key={val._id}>
                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={val._id}>
                          <td className="px-6 py-4 text-start whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{val.updatedAt.slice(0, 19).replace("T", " ")}<br/>{val.createdAt.slice(0, 19).replace("T", " ")}</td>
                          <td className="px-6 py-4 text-start whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{val.name}</td>
                          <td className="px-4 py-4 text-start whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                            <p className={`${val.shape === "square" ? "h-10 w-10" :
                              val.shape === "circle" ? "h-10 w-10 rounded-full" :
                                val.shape === "triangle" ? "w-0 h-0 border-[25px] border-y-[40px] border-transparent border-t-0 " : ""}`}
                              style={{ backgroundColor: val?.shape === "triangle" ? "transparent" : !val?.color ? "black" : val?.color, borderBottomColor: val.shape === "triangle" ? val?.color : "" }}
                            ></p>
                          </td>
                          <td className="px-6 py-4 text-start whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{val.color}</td>
                          {currentUser.role === "Admin" && (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <button
                                  type="button"
                                  className="inline-flex items-center text-white bg-blue-600 text-sm font-semibold border border-transparent text-black-600 rounded py-2 px-4 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-black-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                  onClick={() => handleOpenUpdatePopup(val._id)}
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                <button
                                  type="button"
                                  className="inline-flex items-center text-white bg-red-600 text-sm font-semibold border border-transparent text-black-600 rounded py-2 px-4 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-black-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={() => handleDelete(val._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      </Fragment>
                    )):<div className='flex text-center'>Data Not Found</div>}
                  </tbody>
                </table>
                <div>
                    {isUpdatePopupOpen && (
                      <UpdatePopUp id={selectedRowId} setUpdateFormData={setUpdateFormData} updateFormData={updateFormData} setUpdatePopupOpen={setUpdatePopupOpen} />
                    )}
                  {isPopupOpen && (
                    <AddUser setPopupOpen={setPopupOpen} />
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}
