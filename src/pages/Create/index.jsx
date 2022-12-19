import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/features/userSlice";

function Create() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createUser({name, username, email}));
    navigate("/");
  };
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-5">Create User</h5>
          <div className="card-text">
            <form onSubmit={handleSubmit}>
              <div className="form-group m-2">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group m-2">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group m-2">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary m-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
