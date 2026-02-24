import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { getStarArray } from '../../utils/helpers';

const RestaurantCard = ({ restaurant }) => {
    const stars = getStarArray(restaurant.averageRating || 0);

    return (
        <Link
            to={`/restaurant/${restaurant.id}`}
            className="card card-hover block overflow-hidden"
        >
            {/* Restaurant Image */}
            <div className="relative h-48 bg-secondary-bg overflow-hidden">
                {restaurant.imageUrl ? (
                    <img
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-secondary text-4xl">
                        🍽️
                    </div>
                )}

                {/* Rating Badge */}
                {restaurant.averageRating > 0 && (
                    <div className="absolute top-2 right-2 bg-card-bg/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center space-x-1">
                        <FaStar className="text-accent-orange text-sm" />
                        <span className="text-text-primary font-semibold text-sm">
                            {restaurant.averageRating.toFixed(1)}
                        </span>
                    </div>
                )}
            </div>

            {/* Restaurant Info */}
            <div className="p-4">
                <h3 className="text-text-primary font-bold text-lg mb-2 line-clamp-1">
                    {restaurant.name}
                </h3>

                <div className="flex items-center text-text-secondary text-sm mb-2">
                    <FaMapMarkerAlt className="mr-1" />
                    <span className="line-clamp-1">{restaurant.location}</span>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <span className="inline-block bg-secondary-bg text-text-secondary text-xs px-2 py-1 rounded">
                        {restaurant.cuisine}
                    </span>

                    {restaurant.totalReviews > 0 && (
                        <span className="text-text-secondary text-xs">
                            {restaurant.totalReviews} {restaurant.totalReviews === 1 ? 'review' : 'reviews'}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default RestaurantCard;
