import React, {
  useEffect,
  useState
} from 'react';

import API from '../services/api';

import Navbar from '../components/Navbar';

import {
  toast
} from 'react-toastify';

function Dashboard() {

  const [requests, setRequests] = useState([]);

  const [search, setSearch] = useState('');

  const [statusFilter, setStatusFilter] = useState('');

  const user =
    JSON.parse(localStorage.getItem("user"));

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

  const updateStatus = async (id, status) => {

    try {

      await API.put(
        `/requests/${id}`,
        {
          status
        }
      );

      toast.success('Status Updated');

      fetchRequests();

    } catch (err) {

      console.log(err);

      toast.error('Update Failed');

    }
  };

  const filteredRequests = requests.filter((req) => {

    const matchesSearch =
      req.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === ''
      ||
      req.status?.toLowerCase() ===
      statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;

  });

  return (

    <>

      <Navbar />

      <div className="container mt-5">

        {/* HELLO */}

        <div className="mb-4">

          <h1 className="fw-bold">
            Hello, {user?.name || "User"} 👋
          </h1>

          <p className="text-muted">
            Here's an overview of your service requests.
          </p>

        </div>

        {/* SEARCH + FILTER */}

        <div className="row mb-4 search-section">

          <div className="col-md-6">

            <input
              type="text"
              placeholder="Search Requests"
              className="form-control"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="col-md-6">

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
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

              <option value="Cancelled">
                Cancelled
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

                <div className="card shadow-lg h-100 rounded-4 border-0">

                  {/* IMAGE */}

                  {
                    req.image &&
                    (
                      <img
                        src={`https://zepnest-backend.onrender.com/uploads/${req.image}`}
                        alt="request"
                        className="card-img-top"
                        style={{
                          height: '240px',
                          objectFit: 'cover',
                          borderTopLeftRadius: '16px',
                          borderTopRightRadius: '16px'
                        }}
                      />
                    )
                  }

                  <div className="card-body d-flex flex-column">

                    <h3 className="mb-3 fw-bold">
                      {req.title}
                    </h3>

                    <p className="text-muted">
                      {req.description}
                    </p>

                    <p>
                      <strong>Category:</strong>
                      {' '}
                      {req.category}
                    </p>

                    <p>
                      <strong>Status:</strong>
                      {' '}

                      <span
                        className={
                          req.status === 'Completed'
                          ?
                          'badge bg-success'
                          :
                          req.status === 'Cancelled'
                          ?
                          'badge bg-danger'
                          :
                          'badge bg-warning text-dark'
                        }
                      >
                        {req.status}
                      </span>

                    </p>

                    <div className="mt-auto">

                      {
                        req.status !== 'Completed'
                        &&
                        req.status !== 'Cancelled'
                        &&
                        (
                          <button
                            className="btn btn-success me-2"
                            onClick={() =>
                              updateStatus(
                                req.id,
                                'Completed'
                              )
                            }
                          >
                            Complete
                          </button>
                        )
                      }

                      {
                        req.status !== 'Completed'
                        &&
                        req.status !== 'Cancelled'
                        &&
                        (
                          <button
                            className="btn btn-warning me-2"
                            onClick={() =>
                              updateStatus(
                                req.id,
                                'Cancelled'
                              )
                            }
                          >
                            Cancel
                          </button>
                        )
                      }

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