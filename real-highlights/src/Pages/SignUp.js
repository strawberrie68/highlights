import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {

    const [login, setLogin] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const onChange = (event) => {
        const { name, value } = event.target
        setLogin(prevBook => {
            return {
                ...prevBook,
                [name]: value

            }
        })
    };

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(login)

        axios
            .post('http://localhost:6010/home/signup', login)
            .then((res) => {
                setLogin({
                    userName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });

            })
            .catch((err) => {
                console.log('Error in Login!' + err);
            });
    };




    return (
        <div>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://cdn-icons-png.flaticon.com/128/1546/1546853.png"
                        alt="Highlights"
                    />

                    <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900 font-italiana">
                        Create A New Account
                    </h2>
                </div>
                <div className='login-container bg-white w-96 mt-4'>
                    <form noValidate onSubmit={onSubmit}>

                        <div className='form-group'>
                            <label htmlFor='userName' className='text-sm text-zinc-500'>Username</label>
                            <input
                                id='userName'
                                type='text'
                                name='userName'
                                className='form-control'
                                value={login.userName}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='email-signup' className='text-sm text-zinc-500'>Email</label>
                            <input
                                id='email-signup'
                                type='email'
                                name='email'
                                className='form-control'
                                value={login.email}
                                onChange={onChange}
                            />
                        </div>


                        <div className='form-group'>
                            <label htmlFor='password-signup' className='text-sm text-zinc-500'>Password</label>
                            <input
                                id='password-signup'
                                type='text'
                                name='password'
                                className='form-control'
                                value={login.password}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='passwordConfirm-signup' className='text-sm text-zinc-500'>Confirm Password</label>
                            <input
                                type='text'
                                id='passwordConfirm-signup'
                                name='confirmPassword'
                                className='form-control'
                                value={login.confirmPassword}
                                onChange={onChange}
                            />
                        </div>





                        <input
                            type='submit'
                            className='btn btn-outline-warning btn-block mt-4'
                        />
                    </form>

                </div>



            </div>
        </div>
    )
}