import axiosClient from "./axiosClient";

const gameApi = {
    getGames: (params) => {
        const url = '';
        return axiosClient.get(url, { params });
    },
}

export default gameApi;