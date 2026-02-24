import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetail from './pages/RestaurantDetail';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Subscription from './pages/Subscription';
import AddRestaurant from './pages/AddRestaurant';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Protected Routes */}
                            <Route
                                path="/restaurants"
                                element={
                                    <ProtectedRoute>
                                        <RestaurantList />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/restaurant/:id"
                                element={
                                    <ProtectedRoute>
                                        <RestaurantDetail />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/search"
                                element={
                                    <ProtectedRoute>
                                        <Search />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/subscription"
                                element={
                                    <ProtectedRoute>
                                        <Subscription />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/add-restaurant"
                                element={
                                    <ProtectedRoute>
                                        <AddRestaurant />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Catch all - redirect to home */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
