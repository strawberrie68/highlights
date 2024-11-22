import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBook = (props) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    bookImg: "",
    description: "",
    genre: "",
    tags: "",
    fav: true,
    finishedReading: false,
  });

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setBook((prevBook) => {
      return {
        ...prevBook,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(book);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/books/add`, book)
      .then((res) => {
        setBook({
          title: "",
          author: "",
          bookImg: "",
          description: "",
          genre: "",
          tags: "",
          fav: true,
          finishedReading: false,
        });

        toast("Book Create", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log("Error in CreateBook!");
        toast.error("Book was not created", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div className="CreateBook">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show BooK List
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
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Book Image"
                  name="bookImg"
                  className="form-control"
                  value={book.bookImg}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Describe this book"
                  name="description"
                  className="form-control"
                  value={book.description}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="textß"
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
                  placeholder="Tags"
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
                <label htmlFor="fav" className="mx-4 ">
                  {" "}
                  Would you like to study this book?{" "}
                </label>
              </div>

              <div className="flex items-center">
                <div className="form-group">
                  <input
                    id="finshedReading"
                    type="checkbox"
                    placeholder="Finished Reading?"
                    name="finishedReading"
                    className="form-control"
                    checked={book.finishedReading}
                    onChange={onChange}
                  />
                </div>
                <label htmlFor="finishedReading" className="mx-4">
                  Finished Reading?{" "}
                </label>
              </div>

              <input
                type="submit"
                className="btn btn-outline-warning btn-block mt-4"
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
