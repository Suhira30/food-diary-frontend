import { useState, useEffect } from 'react';
import { getAllRestaurants, searchRestaurants } from '../api/restaurantApi';
import RestaurantGrid from '../components/restaurant/RestaurantGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FaFilter } from 'react-icons/fa';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cuisineFilter, setCuisineFilter] = useState('all');
    const [sortBy, setSortBy] = useState('rating');

    useEffect(() => {
        loadRestaurants();
    }, []);

    useEffect(() => {
        applyFiltersAndSort();
    }, [restaurants, cuisineFilter, sortBy]);

    const loadRestaurants = async () => {
        try {
            setLoading(true);
            const data = await getAllRestaurants();
            setRestaurants(data);
        } catch (err) {
            setError('Failed to load restaurants');
        } finally {
            setLoading(false);
        }
    };

    const applyFiltersAndSort = () => {
        let filtered = [...restaurants];

        // Apply cuisine filter
        if (cuisineFilter !== 'all') {
            filtered = filtered.filter(r => r.cuisine === cuisineFilter);
        }

        // Apply sorting
        if (sortBy === 'rating') {
            filtered.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        } else if (sortBy === 'reviews') {
            filtered.sort((a, b) => (b.totalReviews || 0) - (a.totalReviews || 0));
        } else if (sortBy === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredRestaurants(filtered);
    };

    // Get unique cuisines
    const cuisines = ['all', ...new Set(restaurants.map(r => r.cuisine).filter(Boolean))];

    return (
        <div className="min-h-screen py-8">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-text-primary mb-2">All Restaurants</h1>
                    <p className="text-text-secondary">
                        Discover and explore {restaurants.length} amazing restaurants
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md mb-6">
                        {error}
                    </div>
                )}

                {/* Filters */}
                <div className="card mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center text-text-primary font-semibold">
                            <FaFilter className="mr-2" />
                            Filters:
                        </div>

                        {/* Cuisine Filter */}
                        <div className="flex items-center gap-2">
                            <label className="text-text-secondary text-sm">Cuisine:</label>
                            <select
                                value={cuisineFilter}
                                onChange={(e) => setCuisineFilter(e.target.value)}
                                className="input-field py-2"
                            >
                                {cuisines.map((cuisine) => (
                                    <option key={cuisine} value={cuisine}>
                                        {cuisine === 'all' ? 'All Cuisines' : cuisine}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort By */}
                        <div className="flex items-center gap-2">
                            <label className="text-text-secondary text-sm">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="input-field py-2"
                            >
                                <option value="rating">Highest Rated</option>
                                <option value="reviews">Most Reviews</option>
                                <option value="name">Name (A-Z)</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="ml-auto text-text-secondary text-sm">
                            {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'}
                        </div>
                    </div>
                </div>

                {/* Restaurants Grid */}
                {loading ? (
                    <LoadingSpinner text="Loading restaurants..." />
                ) : (
                    <RestaurantGrid restaurants={filteredRestaurants} />
                )}
            </div>
        </div>
    );
};

export default RestaurantList;
