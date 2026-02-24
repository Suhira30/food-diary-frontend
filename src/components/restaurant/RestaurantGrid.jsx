import RestaurantCard from './RestaurantCard';

const RestaurantGrid = ({ restaurants, loading = false }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="card animate-pulse">
                        <div className="h-48 bg-secondary-bg"></div>
                        <div className="p-4 space-y-3">
                            <div className="h-4 bg-secondary-bg rounded w-3/4"></div>
                            <div className="h-3 bg-secondary-bg rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!restaurants || restaurants.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-text-secondary text-lg">No restaurants found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>
    );
};

export default RestaurantGrid;
