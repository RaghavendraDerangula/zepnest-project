import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {

  const [requests, setRequests] = useState([]);

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

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (req) => req.status === "pending"
  ).length;

  const completedRequests = requests.filter(
    (req) => req.status === "completed"
  ).length;

  return (

    <>

      <Navbar />

      <div className="container mt-5">

        <h1
          style={{
            fontWeight: "700",
            fontSize: "45px"
          }}
        >
          Hello, Raghavendra 👋
        </h1>

        <p className="text-muted mb-5">
          Here's an overview of your service requests.
        </p>

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

              <p className="mt-2">
                Total Requests
              </p>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div
              className="card shadow-sm border-0 p-4 text-center"
              style={{
                borderRadius: "20px"
              }}
            >

              <h1 style={{ color: "#e6b800" }}>
                {pendingRequests}
              </h1>

              <p className="mt-2">
                Pending
              </p>

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

              <p className="mt-2">
                Completed
              </p>

            </div>

          </div>

        </div>

        <div
          className="p-5 mb-5"
          style={{
            background: "#ff5c00",
            borderRadius: "20px",
            color: "white"
          }}
        >

          <div className="d-flex justify-content-between align-items-center">

            <div>

              <h2>
                Need a home service?
              </h2>

              <p>
                Create a new request and we'll get it done.
              </p>

            </div>

            <a
              href="/create-request"
              className="btn btn-light btn-lg"
            >
              + New Request
            </a>

          </div>

        </div>

        <div className="d-flex justify-content-between mb-4">

          <h2>
            Recent Requests
          </h2>

          <a
            href="/requests"
            style={{
              color: "#ff5c00",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            View all →
          </a>

        </div>

        <div className="row">

          {
            requests.map((req) => (

              <div
                className="col-md-6 mb-4"
                key={req.id}
              >

                <div
                  className="card shadow-sm border-0 p-4"
                  style={{
                    borderRadius: "20px"
                  }}
                >

                  <div className="d-flex justify-content-between">

                    <div>

                      <h4>
                        {req.title}
                      </h4>

                      <p className="text-muted">
                        {req.category}
                      </p>

                    </div>

                    <span
                      className={
                        req.status === "completed"
                        ?
                        "badge bg-success"
                        :
                        "badge bg-warning text-dark"
                      }
                      style={{
                        height: "30px",
                        padding: "10px"
                      }}
                    >
                      {req.status}
                    </span>

                  </div>

                  {
                    req.image &&
                    (
                      <img
                        src={req.image}
                        alt="request"
                        className="img-fluid mt-3"
                        style={{
                          borderRadius: "15px",
                          height: "250px",
                          objectFit: "cover",
                          width: "100%"
                        }}
                      />
                    )
                  }

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