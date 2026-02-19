import axiosInstance from './axios';

/**
 * Add diary entry
 */
export const addDiaryEntry = async (data) => {
    const response = await axiosInstance.post('/diary/add', data);
    return response.data;
};

/**
 * Update diary entry
 */
export const updateDiaryEntry = async (id, data) => {
    const response = await axiosInstance.put(`/diary/update/${id}`, data);
    return response.data;
};

/**
 * Delete diary entry
 */
export const deleteDiaryEntry = async (id) => {
    const response = await axiosInstance.delete(`/diary/${id}`);
    return response.data;
};

/**
 * Toggle favorite status
 */
export const toggleFavorite = async (id) => {
    const response = await axiosInstance.post(`/diary/toggle-favorite/${id}`);
    return response.data;
};

/**
 * Get user's diary entries
 */
export const getUserDiary = async (userId) => {
    const response = await axiosInstance.get(`/diary/user-diary/${userId}`);
    return response.data;
};

/**
 * Get user's favorite entries
 */
export const getUserFavorites = async () => {
    const response = await axiosInstance.get('/diary/favorites');
    return response.data;
};

/**
 * Get user's top-rated entries
 */
export const getUserTopRated = async () => {
    const response = await axiosInstance.get('/diary/top-rated');
    return response.data;
};

/**
 * Get restaurant reviews
 */
export const getRestaurantReviews = async (restaurantId) => {
    const response = await axiosInstance.get(`/diary/restaurant/${restaurantId}`);
    return response.data;
};

/**
 * Check if user has reviewed a restaurant
 */
export const checkUserRestaurant = async (restaurantId) => {
    const response = await axiosInstance.get(`/diary/restaurant/${restaurantId}/check`);
    return response.data;
};
