import axiosInstance from './axios';

/**
 * Get user profile
 */
export const getUserProfile = async () => {
    const response = await axiosInstance.get('/profile/get/user-profile');
    return response.data;
};

/**
 * Get user timeline
 */
export const getUserTimeline = async (sortBy = 'latest') => {
    const response = await axiosInstance.get('/profile/timeline', {
        params: { sortBy },
    });
    return response.data;
};

/**
 * Get filtered timeline
 */
export const getFilteredTimeline = async (type = 'all') => {
    const response = await axiosInstance.get('/profile/timeline/filter', {
        params: { type },
    });
    return response.data;
};
