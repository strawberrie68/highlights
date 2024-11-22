import React from "react";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import ShowBookList from "./components/ShowBookList";
import ShowBookDetails from "./components/ShowBookDetails";
import CreateBook from "./components/CreateBook";
import Login from "./components/Pages/Login/Login";
import SignUp from "./components/Pages/Login/SignUp";

function App() {
  const user = localStorage.getItem("token");

  return (
    <div className="App">
      <Router>
        <NavBar />
        <div>
          <Routes>
            {user && <Route exact path="/" element={<ShowBookList />} />}
            <Route path="/show-book/:id" element={<ShowBookDetails />} />
            <Route path="/create-book" element={<CreateBook />} />
            <Route
              exact
              path="/login"
              element={user ? <ShowBookList /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <ShowBookList /> : <SignUp />}
            />
            <Route exact path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
library.add(fab, fas, far);
