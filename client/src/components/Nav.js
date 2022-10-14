import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <nav className="navbar bg-light">
      <form className="container-fluid justify-content-space-around">
        <div>
          <Link to="/" className="navbar-brand">
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              width={24}
              height={24}
              className="d-inline-block align-text-top"
            />
            <span className="px-3">todo-react-app</span>
          </Link>
        </div>
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
      </form>
    </nav>
  );
};
