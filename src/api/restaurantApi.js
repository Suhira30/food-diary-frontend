import axiosInstance from './axios';


export const getAllRestaurants = async () => {
    const response = await axiosInstance.get('/restaurant/all');
    return response.data;
};
export const getRestaurantById = async (id) => {
    const response = await axiosInstance.get(`/restaurant/${id}`);
    return response.data;
};

export const searchRestaurants = async (query) => {
    const response = await axiosInstance.get('/restaurant/search', {
        params: { q: query },
    });
    return response.data;
};

export const createRestaurant = async (data, force = false) => {
    const response = await axiosInstance.post('/restaurant/add', data, {
        params: { force },
    });
    return response.data;
};
