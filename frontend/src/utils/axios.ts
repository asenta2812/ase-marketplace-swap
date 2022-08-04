import { MessageError } from './../components/messages/index';
import { getLocalStorage } from './index';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL as string,
});
instance.interceptors.request.use(
  function (response) {
    // Do something with response data
    const url = response.url;
    if (!url?.includes('auth')) {
      const token = getLocalStorage<string>();
      if (token) {
        response.headers = {
          ...response.headers,
          Authentication: 'Bearer ' + token,
        };
      }
    }
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    const errorData = error.response?.data || error;

    MessageError(errorData.message);
    if (errorData.statusCode === 401 || errorData.statusCode === 403) {
      // store.dispatch(signOutUserAction())
    }
    // Do something with response error
    return Promise.reject(errorData);
  }
);
export default instance;
