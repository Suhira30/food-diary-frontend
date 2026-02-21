import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaEdit, FaTrash, FaMapMarkerAlt, FaUserCircle } from 'react-icons/fa';
import { formatDate, getStarArray } from '../../utils/helpers';

const DiaryEntryCard = ({ entry, onToggleFavorite, onEdit, onDelete, showActions = true, showReviewer = false }) => {
    const stars = getStarArray(entry.rating || 0);

    return (
        <div className="card">
            <div className="flex gap-4">
                {/* Restaurant Image */}
                <Link
                    to={`/restaurant/${entry.restaurantId}`}
                    className="flex-shrink-0 w-24 h-24 bg-secondary-bg rounded overflow-hidden group"
                >
                    {entry.restaurantImageUrl ? (
                        <img
                            src={entry.restaurantImageUrl}
                            alt={entry.restaurantName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                            🍽️
                        </div>
                    )}
                </Link>

                {/* Entry Info */}
                <div className="flex-1 min-w-0">
                    {showReviewer ? (
                        /* Show reviewer name when on a restaurant's page */
                        <div className="flex items-center gap-2 mb-1">
                            <FaUserCircle className="text-text-secondary text-lg" />
                            <span className="font-bold text-text-primary">
                                {entry.userName || entry.userId || 'Anonymous'}
                            </span>
                        </div>
                    ) : (
                        /* Show restaurant name when on diary/profile page */
                        <Link
                            to={`/restaurant/${entry.restaurantId}`}
                            className="font-bold text-text-primary hover:text-accent-green transition-colors line-clamp-1"
                        >
                            {entry.restaurantName}
                        </Link>
                    )}

                    {/* Location & Cuisine — hide if showing reviewer context */}
                    {!showReviewer && (
                        <div className="flex items-center gap-3 text-text-secondary text-sm mt-1 mb-2">
                            <span className="flex items-center">
                                <FaMapMarkerAlt className="mr-1" />
                                {entry.restaurantLocation}
                            </span>
                            <span>•</span>
                            <span>{entry.restaurantCuisine}</span>
                        </div>
                    )}

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                            {stars.map((filled, index) => (
                                <FaStar
                                    key={index}
                                    className={filled ? 'star-filled' : 'star-empty'}
                                    size={16}
                                />
                            ))}
                        </div>
                        <span className="text-text-secondary text-sm">{entry.rating?.toFixed(1)}</span>
                    </div>

                    {/* Review */}
                    {entry.review && (
                        <p className="text-text-secondary text-sm line-clamp-2 mb-2">
                            {entry.review}
                        </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-text-secondary text-xs">
                        <span>Visited: {formatDate(entry.visitDate)}</span>
                        {entry.wouldRecommend && (
                            <>
                                <span>•</span>
                                <span className="text-accent-green">Would Recommend</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Actions */}
                {showActions && (
                    <div className="flex flex-col items-end gap-2">
                        <button
                            onClick={() => onToggleFavorite(entry.id)}
                            className={`transition-colors ${entry.isFavorite ? 'text-red-500' : 'text-text-secondary hover:text-red-500'
                                }`}
                            title={entry.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <FaHeart size={20} />
                        </button>
                        <button
                            onClick={() => onEdit(entry)}
                            className="text-text-secondary hover:text-accent-green transition-colors"
                            title="Edit entry"
                        >
                            <FaEdit size={18} />
                        </button>
                        <button
                            onClick={() => onDelete(entry.id)}
                            className="text-text-secondary hover:text-red-500 transition-colors"
                            title="Delete entry"
                        >
                            <FaTrash size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiaryEntryCard;
