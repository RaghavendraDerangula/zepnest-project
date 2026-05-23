import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

function Dashboard() {

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {

    try {

      const res = await API.get('/requests');

      setRequests(res.data);

    } catch (err) {

      console.log(err);
      toast.error('Failed to Fetch Requests');

    }
  };

  const deleteRequest = async (id) => {

    try {

      await API.delete(`/requests/${id}`);

      toast.success('Request Deleted');

      fetchRequests();

    } catch (err) {

      console.log(err);
      toast.error('Delete Failed');

    }
  };

  const updateStatus = async (id) => {

    try {

      await API.put(`/requests/${id}`, {
        status: 'Completed'
      });

      toast.success('Status Updated');

      fetchRequests();

    } catch (err) {

      console.log(err);
      toast.error('Update Failed');

    }
  };

  const filteredRequests = requests.filter((req) => {

    const matchesSearch =
      req.title.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === '' ||
      req.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;

  });

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        {/* HELLO SECTION */}

        <div className="mb-5">

          <h1 className="fw-bold">
            Hello, Raghavendra 👋
          </h1>

          <p className="text-muted">
            Here's an overview of your service requests.
          </p>

        </div>

        {/* SEARCH + FILTER */}

        <div className="row mb-4">

          <div className="col-md-6 mb-2">

            <input
              type="text"
              placeholder="Search Requests"
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div className="col-md-6 mb-2">

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >

              <option value="">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

        </div>

        {/* REQUESTS */}

        <div className="row">

          {
            filteredRequests.length === 0
            ?
            <p className="text-center">
              No Requests Found
            </p>
            :
            filteredRequests.map((req) => (

              <div
                key={req.id}
                className="col-md-6 col-lg-4 mb-4"
              >

                <div className="card shadow-lg border-0 h-100 rounded-4">

                  {/* IMAGE */}

                  <img
                    src={
                      req.image
                        ? `https://zepnest-backend.onrender.com/uploads/${req.image}`
                        : 'https://via.placeholder.com/400x250'
                    }
                    alt="request"
                    className="card-img-top"
                    style={{
                      height: '250px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px'
                    }}
                  />

                  <div className="card-body d-flex flex-column">

                    <h3 className="fw-bold">
                      {req.title}
                    </h3>

                    <p className="text-muted">
                      {req.description}
                    </p>

                    <p>
                      <strong>Category:</strong>{' '}
                      {req.category}
                    </p>

                    <p>

                      <strong>Status:</strong>{' '}

                      <span
                        className={
                          req.status === 'Completed'
                          ?
                          'badge bg-success'
                          :
                          'badge bg-warning text-dark'
                        }
                      >
                        {req.status}
                      </span>

                    </p>

                    <div className="mt-auto">

                      {
                        req.status !== 'Completed' && (

                          <button
                            className="btn btn-success me-2"
                            onClick={() =>
                              updateStatus(req.id)
                            }
                          >
                            Complete
                          </button>

                        )
                      }

                      <button
                        className="btn btn-warning me-2"
                      >
                        Cancel
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          deleteRequest(req.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))
          }

        </div>

      </div>
    </>
  );
}

export default Dashboard;