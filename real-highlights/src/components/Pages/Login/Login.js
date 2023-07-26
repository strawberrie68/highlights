import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginPage() {
  
    const [error, setError] = useState("")
    console.log(error)


    const [data, setdata] = useState({
        email: '',
        password: ''
    })

    const onChange = (event) => {
        const { name, value } = event.target
        setdata(prevInfo => {
            return {
                ...prevInfo,
                [name]: value
            }

        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = `${REACT_APP_SERVER_URL}/api/auth`
            const { data: res } = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            window.location = "/"
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ){
                setError(error.response.data.message)
            }

                toast.error(error ? {error}: "Error Can't signin", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }}

            return (

                <>
                    <div className="login-page flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                className="mx-auto h-10 w-auto"
                                src="https://cdn-icons-png.flaticon.com/128/2702/2702134.png"
                                alt="Your Company"
                            />
                            <h2 className="mt-10 text-center text-2xl font-italiana leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>
                        <div className="login-form-container bg-white mt-4">
                            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" noValidate onSubmit={onSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block text-sm leading-6 text-gray-900">
                                            Email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                                                onChange={onChange}
                                                value={data.email}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm leading-6 text-gray-900">
                                                Password
                                            </label>
                                       
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                onChange={onChange}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                                                value={data.password}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-amber-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-200  focus-visible:outline-2 focus-visible:outline-offset-2 "
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>

                                <p className="mt-10 text-center text-sm text-gray-500">
                                    Not a member?{' '}
                                    <Link to="/signup">
                                        <p className="font-semibold leading-6 text-amber-300 hover:text-amber-500"> Sign Up</p>
                                    </Link>


                                </p>
                            </div>

                        </div>


                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </>
            )
        
    
}

