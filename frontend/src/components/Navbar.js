import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotes
        </Link>

        <button
          id="navbarToggle"
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <div className="">
            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-primary"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
