import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantById } from '../api/restaurantApi';
import { getRestaurantReviews, checkUserRestaurant, addDiaryEntry, updateDiaryEntry, toggleFavorite as toggleFavoriteApi, deleteDiaryEntry as deleteDiaryEntryApi } from '../api/diaryApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DiaryEntryForm from '../components/diary/DiaryEntryForm';
import DiaryEntryCard from '../components/diary/DiaryEntryCard';
import { FaStar, FaMapMarkerAlt, FaPlus } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const RestaurantDetail = () => {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();

    const [restaurant, setRestaurant] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [userEntry, setUserEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showEntryForm, setShowEntryForm] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        loadRestaurantData();
    }, [id]);

    const loadRestaurantData = async () => {
        try {
            setLoading(true);
            const [restaurantData, reviewsData] = await Promise.all([
                getRestaurantById(id),
                getRestaurantReviews(id),
            ]);

            setRestaurant(restaurantData);
            setReviews(reviewsData);

            // Check if user has an entry
            if (isAuthenticated) {
                try {
                    const userEntryData = await checkUserRestaurant(id);
                    setUserEntry(userEntryData);
                } catch (err) {
                    // User hasn't reviewed yet
                    setUserEntry(null);
                }
            }
        } catch (err) {
            setError('Failed to load restaurant details');
        } finally {
            setLoading(false);
        }
    };

    const handleAddEntry = () => {
        setEditingEntry(null);
        setShowEntryForm(true);
    };

    const handleEditEntry = (entry) => {
        setEditingEntry(entry);
        setShowEntryForm(true);
    };

    const handleSubmitEntry = async (data) => {
        try {
            setFormLoading(true);

            if (editingEntry) {
                await updateDiaryEntry(editingEntry.id, data);
            } else {
                await addDiaryEntry(data);
            }

            setShowEntryForm(false);
            setEditingEntry(null);
            await loadRestaurantData();
        } catch (err) {
            alert(err.message || 'Failed to save entry');
        } finally {
            setFormLoading(false);
        }
    };

    const handleToggleFavorite = async (entryId) => {
        try {
            await toggleFavoriteApi(entryId);
            await loadRestaurantData();
        } catch (err) {
            alert('Failed to toggle favorite');
        }
    };

    const handleDeleteEntry = async (entryId) => {
        if (!confirm('Are you sure you want to delete this entry?')) return;

        try {
            await deleteDiaryEntryApi(entryId);
            await loadRestaurantData();
        } catch (err) {
            alert('Failed to delete entry');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner text="Loading restaurant..." />
            </div>
        );
    }

    if (error || !restaurant) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-xl mb-4">{error || 'Restaurant not found'}</p>
                    <a href="/restaurants" className="link">← Back to restaurants</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="container-custom">
                {/* Restaurant Header */}
                <div className="card mb-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        <div className="w-full md:w-1/3 h-64 bg-secondary-bg rounded overflow-hidden flex-shrink-0">
                            {restaurant.imageUrl ? (
                                <img
                                    src={restaurant.imageUrl}
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-6xl">
                                    🍽️
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-text-primary mb-3">
                                {restaurant.name}
                            </h1>

                            <div className="flex items-center gap-4 text-text-secondary mb-4">
                                <span className="flex items-center">
                                    <FaMapMarkerAlt className="mr-1" />
                                    {restaurant.location}
                                </span>
                                <span className="inline-block bg-secondary-bg px-3 py-1 rounded text-sm">
                                    {restaurant.cuisine}
                                </span>
                            </div>

                            {restaurant.description && (
                                <p className="text-text-secondary mb-4">
                                    {restaurant.description}
                                </p>
                            )}

                            {/* Rating */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <FaStar className="text-accent-orange text-2xl" />
                                    <span className="text-3xl font-bold text-text-primary">
                                        {restaurant.averageRating?.toFixed(1) || 'N/A'}
                                    </span>
                                </div>
                                <span className="text-text-secondary">
                                    {restaurant.totalReviews || 0} {restaurant.totalReviews === 1 ? 'review' : 'reviews'}
                                </span>
                            </div>

                            {/* Add/Edit Entry Button */}
                            {isAuthenticated && (
                                <button
                                    onClick={userEntry ? () => handleEditEntry(userEntry) : handleAddEntry}
                                    className="btn-primary"
                                >
                                    <FaPlus className="inline mr-2" />
                                    {userEntry ? 'Edit My Review' : 'Add to Diary'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div>
                    <h2 className="text-2xl font-bold text-text-primary mb-6">
                        Reviews ({reviews.length})
                    </h2>

                    {reviews.length === 0 ? (
                        <div className="card text-center py-12">
                            <p className="text-text-secondary">No reviews yet. Be the first to review!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <DiaryEntryCard
                                    key={review.id}
                                    entry={review}
                                    onToggleFavorite={handleToggleFavorite}
                                    onEdit={handleEditEntry}
                                    onDelete={handleDeleteEntry}
                                    showActions={userEntry?.id === review.id}
                                    showReviewer={true}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Entry Form Modal */}
            {showEntryForm && (
                <DiaryEntryForm
                    entry={editingEntry}
                    restaurantId={id}
                    onSubmit={handleSubmitEntry}
                    onCancel={() => {
                        setShowEntryForm(false);
                        setEditingEntry(null);
                    }}
                    isLoading={formLoading}
                />
            )}
        </div>
    );
};

export default RestaurantDetail;
