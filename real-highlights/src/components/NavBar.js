import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPenToSquare,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function NavBar() {
  const handleLogout = () => {
    console.log("token clicked to remove");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const user = localStorage.getItem("token");

  return (
    <div className="navBar-container">
      <div className="mb-3- mx-5 pt-5 text-3xl flex justify-between  pb-4">
        <Link to="/">
          <div className="font-italiana">Notes</div>
        </Link>
        <div>
          {user && (
            <div onClick={handleLogout}>
              <p className="signout-button text-sm">Sign Out</p>
            </div>
          )}

          {!user && (
            <FontAwesomeIcon className="text-xl text-zinc-500" icon={faBars} />
          )}
        </div>
      </div>
    </div>
  );
}
