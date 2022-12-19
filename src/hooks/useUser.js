import axios from "axios";

let baseUrl = "http://localhost:5000/users";

const getAll = () => {
  return axios.get(baseUrl);
};

const getById = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

const create = (data) => {
  return axios.post(baseUrl, data);
};

const update = (id, data) => {
  return axios.patch(`${baseUrl}/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const UserHooks = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default UserHooks;
