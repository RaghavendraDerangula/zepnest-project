import React, { useState } from 'react';

import API from '../services/api';

import Navbar from '../components/Navbar';

import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

function CreateRequest() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    address: '',
    preferred_time: ''
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('address', formData.address);
    data.append('preferred_time', formData.preferred_time);

    if (image) {
      data.append('image', image);
    }

    try {

      const res = await API.post(
        '/requests',
        data
      );

      toast.success(res.data.message);

      navigate('/dashboard');

    } catch (err) {

      console.log(err);

      toast.error('Failed to Create Request');

    }
  };

  return (

    <>

      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-8">

            <div className="card shadow-lg border-0 p-4">

              <h2 className="text-center mb-4">
                Create Service Request
              </h2>

              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="form-control mb-3"
                  onChange={handleChange}
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  className="form-control mb-3"
                  rows="4"
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  className="form-control mb-3"
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="form-control mb-3"
                  onChange={handleChange}
                />

                <input
                  type="datetime-local"
                  name="preferred_time"
                  className="form-control mb-3"
                  onChange={handleChange}
                />

                <input
                  type="file"
                  className="form-control mb-4"
                  onChange={(e) => setImage(e.target.files[0])}
                />

                <button className="btn btn-dark w-100 py-2">
                  Submit Request
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </>

  );
}

export default CreateRequest;