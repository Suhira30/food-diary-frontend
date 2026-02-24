// API Base URL - pointing to backend
export const API_BASE_URL = 'http://localhost:8080/v1/food-diary';

// Local Storage Keys
export const TOKEN_KEY = 'food_diary_token';
export const USER_KEY = 'food_diary_user';

// Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    RESTAURANTS: '/restaurants',
    RESTAURANT_DETAIL: '/restaurant/:id',
    PROFILE: '/profile',
    SEARCH: '/search',
    SUBSCRIPTION: '/subscription',
};

// Filter Types
export const FILTER_TYPES = {
    ALL: 'all',
    FAVORITES: 'favorites',
    TOP_RATED: 'top-rated',
    VISITED: 'visited',
};

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
    MONTHLY: 'MONTHLY',
    YEARLY: 'YEARLY',
};
