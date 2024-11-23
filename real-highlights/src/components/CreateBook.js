import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosConfig";

const CreateBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    bookImg: "",
    description: "",
    genre: "",
    tags: "",
    fav: true,
    isFinishedReading: false,
  });

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosInstance.post("/books/add", book);
      toast.success("Book Created Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Reset form
      setBook({
        title: "",
        author: "",
        bookImg: "",
        description: "",
        genre: "",
        tags: "",
        fav: true,
        isFinishedReading: false,
      });

      // Redirect to book list after short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Error in CreateBook:", err);
      toast.error(err.response?.data?.message || "Failed to create book", {
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
    <div className="CreateBook">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show Book List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add Book</h1>
            <p className="lead text-center">Create new book</p>

            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="title"
                  className="form-control"
                  value={book.title}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  className="form-control"
                  value={book.author}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Book Image URL"
                  name="bookImg"
                  className="form-control"
                  value={book.bookImg}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Describe this book"
                  name="description"
                  className="form-control"
                  value={book.description}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Genre"
                  name="genre"
                  className="form-control"
                  value={book.genre}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  name="tags"
                  className="form-control"
                  value={book.tags}
                  onChange={onChange}
                />
              </div>

              <div className="flex align-middle items-center my-4">
                <div className="form-group">
                  <input
                    id="fav"
                    type="checkbox"
                    name="fav"
                    className="form-control"
                    checked={book.fav}
                    onChange={onChange}
                  />
                </div>
                <label htmlFor="fav" className="mx-4">
                  Would you like to study this book?
                </label>
              </div>

              <div className="flex items-center">
                <div className="form-group">
                  <input
                    id="isFinishedReading"
                    type="checkbox"
                    name="isFinishedReading"
                    className="form-control"
                    checked={book.isFinishedReading}
                    onChange={onChange}
                  />
                </div>
                <label htmlFor="isFinishedReading" className="mx-4">
                  Finished Reading?
                </label>
              </div>

              <input
                type="submit"
                className="btn btn-outline-warning btn-block mt-4"
                value="Create Book"
              />
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
    </div>
  );
};

export default CreateBook;
