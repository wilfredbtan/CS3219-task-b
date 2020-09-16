import axios from 'axios';
const dotenv = require('dotenv');

dotenv.config();

const instance = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
