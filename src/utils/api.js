// client/src/utils/api.js
import axios from 'axios';

export default axios.create({
  baseURL: 'https://minutemint-be.vercel.app/api',
});
