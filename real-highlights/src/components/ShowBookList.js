import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

import AnkiCard from "./AnkiCard";

function ShowBookList() {
  const [books, setBooks] = useState([]);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/books`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/quotes`)
      .then((res) => {
        setQuotes(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowBookList quotes");
      });
  }, []);

  const bookList =
    books.length === 0
      ? "there is no book record!"
      : books.map((book, k) => <BookCard book={book} key={k} />);

  function updateQuote(id, matchQuote) {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/quotes/update/${id}`,
        matchQuote
      )
      .then((res) => {
        console.log("updated Quote");
      })
      .catch((err) => {
        console.log("Error in UpdateQuoteInfo!");
      });
  }

  return (
    <div className="ShowBookList">
      <div className="container pt-4">
        <AnkiCard quote={quotes} />

        <div className="flex justify-between">
          <div className="flex flex-col flex-start px-3">
            <p className="text-2xl  text-zinc-500 font-italiana">
              My Bookshelf
            </p>
            <p className="text-sm text-left text-zinc-300 mt-2">
              All your books
            </p>
          </div>

          <Link
            to="/create-book"
            className="rounded-2xl text-sm btn button-yellow text-zinc-500 border-amber-200 "
          >
            + Add New Book
          </Link>
        </div>

        <div className="list">{bookList}</div>
      </div>
    </div>
  );
}

export default ShowBookList;
