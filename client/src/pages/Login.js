import React, {
  useState
} from 'react';

import API from '../services/api';

import {
  useNavigate,
  Link
} from 'react-router-dom';

import {
  toast
} from 'react-toastify';

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        '/auth/login',
        formData
      );

      localStorage.setItem(
        'token',
        res.data.token
      );

      toast.success(res.data.message);

      navigate('/dashboard');

    } catch (err) {

      console.log(err);

      toast.error(
        err.response?.data?.message ||
        'Login Failed'
      );

    }
  };

  return (

    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >

      <div
        className="card shadow-lg p-5"
        style={{
          width: '400px',
          borderRadius: '15px'
        }}
      >

        <h1 className="text-center mb-4">
          ZepNest Login
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <button
            className="btn btn-dark w-100"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-3">

          Don't have an account?

          {' '}

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Login;