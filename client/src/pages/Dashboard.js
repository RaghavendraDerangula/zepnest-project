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

      await API.put(
        `/requests/${id}`,
        {
          status: 'completed'
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
      req.status === statusFilter;

    return matchesSearch && matchesStatus;

  });

  return (

    <>

      <Navbar />

      <div className="container mt-5">

        <h1 className="dashboard-title text-center mb-4">
          My Service Requests
        </h1>

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

              <option value="pending">
                Pending
              </option>

              <option value="completed">
                Completed
              </option>

            </select>

          </div>

        </div>

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

                <div className="card shadow-lg h-100">

                  {
                    req.image &&
                    (
                      <img
                        src={req.image}
                        alt="request"
                        className="card-img-top"
                        height="240"
                        style={{
                          objectFit: "cover"
                        }}
                      />
                    )
                  }

                  <div className="card-body d-flex flex-column">

                    <h3 className="mb-3">
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
                          req.status === 'completed'
                          ?
                          'text-success'
                          :
                          'text-warning'
                        }
                      >
                        {req.status}
                      </span>

                    </p>

                    <div className="mt-auto">

                      <button
                        className="btn btn-success me-2"
                        onClick={() =>
                          updateStatus(req.id)
                        }
                      >
                        Complete
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