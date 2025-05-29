import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 10000,
});

export default api;

/**
if (!API_KEY) {
		throw new Error("VITE_CATAPI_KEY missing in environment");
	}
*/