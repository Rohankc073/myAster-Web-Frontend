import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5003',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});

export const registerUser = async (userData) => {
    const API_BASE_URL = "http://localhost:5003";  // <-- Hardcode your backend URL

    try {
        console.log("📤 Sending request to:", `${API_BASE_URL}/auth/register`);
        console.log("📝 Data being sent:", userData);

        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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



//This is the connection file between the frontend and the backend. 
// It is used to make requests to the backend server. 
// The loginUser function is used to make a POST request 
// to the /user/add endpoint of the backend server. 
// The data parameter is the user data that is sent to the backend server. 
// The withCredentials option is set to true to allow cookies to be sent with the request. 
// The headers option is set to specify the content type of the request as application/json.