import axiosClient from "./axiosClient";

const toyApi = {
    getAll: (params) => {
        const url = '/search';
        return axiosClient.get(url, { params });
    },

    get: (id) => {
        const url = `/posts/${id}`;
        return axiosClient.get(url);
    },
}

export default toyApi;