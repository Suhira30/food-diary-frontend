import { useState, useEffect } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';

const DiaryEntryForm = ({ entry, restaurantId, onSubmit, onCancel, isLoading }) => {
    const [formData, setFormData] = useState({
        restaurantId: restaurantId || entry?.restaurantId || '',
        rating: entry?.rating || 0,
        review: entry?.review || '',
        visitDate: entry?.visitDate ? entry.visitDate.split('T')[0] : new Date().toISOString().split('T')[0],
        isVisited: entry?.isVisited ?? true,
        isFavorite: entry?.isFavorite ?? false,
        wouldRecommend: entry?.wouldRecommend ?? false,
        tags: entry?.tags || '',
        photoUrls: entry?.photoUrls || '',
    });

    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        if (restaurantId) {
            setFormData(prev => ({ ...prev, restaurantId }));
        }
    }, [restaurantId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitData = {
            ...formData,
            rating: Number(formData.rating),
            // ✅ Backend expects LocalDateTime format, not just a date string
            visitDate: formData.visitDate ? `${formData.visitDate}T00:00:00` : null,
        };

        onSubmit(submitData);
    };

    const handleRatingClick = (rating) => {
        setFormData({ ...formData, rating });
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-card-bg rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-card-bg border-b border-border-color p-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-text-primary">
                        {entry ? 'Edit Diary Entry' : 'Add Diary Entry'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Rating */}
                    <div>
                        <label className="block text-text-primary font-semibold mb-2">
                            Rating <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => handleRatingClick(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <FaStar
                                        size={32}
                                        className={
                                            star <= (hoverRating || formData.rating)
                                                ? 'text-accent-orange'
                                                : 'text-text-secondary'
                                        }
                                    />
                                </button>
                            ))}
                            <span className="ml-2 text-text-secondary">
                                {formData.rating > 0 ? `${formData.rating} / 5` : 'Select rating'}
                            </span>
                        </div>
                    </div>

                    {/* Review */}
                    <div>
                        <label className="block text-text-primary font-semibold mb-2">
                            Review
                        </label>
                        <textarea
                            value={formData.review}
                            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                            placeholder="Share your thoughts about this restaurant..."
                            className="input-field resize-none h-32"
                        />
                    </div>

                    {/* Visit Date */}
                    <div>
                        <label className="block text-text-primary font-semibold mb-2">
                            Visit Date
                        </label>
                        <input
                            type="date"
                            value={formData.visitDate}
                            onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                            className="input-field"
                            max={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isVisited}
                                onChange={(e) => setFormData({ ...formData, isVisited: e.target.checked })}
                                className="w-4 h-4 accent-accent-green"
                            />
                            <span className="text-text-primary">I have visited this restaurant</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isFavorite}
                                onChange={(e) => setFormData({ ...formData, isFavorite: e.target.checked })}
                                className="w-4 h-4 accent-accent-green"
                            />
                            <span className="text-text-primary">Add to favorites</span>
                        </label>

                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.wouldRecommend}
                                onChange={(e) => setFormData({ ...formData, wouldRecommend: e.target.checked })}
                                className="w-4 h-4 accent-accent-green"
                            />
                            <span className="text-text-primary">I would recommend this restaurant</span>
                        </label>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-text-primary font-semibold mb-2">
                            Tags
                        </label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            placeholder="e.g., date night, family, quick bite"
                            className="input-field"
                        />
                        <p className="text-text-secondary text-xs mt-1">Separate tags with commas</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading || formData.rating === 0}
                            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Saving...' : entry ? 'Update Entry' : 'Add Entry'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn-secondary"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DiaryEntryForm;
