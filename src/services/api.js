

import axios from "axios";

const API_URL = "https://chatleaf-message.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token");
  if(token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use((response)=> response,(error)=>{
  if(error.response?.status === 401){
    localStorage.removeItem("token");
    localStorage.removeItem("user")

    if(!window.location.pathname.includes("/login")){
      window.location.href = "/login"
    }
  }

  const message = error.response?.data?.msg || error.response?.data?.msg || "Server connection failed"
  return Promise.reject({message, originalError: error})
})

// REGISTER
export const register = async (data) => {
  const res = await api.post("/api/auth/register", data);
  return res.data;
};

// LOGIN
export const login = async (data) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};


export const updateProfile = async (formData) => {
  try {
    const res = await api.put("/api/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Crucial for file uploads
      },
    });
    
    // We return res.data.data because your backend controller 
    // wraps the user object inside a 'data' key.
    return res.data.data; 
  } catch (error) {
    // Re-throw the error so the component can catch it and show a toast
    throw error;
  }
};

export const getAllUsers = async () => {
  const res = await api.get("/api/users");
  return res.data;
};

export const getConversationMessage = async (reciepientId) => {
  const res = await api.get(`/api/messages/${reciepientId}`);
  return res.data;
};

export const sendMessage = async (messageData) => {
  const res = await api.post("/api/messages/send", messageData);
  return res.data;
};

export const uploadFile = async (formData) => {
  const res = await api.post("/api/messages/upload", formData, {
    headers: { "Content-Type": "multipart/form-Data" },
  });
  return res.data;
};

export default api;
