import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Dashboard() {

  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [status, setStatus] = useState("All");

  const user =
    JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {

    try {

      const res = await API.get('/requests');

      setRequests(res.data);
      setFiltered(res.data);

    } catch (err) {

      console.log(err);
      toast.error('Failed to Fetch Requests');

    }
  };

  const filterStatus = (value) => {

    setStatus(value);

    if (value === "All") {

      setFiltered(requests);

    } else {

      setFiltered(

        requests.filter(
          (req) =>
            req.status &&
            req.status.toLowerCase() ===
            value.toLowerCase()
        )

      );

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

  const updateStatus = async (id, newStatus) => {

    try {

      await API.put(`/requests/${id}`, {
        status: newStatus
      });

      toast.success('Status Updated');

      fetchRequests();

    } catch (err) {

      console.log(err);
      toast.error('Update Failed');

    }
  };

  const totalRequests = requests.length;

  const pendingRequests =
    requests.filter(
      (req) =>
        req.status?.toLowerCase() === "pending"
    ).length;

  const completedRequests =
    requests.filter(
      (req) =>
        req.status?.toLowerCase() === "completed"
    ).length;

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        {/* HELLO SECTION */}

        <div className="mb-5">

          <h1 className="fw-bold">
            Hello, {user?.name || "User"} 👋
          </h1>

          <p className="text-muted">
            Here's an overview of your service requests.
          </p>

        </div>

        {/* STATS */}

        <div className="row mb-5">

          <div className="col-md-4 mb-3">

            <div
              className="card shadow-sm border-0 p-4 text-center"
              style={{
                borderRadius: "20px"
              }}
            >

              <h1 style={{ color: "#ff6600" }}>
                {totalRequests}
              </h1>

              <p>Total Requests</p>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div
              className="card shadow-sm border-0 p-4 text-center"
              style={{
                borderRadius: "20px"
              }}
            >

              <h1 style={{ color: "#f0ad4e" }}>
                {pendingRequests}
              </h1>

              <p>Pending</p>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div
              className="card shadow-sm border-0 p-4 text-center"
              style={{
                borderRadius: "20px"
              }}
            >

              <h1 style={{ color: "green" }}>
                {completedRequests}
              </h1>

              <p>Completed</p>

            </div>

          </div>

        </div>

        {/* ORANGE SECTION */}

        <div
          className="p-5 mb-5"
          style={{
            background: "#ff5c00",
            borderRadius: "20px",
            color: "white"
          }}
        >

          <div className="d-flex justify-content-between align-items-center flex-wrap">

            <div>

              <h2>
                Need a home service?
              </h2>

              <p>
                Create a new request and we'll get it done.
              </p>

            </div>

            <Link
              to="/create-request"
              className="btn btn-light btn-lg"
            >
              + New Request
            </Link>

          </div>

        </div>

        {/* REQUESTS HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h2 className="fw-bold">
              My Requests
            </h2>

            <p className="text-muted">
              {filtered.length} total requests
            </p>

          </div>

        </div>

        {/* STATUS FILTERS */}

        <div className="d-flex gap-3 flex-wrap mb-4">

          <button
            className={`btn ${
              status === "All"
                ? "btn-warning"
                : "btn-outline-secondary"
            }`}
            onClick={() => filterStatus("All")}
          >
            All
          </button>

          <button
            className={`btn ${
              status === "Pending"
                ? "btn-warning"
                : "btn-outline-secondary"
            }`}
            onClick={() => filterStatus("Pending")}
          >
            Pending
          </button>

          <button
            className={`btn ${
              status === "Completed"
                ? "btn-warning"
                : "btn-outline-secondary"
            }`}
            onClick={() => filterStatus("Completed")}
          >
            Completed
          </button>

          <button
            className={`btn ${
              status === "Cancelled"
                ? "btn-warning"
                : "btn-outline-secondary"
            }`}
            onClick={() => filterStatus("Cancelled")}
          >
            Cancelled
          </button>

        </div>

        {/* REQUEST CARDS */}

        <div className="row">

          {
            filtered.length === 0
            ?
            <h5 className="text-center mt-5">
              No Requests Found
            </h5>
            :
            filtered.map((req) => (

              <div
                className="col-md-6 mb-4"
                key={req.id}
              >

                <div
                  className="card shadow-sm border-0 p-4 rounded-4"
                >

                  <div className="d-flex justify-content-between align-items-start flex-wrap">

                    <div>

                      <div className="d-flex align-items-center gap-3 mb-2">

                        <h4 className="fw-bold m-0">
                          {req.title}
                        </h4>

                        <span
                          className={
                            req.status === "Completed"
                            ?
                            "badge bg-success px-3 py-2"
                            :
                            req.status === "Cancelled"
                            ?
                            "badge bg-danger px-3 py-2"
                            :
                            "badge bg-warning text-dark px-3 py-2"
                          }
                        >
                          {req.status}
                        </span>

                      </div>

                      <p className="text-muted">
                        {req.description}
                      </p>

                      <div className="d-flex gap-4 flex-wrap text-secondary mb-3">

                        <span>
                          📦 {req.category}
                        </span>

                        <span>
                          📍 {req.address}
                        </span>

                        <span>
                          🕒 {req.preferred_time}
                        </span>

                      </div>

                      {
                        req.image &&
                        (
                          <img
                            src={`https://zepnest-backend.onrender.com/uploads/${req.image}`}
                            alt="request"
                            style={{
                              width: "140px",
                              height: "140px",
                              objectFit: "cover",
                              borderRadius: "12px",
                            }}
                          />
                        )
                      }

                    </div>

                    <div className="d-flex flex-column gap-2 mt-3">

                      <button
                        className="btn btn-success"
                        onClick={() =>
                          updateStatus(
                            req.id,
                            "Completed"
                          )
                        }
                      >
                        Complete
                      </button>

                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          updateStatus(
                            req.id,
                            "Cancelled"
                          )
                        }
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