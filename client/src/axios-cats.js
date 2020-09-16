import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  // baseURL: 'https://wilfred-cat-manager-server.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
