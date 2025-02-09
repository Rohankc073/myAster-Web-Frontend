import axios from 'axios';

const API_BASE_URL = "http://localhost:5003";  // Backend URL

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

// ✅ Register User Function
export const registerUser = async (userData) => {
    try {
        console.log("📤 Sending request to:", `${API_BASE_URL}/auth/register`);
        console.log("📝 Data being sent:", userData);

        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        console.log("✅ Response received:", data);

        if (!response.ok) {
            throw new Error(data.message || "Signup failed");
        }

        return data;
    } catch (error) {
        console.error("❌ API Error:", error);
        throw error;
    }
};

// ✅ Login User Function
export const loginUser = async (userData) => {
    try {
        console.log("📤 Sending login request to:", `${API_BASE_URL}/auth/login`);
        console.log("📝 Data being sent:", userData);

        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        console.log("✅ Login Response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        return data;
    } catch (error) {
        console.error("❌ Login Error:", error);
        throw error;
    }
};

export default api;
