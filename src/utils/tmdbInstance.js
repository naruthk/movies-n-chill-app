import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_TMDB_BASE_URL
});