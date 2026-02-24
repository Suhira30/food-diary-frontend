import axiosInstance from './axios';

/**
 * Create checkout session
 */
export const createCheckout = async (plan) => {
    const response = await axiosInstance.post('/subscription/create-checkout', {
        plan,
    });
    return response.data;
};

/**
 * Get subscription status
 */
export const getSubscriptionStatus = async () => {
    const response = await axiosInstance.get('/subscription/status');
    return response.data;
};

/**
 * Cancel subscription
 */
export const cancelSubscription = async () => {
    const response = await axiosInstance.post('/subscription/cancel');
    return response.data;
};
