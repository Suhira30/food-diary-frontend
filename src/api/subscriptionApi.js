import axiosInstance from './axios';

export const createCheckout = async (plan) => {
    const response = await axiosInstance.post('/subscription/create-checkout', {
        plan,
    });
    return response.data;
};

export const getSubscriptionStatus = async () => {
    const response = await axiosInstance.get('/subscription/status');
    return response.data;
};

export const cancelSubscription = async () => {
    const response = await axiosInstance.post('/subscription/cancel');
    return response.data;
};
