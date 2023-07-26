import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const onChange = (event) => {
        const { name, value } = event.target
        setData(prevInfo => {
            return {
                ...prevInfo,
                [name]: value

            }
        })
    };
    console.log(data)

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/api/users`
            const { data: res } = await axios.post(url, data)
            toast('😁 Account Created, redirecting to Login', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(res.message)

            console.log('Account signed up');
            setTimeout(function () {
                navigate('/login');
            }, 5000);

        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }

            toast.error(error ? { error } : "Error Can't signin", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });





        }

    };

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
                        Create a New Account
                    </h2>
                </div>
                <div className="login-form-container bg-white mt-4">
                    <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6"
                            noValidate onSubmit={onSubmit}
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="username" className="block text-sm leading-6 text-gray-900">
                                        Username
                                    </label>

                                </div>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                                        onChange={onChange}
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
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-amber-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>


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

