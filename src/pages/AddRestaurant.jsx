import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRestaurant } from '../api/restaurantApi';
import { useAuth } from '../hooks/useAuth';
import { FaUtensils, FaCrown, FaArrowLeft, FaImage } from 'react-icons/fa';

const CUISINE_TYPES = [
    'Italian', 'Japanese', 'Chinese', 'Indian', 'Mexican',
    'American', 'French', 'Thai', 'Mediterranean', 'Korean',
    'Vietnamese', 'Greek', 'Spanish', 'Middle Eastern', 'Other'
];

const AddRestaurant = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        cuisine: '',
        imageUrl: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Redirect non-Pro users
    if (!user?.isPro) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="card text-center max-w-md">
                    <FaCrown className="text-5xl text-accent-orange mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-text-primary mb-2">
                        Pro Feature
                    </h2>
                    <p className="text-text-secondary mb-6">
                        Adding restaurants is exclusive to Pro members. Upgrade to unlock this feature and more!
                    </p>
                    <button
                        onClick={() => navigate('/subscription')}
                        className="btn-primary"
                    >
                        Upgrade to Pro
                    </button>
                </div>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim()) return setError('Restaurant name is required.');
        if (!formData.location.trim()) return setError('Location is required.');
        if (!formData.cuisine) return setError('Please select a cuisine type.');

        try {
            setLoading(true);
            setError('');
            const created = await createRestaurant(formData);
            setSuccess(true);
            // Navigate to the new restaurant's detail page after short delay
            setTimeout(() => {
                navigate(`/restaurant/${created.id}`);
            }, 1500);
        } catch (err) {
            setError(err.message || 'Failed to add restaurant. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-10">
            <div className="container-custom max-w-2xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <FaArrowLeft className="text-lg" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-3xl font-bold text-text-primary">Add Restaurant</h1>
                            <span className="flex items-center gap-1 bg-accent-orange/20 text-accent-orange text-xs font-bold px-2 py-1 rounded-full">
                                <FaCrown className="text-xs" /> PRO
                            </span>
                        </div>
                        <p className="text-text-secondary text-sm">
                            Share a great restaurant with the community
                        </p>
                    </div>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="bg-accent-green/10 border border-accent-green text-accent-green px-4 py-3 rounded-md mb-6 text-center font-semibold">
                        ✅ Restaurant added successfully! Redirecting...
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-md mb-6">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="card space-y-6">
                    {/* Restaurant Name */}
                    <div>
                        <label className="block text-text-primary font-semibold mb-2">
                            Restaurant Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., The Golden Fork"
                            className="input-field"
                            disabled={loading || success}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-text-primary font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Tell others what makes this restaurant special..."
                            rows={3}
                            className="input-field resize-none"
                            disabled={loading || success}
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-text-primary font-semibold mb-2">
                            Location <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g., 123 Main St, New York, NY"
                            className="input-field"
                            disabled={loading || success}
                        />
                    </div>

                    {/* Cuisine */}
                    <div>
                        <label className="block text-text-primary font-semibold mb-2">
                            Cuisine Type <span className="text-red-400">*</span>
                        </label>
                        <select
                            name="cuisine"
                            value={formData.cuisine}
                            onChange={handleChange}
                            className="input-field"
                            disabled={loading || success}
                        >
                            <option value="">Select cuisine type...</option>
                            {CUISINE_TYPES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-text-primary font-semibold mb-2">
                            <FaImage className="inline mr-2 text-text-secondary" />
                            Image URL <span className="text-text-secondary font-normal text-sm">(optional)</span>
                        </label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/restaurant-image.jpg"
                            className="input-field"
                            disabled={loading || success}
                        />
                        {/* Image preview */}
                        {formData.imageUrl && (
                            <div className="mt-3 w-full h-40 rounded-md overflow-hidden bg-secondary-bg">
                                <img
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 bg-secondary-bg text-text-secondary hover:bg-hover-bg hover:text-text-primary font-semibold py-2 px-6 rounded-md transition-all"
                            disabled={loading || success}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || success}
                            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Adding...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <FaUtensils />
                                    Add Restaurant
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRestaurant;
