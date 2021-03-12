import axios from 'axios';
import queryString from 'query-string';
const camelize = require('camelize');
// const CancelToken = axios.CancelToken;
// let cancel;
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

const currentExecutingRequests = {};

axiosClient.interceptors.request.use(
    (req) => {
        let originalRequest = req;

        if (currentExecutingRequests[req.url]) {
            const source = currentExecutingRequests[req.url];
            delete currentExecutingRequests[req.url];
            source.cancel();
        }

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        originalRequest.cancelToken = source.token;
        currentExecutingRequests[req.url] = source;

        // here you could add the authorization header to the request

        return originalRequest;
    },
    (err) => {
        return Promise.reject(err);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        if (currentExecutingRequests[response.request.responseURL]) {
            // here you clean the request
            delete currentExecutingRequests[response.request.responseURL];
        }
        return camelize(response.data);
    },
    (error) => {
        const { config } = error;
        const originalRequest = config;

        if (axios.isCancel(error)) {
            // here you check if this is a cancelled request to drop it silently (without error)
            return new Promise(() => { });
        }

        if (currentExecutingRequests[originalRequest.url]) {
            // here you clean the request
            delete currentExecutingRequests[originalRequest.url];
        }

        // here you could check expired token and refresh it if necessary

        return Promise.reject(error);
    }
);

export default axiosClient;