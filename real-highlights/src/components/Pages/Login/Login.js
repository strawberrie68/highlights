import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../utils/axiosConfig";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setdata((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleTestUser = async (event) => {
    event.preventDefault();
    try {
      // Setup test user with sample data
      const setupResponse = await axiosInstance.post("/books/test-user/login");
      localStorage.setItem("token", setupResponse.data.token);
      window.location = "/";
    } catch (error) {
      console.error("Test user login error:", error);
      toast.error("Error setting up test user", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth", data);
      localStorage.setItem("token", response.data.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }

      toast.error(error.response?.data?.message || "Error signing in", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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
            Sign in to your account
          </h2>
        </div>
        <div className="login-form-container bg-white mt-4">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {error && (
              <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            <form className="space-y-6" noValidate onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                    onChange={onChange}
                    value={data.email}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm leading-6 text-gray-900"
                  >
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
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6"
                    value={data.password}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-amber-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={handleTestUser}
                  className="flex w-full justify-center rounded-md bg-gray-100 px-3 py-1.5 mt-2 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Test User
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link to="/signup">
                <span className="font-semibold leading-6 text-amber-300 hover:text-amber-500">
                  Sign Up
                </span>
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
  );
}
