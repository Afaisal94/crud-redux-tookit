import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../redux/features/userSlice";

function Edit() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const { isLoading, user, isError } = useSelector((state) => ({
    ...state.user,
  }));
  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch]);

  useEffect(() => {
    if(user){
      setName(user.name);
      setEmail(user.email);
      setUsername(user.username);
    }
  }, [user]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser({id, name, username, email}));
    navigate("/");
  };
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-5">Edit User</h5>
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

export default Edit;
