import axios from 'axios';
export const axiosInstance = async (method, endpoint, payload) => {
    try {
        const response = await axios({
            method,
            url: endpoint,
            data: payload,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        
        return response.data;
    }
    catch (err) {
        return err;
    }
}