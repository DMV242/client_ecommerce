import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const playerService = {
    getAllPlayers() {
        return axios.get(`${BASE_URL}/players`);
    },
    postPlayer(data) {
        return axios.post(`${BASE_URL}/player`, data, {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,

            headers: { Authorization: `Bearer ${data.get("token")}` }

        });
    },
    getPlayer(id) {
        return axios.get(`${BASE_URL}/player/${id}`);
    },

}

export { playerService };
