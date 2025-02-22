import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// File Upload
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_BASE_URL}/data/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } });
};

// Get List of Uploaded Files
export const getUploadedFiles = async () => {
  return axios.get(`${API_BASE_URL}/data/files`);
};

// Get Data for a Specific File (Supports Pagination)
export const getData = async (fileId, pageNo = 1, offset = 25) => {
    return axios.get(`${API_BASE_URL}/data`, {
        params: { fileId, page: pageNo, offset } 
    });
};

// Get Data for Specific File by Time Range
export const getDataByTimeDelta = async (fileId, start, end) => {
  return axios.get(`${API_BASE_URL}/file/${fileId}/getDataByTimeDelta`, { params: { start, end } });
};