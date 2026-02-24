import axiosInstance from './axios';

<<<<<<< HEAD
/**
 * Get all restaurants
 */
=======

>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
export const getAllRestaurants = async () => {
    const response = await axiosInstance.get('/restaurant/all');
    return response.data;
};
<<<<<<< HEAD

/**
 * Get restaurant by ID
 */
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
export const getRestaurantById = async (id) => {
    const response = await axiosInstance.get(`/restaurant/${id}`);
    return response.data;
};

<<<<<<< HEAD
/**
 * Search restaurants
 */
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
export const searchRestaurants = async (query) => {
    const response = await axiosInstance.get('/restaurant/search', {
        params: { q: query },
    });
    return response.data;
};

<<<<<<< HEAD
/**
 * Create new restaurant
 */
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
export const createRestaurant = async (data, force = false) => {
    const response = await axiosInstance.post('/restaurant/add', data, {
        params: { force },
    });
    return response.data;
};
