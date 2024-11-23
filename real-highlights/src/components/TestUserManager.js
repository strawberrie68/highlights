import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosConfig";

const TestUserManager = () => {
  const navigate = useNavigate();

  const setupTestUser = async () => {
    try {
      const response = await axiosInstance.post("/books/test-user/login");
      localStorage.setItem("token", response.data.token);
      toast.success("Test user setup complete with sample books");
      navigate("/"); // Redirect to book list
    } catch (err) {
      toast.error("Failed to setup test user");
      console.error("Test user setup error:", err);
    }
  };

  const resetTestUser = async () => {
    try {
      await axiosInstance.post("/books/test-user/cleanup");
      toast.success("Test user data reset successfully");
      navigate("/"); // Refresh book list
    } catch (err) {
      toast.error("Failed to reset test user data");
      console.error("Test user reset error:", err);
    }
  };

  return (
    <div className="flex gap-4 justify-center my-4">
      <button
        onClick={setupTestUser}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Setup Test User
      </button>
      <button
        onClick={resetTestUser}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Reset Test User Data
      </button>
    </div>
  );
};

export default TestUserManager;
