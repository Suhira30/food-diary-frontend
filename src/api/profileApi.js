import axiosInstance from './axios';

<<<<<<< HEAD
/**
 * Get user profile
 */
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
export const getUserProfile = async () => {
    const response = await axiosInstance.get('/profile/get/user-profile');
    return response.data;
};

<<<<<<< HEAD
/**
 * Get user timeline
 */
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
export const getUserTimeline = async (sortBy = 'latest') => {
    const response = await axiosInstance.get('/profile/timeline', {
        params: { sortBy },
    });
    return response.data;
};

<<<<<<< HEAD
/**
 * Get filtered timeline
 */
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
export const getFilteredTimeline = async (type = 'all') => {
    const response = await axiosInstance.get('/profile/timeline/filter', {
        params: { type },
    });
    return response.data;
};
