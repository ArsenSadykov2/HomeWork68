import * as axios from 'axios';

const axiosApi = axios.default.create({
  baseURL: 'https://arsen-server-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;