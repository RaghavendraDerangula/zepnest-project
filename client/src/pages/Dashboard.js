import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests");

      setRequests(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const deleteRequest = async (id) => {
    try {
      await API.delete(`/requests/${id}`);

      toast.success("Request Deleted");

      fetchRequests();
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed");
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(search.toLowerCase()) ||
      req.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || req.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Service Requests</h1>

      <div className="d-flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search Requests"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select w-auto"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="pending">pending</option>
          <option value="completed">completed</option>
        </select>
      </div>

      <div className="row">
        {filteredRequests.map((request) => (
          <div className="col-md-4 mb-4" key={request.id}>
            <div className="card shadow border-0 rounded-4 h-100">
              {request.image && (
                <img
                  src={`https://zepnest-backend.onrender.com/uploads/${request.image}`}
                  alt="request"
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                />
              )}

              <div className="card-body">
                <h4>{request.title}</h4>

                <p>
                  <strong>Category:</strong> {request.category}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      request.status === "completed"
                        ? "text-success"
                        : "text-warning"
                    }
                  >
                    {request.status}
                  </span>
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