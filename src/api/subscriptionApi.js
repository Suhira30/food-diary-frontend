import axiosInstance from './axios';

<<<<<<< HEAD
/**
 * Create checkout session
 */
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
export const createCheckout = async (plan) => {
    const response = await axiosInstance.post('/subscription/create-checkout', {
        plan,
    });
    return response.data;
};

<<<<<<< HEAD
/**
 * Get subscription status
 */
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
export const getSubscriptionStatus = async () => {
    const response = await axiosInstance.get('/subscription/status');
    return response.data;
};

<<<<<<< HEAD
/**
 * Cancel subscription
 */
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
export const cancelSubscription = async () => {
    const response = await axiosInstance.post('/subscription/cancel');
    return response.data;
};
