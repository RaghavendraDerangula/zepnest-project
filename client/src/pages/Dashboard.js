import React, { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests");

      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRequest = async (id) => {
    try {
      await API.delete(`/requests/${id}`);

      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredRequests = requests.filter((req) => {
    return (
      req.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "" || req.status === statusFilter)
    );
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Service Requests</h1>

      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search Requests"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredRequests.map((request) => (
          <div className="col-md-4 mb-4" key={request.id}>
            <div className="card shadow">

              {request.image && (
                <img
                  src={`https://zepnest-backend.onrender.com/uploads/${request.image}`}
                  alt="request"
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover"
                  }}
                />
              )}

              <div className="card-body">
                <h4>{request.title}</h4>

                <p>
                  <strong>Category:</strong> {request.category}
                </p>

                <p>
                  <strong>Status:</strong> {request.status}
                </p>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteRequest(request.id)}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;