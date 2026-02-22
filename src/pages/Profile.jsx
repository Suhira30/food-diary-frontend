import { useState, useEffect } from 'react';
import { getUserProfile, getFilteredTimeline } from '../api/profileApi';
import { toggleFavorite as toggleFavoriteApi, deleteDiaryEntry as deleteDiaryEntryApi, updateDiaryEntry } from '../api/diaryApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DiaryEntryCard from '../components/diary/DiaryEntryCard';
import DiaryEntryForm from '../components/diary/DiaryEntryForm';
import { FaUser, FaStar, FaHeart, FaUtensils, FaCrown } from 'react-icons/fa';
import { FILTER_TYPES } from '../utils/constants';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeFilter, setActiveFilter] = useState(FILTER_TYPES.ALL);
    const [showEntryForm, setShowEntryForm] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    useEffect(() => {
        loadEntries();
    }, [activeFilter]);

    const loadProfile = async () => {
        try {
            const data = await getUserProfile();
            setProfile(data);
        } catch (err) {
            setError('Failed to load profile');
        }
    };

    const loadEntries = async () => {
        try {
            setLoading(true);
            const data = await getFilteredTimeline(activeFilter);
            setEntries(data);
        } catch (err) {
            setError('Failed to load entries');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleFavorite = async (entryId) => {
        try {
            await toggleFavoriteApi(entryId);
            await loadEntries();
            await loadProfile();
        } catch (err) {
            alert('Failed to toggle favorite');
        }
    };

    const handleEditEntry = (entry) => {
        setEditingEntry(entry);
        setShowEntryForm(true);
    };

    const handleDeleteEntry = async (entryId) => {
        if (!confirm('Are you sure you want to delete this entry?')) return;

        try {
            await deleteDiaryEntryApi(entryId);
            await loadEntries();
            await loadProfile();
        } catch (err) {
            alert('Failed to delete entry');
        }
    };

    const handleSubmitEntry = async (data) => {
        try {
            setFormLoading(true);
            await updateDiaryEntry(editingEntry.id, data);
            setShowEntryForm(false);
            setEditingEntry(null);
            await loadEntries();
            await loadProfile();
        } catch (err) {
            alert(err.message || 'Failed to update entry');
        } finally {
            setFormLoading(false);
        }
    };

    const filterButtons = [
        { type: FILTER_TYPES.ALL, label: 'All', icon: FaUtensils },
        { type: FILTER_TYPES.FAVORITES, label: 'Favorites', icon: FaHeart },
        { type: FILTER_TYPES.TOP_RATED, label: 'Top Rated', icon: FaStar },
        { type: FILTER_TYPES.VISITED, label: 'Visited', icon: FaUtensils },
    ];

    return (
        <div className="min-h-screen py-8">
            <div className="container-custom">
              
                {profile && (
                    <div className="card mb-8">
                        <div className="flex items-start gap-6">
                           
                            <div className="w-24 h-24 bg-accent-green rounded-full flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
                                {profile.name?.charAt(0).toUpperCase()}
                            </div>

                            
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-text-primary">
                                        {profile.name}
                                    </h1>
                                    {profile.isPro && (
                                        <div className="flex items-center gap-1 bg-accent-orange/20 text-accent-orange px-3 py-1 rounded-full text-sm font-semibold">
                                            <FaCrown />
                                            <span>PRO</span>
                                        </div>
                                    )}
                                </div>

                                <p className="text-text-secondary mb-4">{profile.email}</p>

                              
                                {profile.stats && (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                        <div className="bg-secondary-bg rounded p-3">
                                            <div className="text-2xl font-bold text-accent-green">
                                                {profile.stats.totalVisits || 0}
                                            </div>
                                            <div className="text-text-secondary text-sm">Total Visits</div>
                                        </div>
                                        <div className="bg-secondary-bg rounded p-3">
                                            <div className="text-2xl font-bold text-red-500">
                                                {profile.stats.totalFavorites || 0}
                                            </div>
                                            <div className="text-text-secondary text-sm">Favorites</div>
                                        </div>
                                        <div className="bg-secondary-bg rounded p-3">
                                            <div className="text-2xl font-bold text-accent-orange">
                                                {profile.stats.averageRating?.toFixed(1) || '0.0'}
                                            </div>
                                            <div className="text-text-secondary text-sm">Avg Rating</div>
                                        </div>
                                        <div className="bg-secondary-bg rounded p-3">
                                            <div className="text-2xl font-bold text-accent-blue">
                                                {profile.stats.totalReviews || 0}
                                            </div>
                                            <div className="text-text-secondary text-sm">Reviews</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <h2 className="text-2xl font-bold text-text-primary mb-6">My Timeline</h2>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {filterButtons.map(({ type, label, icon: Icon }) => (
                            <button
                                key={type}
                                onClick={() => setActiveFilter(type)}
                                className={`px-4 py-2 rounded-md font-semibold transition-all flex items-center gap-2 ${activeFilter === type
                                        ? 'bg-accent-green text-white'
                                        : 'bg-secondary-bg text-text-secondary hover:bg-hover-bg'
                                    }`}
                            >
                                <Icon />
                                {label}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <LoadingSpinner text="Loading entries..." />
                    ) : error ? (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md">
                            {error}
                        </div>
                    ) : entries.length === 0 ? (
                        <div className="card text-center py-12">
                            <p className="text-text-secondary">
                                No entries found. Start exploring restaurants!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {entries.map((entry) => (
                                <DiaryEntryCard
                                    key={entry.id}
                                    entry={entry}
                                    onToggleFavorite={handleToggleFavorite}
                                    onEdit={handleEditEntry}
                                    onDelete={handleDeleteEntry}
                                    showActions={true}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {showEntryForm && editingEntry && (
                <DiaryEntryForm
                    entry={editingEntry}
                    restaurantId={editingEntry.restaurantId}
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

export default Profile;
