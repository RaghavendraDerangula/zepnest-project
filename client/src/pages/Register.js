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

function Register() {

  const navigate = useNavigate();

  const [showRules, setShowRules] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const validateEmail = (email) => {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);

  };

  const passwordChecks = {

    length:
      formData.password.length >= 8,

    uppercase:
      /[A-Z]/.test(formData.password),

    number:
      /[0-9]/.test(formData.password),

    special:
      /[!@#$%^&*]/.test(formData.password)

  };

  const validatePassword = () => {

    return (
      passwordChecks.length &&
      passwordChecks.uppercase &&
      passwordChecks.number &&
      passwordChecks.special
    );

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateEmail(formData.email)) {

      toast.error(
        'Invalid Email Format'
      );

      return;

    }

    if (!validatePassword()) {

      toast.error(
        'Password Does Not Match Required Pattern'
      );

      return;

    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      toast.error(
        'Passwords Do Not Match'
      );

      return;

    }

    try {

      const res = await API.post(
        '/auth/register',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      );

      toast.success(
        res.data.message
      );

      navigate('/');

    } catch (err) {

      console.log(err);

      toast.error(
        err.response?.data?.message ||
        'Registration Failed'
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
          width: '420px',
          borderRadius: '15px'
        }}
      >

        <h1 className="text-center mb-4">
          ZepNest Register
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="form-control mb-3"
            onChange={handleChange}
          />

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
            onFocus={() => setShowRules(true)}
            onChange={handleChange}
          />

          {
            showRules &&
            !validatePassword() && (

              <div className="mt-2 mb-3">

                <small>

                  Password must contain:

                  <ul>

                    <li
                      style={{
                        color:
                          passwordChecks.length
                          ?
                          'green'
                          :
                          'red'
                      }}
                    >
                      8 characters
                    </li>

                    <li
                      style={{
                        color:
                          passwordChecks.uppercase
                          ?
                          'green'
                          :
                          'red'
                      }}
                    >
                      1 uppercase letter
                    </li>

                    <li
                      style={{
                        color:
                          passwordChecks.number
                          ?
                          'green'
                          :
                          'red'
                      }}
                    >
                      1 number
                    </li>

                    <li
                      style={{
                        color:
                          passwordChecks.special
                          ?
                          'green'
                          :
                          'red'
                      }}
                    >
                      1 special character
                    </li>

                  </ul>

                </small>

              </div>

            )
          }

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <button
            className="btn btn-dark w-100"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-3">

          Already have an account?

          {' '}

          <Link to="/">
            Login
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Register;