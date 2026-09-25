import axios from "axios";

// 🔥 URL dinámica desde Docker/Vite
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
    baseURL: `${API_URL}/api`
});

// 🌍 Estaciones
export const getStations = () => API.get("/stations");

export const getStationById = (id) =>
    API.get(`/stations/${id}`);

// 📡 Último dato
export const getLatestData = (id) =>
    API.get(`/data/${id}`);

// 📊 Historial
export const getHistory = (id, type) =>
    API.get(`/history/${id}?type=${type}`);