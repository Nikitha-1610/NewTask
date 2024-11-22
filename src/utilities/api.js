// src/api.js

// Fetch API Utility Function
export const apiCall = async (baseUrl, endpoint, method) => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: method || 'GET', // Default to GET if no method is provided
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};


// Axios Configuration
import axios from "axios";

// Base URL configuration
const BASE_URL = "https://3qhglx2bhd.execute-api.us-east-1.amazonaws.com/";

// Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API functions using Axios
export const getAllEmployees = async () => {
  try {
    const response = await apiClient.get("employee/getAll");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const getTeamLeadOptions = async () => {
  try {
    const response = await apiClient.get("employee/getOption/TeamLead");
    return response.data;
  } catch (error) {
    console.error("Error fetching team lead options:", error);
    throw error;
  }
};
