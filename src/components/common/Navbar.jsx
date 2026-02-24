import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaHome, FaSearch, FaUser, FaUtensils, FaCrown, FaSignOutAlt, FaBook, FaPlus } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-secondary-bg border-b border-border-color sticky top-0 z-50">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
<<<<<<< HEAD
                    {/* Logo */}
=======
            
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
                    <Link to="/" className="flex items-center space-x-2 group">
                        <FaUtensils className="text-2xl text-accent-green group-hover:text-green-400 transition-colors" />
                        <span className="text-xl font-bold text-text-primary">Food Diary</span>
                    </Link>

<<<<<<< HEAD
                    {/* Navigation Links — hidden on auth pages */}
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
                    {!isAuthPage && (
                        <div className="hidden md:flex items-center space-x-6">
                            <Link
                                to="/"
                                className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors"
                            >
                                <FaHome />
                                <span>Home</span>
                            </Link>
                            <Link
                                to="/restaurants"
                                className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors"
                            >
                                <FaUtensils />
                                <span>Restaurants</span>
                            </Link>
                            <Link
                                to="/search"
                                className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors"
                            >
                                <FaSearch />
                                <span>Search</span>
                            </Link>
                            {isAuthenticated && (
                                <Link
                                    to="/profile"
                                    className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors"
                                >
                                    <FaBook />
                                    <span>My Diary</span>
                                </Link>
                            )}
                            {isAuthenticated && user?.isPro && (
                                <Link
                                    to="/add-restaurant"
                                    className="flex items-center space-x-1 bg-accent-orange/10 text-accent-orange hover:bg-accent-orange/20 px-3 py-1 rounded-md transition-colors border border-accent-orange/30"
                                >
                                    <FaPlus />
                                    <span>Add Restaurant</span>
                                    <FaCrown className="text-xs ml-1" />
                                </Link>
                            )}
                        </div>
                    )}

<<<<<<< HEAD
                    {/* User Menu — hidden on auth pages */}
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
                    {!isAuthPage && <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-hover-bg transition-colors"
                                >
                                    <FaUser className="text-accent-green" />
                                    <span className="text-text-primary">{user?.name}</span>
                                    {user?.isPro && (
                                        <FaCrown className="text-accent-orange" title="Pro Member" />
                                    )}
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-card-bg border border-border-color rounded-md shadow-lg py-1">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-text-secondary hover:bg-hover-bg hover:text-text-primary transition-colors"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <FaUser className="inline mr-2" />
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-text-secondary hover:bg-hover-bg hover:text-text-primary transition-colors"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <FaBook className="inline mr-2" />
                                            My Diary
                                        </Link>
                                        {user?.isPro && (
                                            <Link
                                                to="/add-restaurant"
                                                className="block px-4 py-2 text-accent-orange hover:bg-hover-bg transition-colors"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <FaPlus className="inline mr-2" />
                                                <FaCrown className="inline mr-1 text-xs" />
                                                Add Restaurant
                                            </Link>
                                        )}
                                        <Link
                                            to="/subscription"
                                            className="block px-4 py-2 text-text-secondary hover:bg-hover-bg hover:text-text-primary transition-colors"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <FaCrown className="inline mr-2" />
                                            Subscription
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-text-secondary hover:bg-hover-bg hover:text-text-primary transition-colors"
                                        >
                                            <FaSignOutAlt className="inline mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login" className="text-text-secondary hover:text-text-primary transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
