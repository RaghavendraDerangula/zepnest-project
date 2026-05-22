import React from 'react';

import {
  Link,
  useNavigate
} from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('token');

    navigate('/');

  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3">

      <Link
        to="/dashboard"
        className="navbar-brand fw-bold fs-3"
      >
        ZepNest
      </Link>

      <div className="ms-auto">

        <Link
          to="/dashboard"
          className="btn btn-outline-light me-2"
        >
          Dashboard
        </Link>

        <Link
          to="/create-request"
          className="btn btn-warning me-2"
        >
          Create Request
        </Link>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>

  );
}

export default Navbar;