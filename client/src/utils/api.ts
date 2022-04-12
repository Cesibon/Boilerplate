import axios, {AxiosResponse} from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT.toString()
});

export const requestInterceptor = API.interceptors.request.use((config) => {
  // Do something before request is sent
  // if(!config.headers.authorization) config.headers.authorization = 'Bearer ' + user.properties.token
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

export const responseInterceptor = API.interceptors.response.use(
  (response: AxiosResponse)  => {
    return response
  },
  error => {

    //global error handling
    if (!error.response.status) {
      // missing internet connection logic goes here
    } else if(error.response.status === 401){
      // unauthorized
    }else {
      // other app error handling logic goes here
    }

    return Promise.reject(error.response)

  }
)

export default API