import { format, parseISO } from 'date-fns';

/**
 * Format date to readable string
 */
export const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
        return format(date, 'MMM d, yyyy');
    } catch (error) {
        return dateString;
    }
};

/**
 * Format date with time
 */
export const formatDateTime = (dateString) => {
    if (!dateString) return '';
    try {
        const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
        return format(date, 'MMM d, yyyy h:mm a');
    } catch (error) {
        return dateString;
    }
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
    if (!name) return '?';
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};

/**
 * Calculate average from array of numbers
 */
export const calculateAverage = (numbers) => {
    if (!numbers || numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length).toFixed(1);
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Generate star array for rating
 */
export const getStarArray = (rating) => {
    return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating));
};
