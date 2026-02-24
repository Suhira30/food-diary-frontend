import axiosInstance from './axios';

/**
 * Register new user
 */
export const register = async (data) => {
    const response = await axiosInstance.post('/register', data);
    return response.data;
};

/**
 * Login user
 */
export const login = async (data) => {
    const response = await axiosInstance.post('/login', data);
    return response.data;
};

/**
 * Register Pro user
 */
export const proRegister = async (data) => {
    const response = await axiosInstance.post('/pro/register', data);
    return response.data;
};
