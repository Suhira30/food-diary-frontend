import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaUtensils, FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login({ email, password });
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to login. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
<<<<<<< HEAD
                {/* Logo & Title */}
=======
            
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
                <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        <FaUtensils className="text-5xl text-accent-green" />
                    </div>
                    <h2 className="text-3xl font-bold text-text-primary">Welcome Back</h2>
                    <p className="mt-2 text-text-secondary">Sign in to your Food Diary account</p>
                </div>

<<<<<<< HEAD
                {/* Login Form */}
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
<<<<<<< HEAD
                        {/* Email */}
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-text-secondary" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="Email address"
                                />
                            </div>
                        </div>
<<<<<<< HEAD

                        {/* Password */}
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-text-secondary" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                    </div>
<<<<<<< HEAD

                    {/* Submit Button */}
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
<<<<<<< HEAD

                    {/* Register Link */}
=======
>>>>>>> eac0e33edc14c6d0b6d783327c2163b68a430b21
                    <div className="text-center">
                        <p className="text-text-secondary">
                            Don't have an account?{' '}
                            <Link to="/register" className="link font-semibold">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
