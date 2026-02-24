import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchRestaurants } from '../api/restaurantApi';
import RestaurantGrid from '../components/restaurant/RestaurantGrid';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    const [query, setQuery] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim()) return;

        try {
            setLoading(true);
            setHasSearched(true);
            const data = await searchRestaurants(query);
            setRestaurants(data);
        } catch (err) {
            console.error('Search failed:', err);
            setRestaurants([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-8">
            <div className="container-custom">
                {/* Search Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-text-primary mb-4">
                        Search Restaurants
                    </h1>
                    <p className="text-text-secondary">
                        Search by restaurant name, cuisine, or location
                    </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g., Italian, New York, Pizza Place..."
                            className="input-field pr-12"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-2"
                        >
                            <FaSearch />
                        </button>
                    </div>
                </form>

                {/* Results */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-12 h-12 border-4 border-accent-green border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-text-secondary">Searching...</p>
                    </div>
                ) : hasSearched ? (
                    <>
                        <div className="mb-6">
                            <p className="text-text-secondary">
                                {restaurants.length} {restaurants.length === 1 ? 'result' : 'results'} for "{query}"
                            </p>
                        </div>
                        <RestaurantGrid restaurants={restaurants} />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-text-secondary text-lg">
                            Enter a search term to find restaurants
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
