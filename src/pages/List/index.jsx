import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../../redux/features/userSlice";

function List() {
  const dispatch = useDispatch();

  const { isLoading, users, isError } = useSelector((state) => ({
    ...state.user,
  }));

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", margin: "30px" }}>Data Users</h2>
      <Link to={"create"} className="btn btn-primary m-3">
        Create
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5}>
                <center> Loading ... </center>
              </td>
            </tr>
          ) : null}

          {isError ? (
            <tr>
              <td colSpan={5}>
                <center> {isError} </center>
              </td>
            </tr>
          ) : null}

          {!isLoading && users.length ? (
            <>                        
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <div className="btn-group">
                    <Link to={`/edit/${user.id}`} className="btn btn-primary">
                      Edit
                    </Link>

                    <button
                      onClick={() => dispatch(deleteUser(user.id))}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            </>
          ) : null }
        </tbody>
      </table>
    </div>
  );
}

export default List;
