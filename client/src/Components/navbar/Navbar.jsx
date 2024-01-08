import { Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {newRequest} from '../utills/newRequest'
import {Link, useNavigate} from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const navigate = useNavigate()
    const handleLogout = async()=>{
        try{
            await newRequest.post("/auth/logout")
            localStorage.setItem('currentUser',null);
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className='flex py-2 w-full mx-10 justify-between'>
             {currentUser.role === "Admin" ? <h1 className='text-lg font-bold'>Admin Panel</h1> : <h1 className='text-lg font-bold'>User Panel</h1>}
        <div>
        <Menu as="div" className="relative inline-block text-left ">
            <div>
                <Menu.Button>
                    <img className='h-10 w-10 rounded-full' src={currentUser.img} alt="dm" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-1 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <form method="POST" action="#">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link to="/">
                                    <button
                                    onClick={handleLogout}
                                        type="submit"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-1 text-left text-sm'
                                        )}
                                    >
                                        Sign out
                                    </button>
                                    </Link>
                                )}
                            </Menu.Item>
                        </form>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
        </div>
        </div>
    )
}
