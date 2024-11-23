import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import AnkiCard from "./AnkiCard";
import axiosInstance from "../utils/axiosConfig";

function ShowBookList() {
  const [books, setBooks] = useState([]);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/quotes")
      .then((res) => {
        setQuotes(res.data);
      })
      .catch((err) => {
        console.error("Error fetching quotes:", err);
      });
  }, []);

  const updateQuote = async (id, matchQuote) => {
    try {
      await axiosInstance.post(`/quotes/update/${id}`, matchQuote);
      console.log("Quote updated successfully");
    } catch (err) {
      console.error("Error updating quote:", err);
    }
  };

  const renderBookList = () => {
    if (books.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg mb-4">Your bookshelf is empty</p>
          <Link
            to="/create-book"
            className="text-amber-500 hover:text-amber-600"
          >
            Add your first book
          </Link>
        </div>
      );
    }
    return books.map((book, k) => <BookCard book={book} key={book._id || k} />);
  };

  return (
    <div className="ShowBookList">
      <div className="container pt-4">
        <AnkiCard quote={quotes} />

        <div className="flex justify-between">
          <div className="flex flex-col flex-start px-3">
            <p className="text-2xl text-zinc-500 font-italiana">My Bookshelf</p>
            <p className="text-sm text-left text-zinc-300 mt-2">
              All your books
            </p>
          </div>

          <Link
            to="/create-book"
            className="rounded-2xl text-sm btn button-yellow text-zinc-500 border-amber-200"
          >
            + Add New Book
          </Link>
        </div>

        <div className="list">{renderBookList()}</div>
      </div>
    </div>
  );
}

export default ShowBookList;
