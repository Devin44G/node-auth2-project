import axios from 'axios';

export const axiosWithAuth = () => {
  const token = window.localStorage.getItem('token');
  // const userID = window.localStorage.getItem('userID');

  return axios.create({
    headers: {
      Authorization: token
    },
    baseURL: 'http://localhost:5000'
  });
};
