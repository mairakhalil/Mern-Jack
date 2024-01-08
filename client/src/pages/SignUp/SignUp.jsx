import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { newRequest } from '../../Components/utills/newRequest';
import upload from '../../Components/utills/upload'

export const SignUp = () => {
    const [file, setFile] = useState("");
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
        img: ""
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = await upload(file);

        try {
            await newRequest.post("auth/register", {
                ...user,
                img: url
            });
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setUser((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    return (
        <div>
            <div className="mt-20 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="px-6 py-4">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                    </div>

                    <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Create New Account</p>

                    <form onSubmit={handleSubmit}>
                        <div className="w-full mt-4">
                            <input required className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" value={user.username} type="username" placeholder="Username" aria-label="username" onChange={handleChange} name='username' />
                        </div>

                        <div className="w-full mt-4">
                            <input required className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" value={user.email} onChange={handleChange} name='email' />
                        </div>

                        <div className="w-full mt-4">
                            <input required className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" onChange={handleChange} value={user.password} name='password' />
                        </div>

                        {/* <div className='w-full mt-4'>
                            <select
                            required
                                id="role"
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="select a role">select a role</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                        </div> */}
                        <div className='mt-4'>
                            <label for="file-input" class="sr-only">Choose file</label>
                            <input required  name="img" type="file" onChange={(e) => setFile(e.target.files[0])} />
                        </div>

                        <div className="flex justify-end mt-4">
                            <button type='submit' className="px-6  py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-200">Already have an account? </span>

                    <Link to="/" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Login</Link>
                </div>
            </div>
        </div>
    )
}
