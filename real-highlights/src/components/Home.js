import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {

    const [login, setLogin] = useState({
        email: '',
        password: ''
    });


    const onChange = (event) => {
        const { name, value } = event.target
        setLogin(prevLogin => {
            return {
                ...prevLogin,
                [name]: value

            }
        })
    };

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(login)

        axios
            .post('http://localhost:6010/home/login', login)
            .then((res) => {
                setLogin({
                    email: '',
                    password: ''
                });

            })
            .catch((err) => {
                console.log('Error in Login!');
            });
    };




    return (

        <div>
            <div>



                <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src="https://cdn-icons-png.flaticon.com/128/1546/1546853.png"
                            alt="Highlights"
                        />

                        <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900 font-italiana">
                            Sign in to your account
                        </h2>
                    </div>
                    <div className='login-container bg-white w-96 mt-4 '>
                        <form
                            className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm"
                            noValidate onSubmit={onSubmit}>
                            <div className='form-group'>
                                <label htmlFor='email' className='text-sm text-zinc-500'>Email</label>
                                <input
                                    type='text'
                                    id='email'
                                    name='email'
                                    className='input-home form-control rounded-lg'
                                    value={login.email}
                                    onChange={onChange}
                                />
                            </div>

                            <label
                                htmlFor='password'
                                className='text-sm text-zinc-500 '>
                                Password
                            </label>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    name='password'
                                    className='form-control rounded-lg'
                                    value={login.author}
                                    onChange={onChange}
                                />
                            </div>


                            <input
                                type='submit'
                                className='btn btn-outline-warning btn-block mt-8 rounded-lg'
                            />
                        </form>
                    </div>

                    <div className='flex justify-center mt-4 text-center items-center'>
                        <p className=" text-sm text-gray-500">
                            Not a member?{' '}

                        </p>
                        <Link to='/sign-up'>
                            <p className="font-semibold leading-6 text-amber-400 hover:text-amber-300 mx-2">
                                Sign Up
                            </p>
                        </Link>

                    </div>


                </div>
            </div>
        </div>
    )
}