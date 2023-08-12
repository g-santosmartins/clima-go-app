import axios, { AxiosResponse, AxiosError } from 'axios';
import handleGetEnvironmentVariables from '../../env';

const BASE_URL = handleGetEnvironmentVariables().WEATHER_API_URL;
const DEBUG = false;
// const API_KEY = getEnvVariables().WHEATHER_APIKEY_ANDROID;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Middleware to get request in details
if(DEBUG) {
  api.interceptors.request.use(
    (config) => {
      console.log('Request:', JSON.stringify(config));
      return config;
    },
    (error) => {
      console.error('Request Error:', JSON.stringify(error));
      return Promise.reject(error);
    }
  );
}


export const apiGet = async <T>(url: string): Promise<T> => {
  try {
    console.log(url)
    const response: AxiosResponse<T> = await api.get(url);
    // console.log("REQUEST RESULT", response)
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

export const apiPost = async <T>(url: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(url, data);
    return response.data;
  } catch (error) {
    if(DEBUG) handleApiError(error as AxiosError);
    throw error;
  }
};

export const apiPut = async <T>(url: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.put(url, data);
    return response.data;
  } catch (error) {
    if(DEBUG) handleApiError(error as AxiosError);
    throw error;
  }
};

export const apiDelete = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.delete(url);
    return response.data;
  } catch (error) {
    if(DEBUG) handleApiError(error as AxiosError);
    throw error;
  }
};

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    console.error('API Response Error:', error.response.data);
    console.error('Status Code:', error.response.status);
  } else if (error.request) {
    console.error('API Request Error:', error.request);
  } else {
    console.error('API Error:', error.message);
  }
};
