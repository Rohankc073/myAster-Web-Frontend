import axios from 'axios';

const API_BASE_URL = "http://localhost:5003"; // Backend URL

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

// ✅ Helper Function to Get Token from Local Storage
const getAuthToken = () => localStorage.getItem("token");

// ✅ Register User Function
export const registerUser = async (userData) => {
    try {
        console.log("📤 Sending request to:", `${API_BASE_URL}/auth/register`);
        console.log("📝 Data being sent:", userData);

        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);

        console.log("✅ Response received:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ API Error:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Login User Function
export const loginUser = async (userData) => {
    try {
        console.log("📤 Sending login request to:", `${API_BASE_URL}/auth/login`);
        console.log("📝 Data being sent:", userData);

        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);

        console.log("✅ Login Response:", response.data);

        if (response.data.token) {
            // Store Token & User Data
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        return response.data;
    } catch (error) {
        console.error("❌ Login Error:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Fetch Users (Admin Only)
export const getAllUsers = async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
        throw new Error("Unauthorized: No token found");
    }

    try {
        const response = await axios.get("http://localhost:5003/user/all", {
            headers: { Authorization: `Bearer ${token}` }, // Attach token
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching users:", error.response?.data || error.message);
        throw error;
    }
};

export default api;
