import axios from 'axios';

// In production behind Nginx reverse proxy, relative '/api/v1' is used.
// In Vite development, defaults to backend at localhost:5000.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60s timeout for image processing & Gemini analysis
});

export async function analyzePetImage(file, petType = 'any') {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('petType', petType);

  try {
    const response = await apiClient.post('/pet/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      const errorData = err.response.data?.error || {};
      const status = err.response.status;

      if (status === 429) {
        throw new Error(errorData.message || 'Too many image analysis requests. Please try again later.');
      }

      if (status === 413) {
        throw new Error('Image file is too large. Maximum supported size is 5 MB.');
      }

      if (status === 503 && errorData.code === 'GEMINI_KEY_MISSING') {
        throw new Error('Gemini API key is not configured on the backend server. Please configure GEMINI_API_KEY.');
      }

      throw new Error(errorData.message || `Analysis failed (${status}): ${err.response.statusText}`);
    } else if (err.request) {
      throw new Error('Could not connect to the PetVision AI backend server. Please verify the backend is running.');
    } else {
      throw new Error(err.message || 'An unexpected error occurred.');
    }
  }
}

export async function checkServerStatus() {
  try {
    const response = await apiClient.get('/health/ready');
    return response.data;
  } catch (err) {
    return {
      status: 'offline',
      geminiConfigured: false,
      error: err.message,
    };
  }
}
