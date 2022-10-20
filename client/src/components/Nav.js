import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/User";

export default () => {
  const userContext = useContext(UserContext);
  const userData = userContext.userData;

  return (
    <nav className="navbar bg-light">
      <form className="container-fluid justify-content-space-around">
        <div>
          <Link to="/" className="navbar-brand">
            <img
              src="/assets/images/icon.jpg"
              alt="Logo"
              width={24}
              height={24}
              className="d-inline-block align-text-top"
            />
            <span className="px-1">Lister</span>
          </Link>
        </div>
        {userData.token && userData._id && userData.username ? (
          <div>
            <Link to="/app">
              <button className="btn btn-outline-success me-2" type="button">
                Go to App
              </button>
            </Link>

            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => {
                userContext.setUserData({
                  username: null,
                  _id: null,
                  token: null,
                });
                localStorage.removeItem("user");
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className="btn btn-outline-success me-2" type="button">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-outline-secondary" type="button">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </form>
    </nav>
  );
};
