import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllRestaurants } from '../api/restaurantApi';
import RestaurantGrid from '../components/restaurant/RestaurantGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FaSearch, FaUtensils, FaStar, FaCrown } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
    const { isAuthenticated, user } = useAuth();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadRestaurants();
    }, []);

    const loadRestaurants = async () => {
        try {
            setLoading(true);
            const data = await getAllRestaurants();
          
            const featured = data
                .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
                .slice(0, 8);
            setRestaurants(featured);
        } catch (err) {
            setError('Failed to load restaurants');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="relative bg-gradient-to-br from-secondary-bg to-primary-bg border-b border-border-color overflow-hidden">
                <div className="hero-orb" style={{
                    width: '420px', height: '420px',
                    background: 'radial-gradient(circle, rgba(0,192,48,0.25) 0%, transparent 70%)',
                    top: '-120px', left: '-100px',
                    '--dur': '6s', '--delay': '0s'
                }} />
                <div className="hero-orb" style={{
                    width: '320px', height: '320px',
                    background: 'radial-gradient(circle, rgba(255,128,0,0.2) 0%, transparent 70%)',
                    bottom: '-80px', right: '-60px',
                    '--dur': '8s', '--delay': '1.5s'
                }} />
                <div className="hero-orb" style={{
                    width: '200px', height: '200px',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
                    top: '40%', right: '20%',
                    '--dur': '7s', '--delay': '3s'
                }} />
                {[
                    { emoji: '🍕', x: '8%', y: '15%', size: '2rem', dur: '4.2s', delay: '0s' },
                    { emoji: '🍣', x: '88%', y: '10%', size: '1.8rem', dur: '5.5s', delay: '0.8s' },
                    { emoji: '🍔', x: '75%', y: '70%', size: '2.2rem', dur: '4.8s', delay: '1.5s' },
                    { emoji: '🌮', x: '15%', y: '75%', size: '1.6rem', dur: '6.1s', delay: '0.4s' },
                    { emoji: '🍜', x: '50%', y: '8%', size: '1.5rem', dur: '5.0s', delay: '2.2s' },
                    { emoji: '🥗', x: '92%', y: '45%', size: '1.7rem', dur: '4.5s', delay: '1.1s' },
                    { emoji: '🍰', x: '5%', y: '50%', size: '1.9rem', dur: '6.4s', delay: '3.0s' },
                    { emoji: '🍷', x: '65%', y: '88%', size: '1.6rem', dur: '5.2s', delay: '0.3s' },
                    { emoji: '🥩', x: '35%', y: '85%', size: '1.8rem', dur: '4.0s', delay: '2.7s' },
                    { emoji: '🍦', x: '80%', y: '28%', size: '1.5rem', dur: '7.0s', delay: '1.8s' },
                ].map(({ emoji, x, y, size, dur, delay }, i) => (
                    <div
                        key={i}
                        className="hero-particle"
                        style={{ '--x': x, '--y': y, '--size': size, '--dur': dur, '--delay': delay }}
                    >
                        {emoji}
                    </div>
                ))}

                <div className="relative z-10 container-custom py-20 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
                        Track Your <span className="text-accent-green">Culinary Journey</span>
                    </h1>
                    <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                        Discover restaurants, log your visits, rate your experiences, and build your personal food diary.
                    </p>

                    {!isAuthenticated ? (
                        <div className="flex items-center justify-center gap-4">
                            <Link to="/register" className="btn-primary text-lg px-8 py-3">
                                Get Started Free
                            </Link>
                            <Link to="/login" className="btn-outline text-lg px-8 py-3">
                                Sign In
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-4">
                            <Link to="/restaurants" className="btn-primary text-lg px-8 py-3">
                                <FaUtensils className="inline mr-2" />
                                Browse Restaurants
                            </Link>
                            <Link to="/search" className="btn-outline text-lg px-8 py-3">
                                <FaSearch className="inline mr-2" />
                                Search
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="container-custom py-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-text-primary mb-2">Featured Restaurants</h2>
                        <p className="text-text-secondary">Discover top-rated dining experiences</p>
                    </div>
                    <Link to="/restaurants" className="link font-semibold">
                        View All →
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md mb-6">
                        {error}
                    </div>
                )}

                <RestaurantGrid restaurants={restaurants} loading={loading} />
            </div>
            <div className="bg-secondary-bg py-16 border-t border-border-color">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
                        Why Food Diary?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    
                        <div className="card text-center group hover:-translate-y-1 transition-transform duration-300"
                            style={{ background: 'linear-gradient(135deg, rgba(0,192,48,0.08) 0%, rgba(0,192,48,0.02) 100%)', border: '1px solid rgba(0,192,48,0.2)' }}>
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl"
                                style={{ background: 'rgba(0,192,48,0.15)' }}>
                                📝
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">Log Your Visits</h3>
                            <p className="text-text-secondary">
                                Keep track of every restaurant you visit with detailed notes, ratings, and photos.
                            </p>
                        </div>

        
                        <div className="card text-center group hover:-translate-y-1 transition-transform duration-300"
                            style={{ background: 'linear-gradient(135deg, rgba(255,128,0,0.08) 0%, rgba(255,200,0,0.04) 100%)', border: '1px solid rgba(255,128,0,0.2)' }}>
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl"
                                style={{ background: 'rgba(255,128,0,0.15)' }}>
                                ⭐
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">Rate &amp; Review</h3>
                            <p className="text-text-secondary">
                                Share your honest opinions and help others discover great dining experiences.
                            </p>
                        </div>

                    
                        <div className="card text-center group hover:-translate-y-1 transition-transform duration-300"
                            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(168,85,247,0.05) 100%)', border: '1px solid rgba(99,102,241,0.2)' }}>
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl"
                                style={{ background: 'rgba(99,102,241,0.15)' }}>
                                📊
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">Track Your Stats</h3>
                            <p className="text-text-secondary">
                                See your dining patterns, favorite cuisines, and build your food timeline.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {isAuthenticated && !user?.isPro && (
                <div className="container-custom py-16">
                    <div className="card bg-gradient-to-r from-accent-orange/10 to-accent-green/10 border-accent-green">
                        <div className="text-center py-8">
                            <FaCrown className="text-5xl text-accent-orange mx-auto mb-4" />
                            <h2 className="text-3xl font-bold text-text-primary mb-4">
                                Upgrade to Pro
                            </h2>
                            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                                Get unlimited diary entries, advanced analytics, and exclusive features.
                            </p>
                            <Link to="/subscription" className="btn-primary text-lg px-8 py-3">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
