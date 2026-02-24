import axiosInstance from './axios';

/**
 * Get all restaurants
 */
export const getAllRestaurants = async () => {
    const response = await axiosInstance.get('/restaurant/all');
    return response.data;
};

/**
 * Get restaurant by ID
 */
export const getRestaurantById = async (id) => {
    const response = await axiosInstance.get(`/restaurant/${id}`);
    return response.data;
};

/**
 * Search restaurants
 */
export const searchRestaurants = async (query) => {
    const response = await axiosInstance.get('/restaurant/search', {
        params: { q: query },
    });
    return response.data;
};

/**
 * Create new restaurant
 */
export const createRestaurant = async (data, force = false) => {
    const response = await axiosInstance.post('/restaurant/add', data, {
        params: { force },
    });
    return response.data;
};
