import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

const API_BASE_URL = 'http://localhost:8080/v1/food-diary';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password
      });

      console.log('Full Axios response:', response);
      console.log('Response data:', response.data);

      // Access token from response.data.token
      const token = response.data.token;
      const message = response.data.message;

      setSuccess(message);
      localStorage.setItem('authToken', token);
      console.log('Login successful:', response.data);
      
      // Reset form and redirect
      resetForm();
    } catch (err) {
      // Handle both error message formats
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name,
        email,
        password
      });

      const message = response.data.message;
      setSuccess(message);
      console.log('Registration successful:', response.data);
      
      // Reset form and switch to login
      resetForm();
      setTimeout(() => {
        setIsLogin(true);
        setSuccess('');
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  return (
    <div className="auth-container">
      {/* Animated Bubbles Background */}
      <div className="bubble bubble-1"></div>
      <div className="bubble bubble-2"></div>
      <div className="bubble bubble-3"></div>
      <div className="bubble bubble-4"></div>
      <div className="bubble bubble-5"></div>
      <div className="bubble bubble-6"></div>

      {/* Left Side - Form/Animation */}
      <div className={`auth-side ${isLogin ? 'form-side' : 'animation-side'}`}>
        {isLogin ? (
          <div className="form-wrapper">
            <form className="auth-form login-form" onSubmit={handleLoginSubmit}>
              <div className="form-header">
                <h1>Welcome Back 👋</h1>
                <p>Sign in to explore amazing food corners</p>
              </div>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="form-group">
                <label htmlFor="login-email">Email Address</label>
                <input
                  type="email"
                  id="login-email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <a href="#" className="forgot-password">Forgot password?</a>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span> Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="form-divider">or continue with</div>

              <div className="social-buttons">
                <button type="button" className="social-btn">
                  <span>🔍</span>
                </button>
                <button type="button" className="social-btn">
                  <span>✨</span>
                </button>
              </div>

              <p className="form-toggle">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => {
                    setIsLogin(false);
                    resetForm();
                    setError('');
                    setSuccess('');
                  }}
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        ) : (
          <div className="animation-container">
            <div className="animation-content login-animation">
              <div className="floating-item food-1">🍕</div>
              <div className="floating-item food-2">🍔</div>
              <div className="floating-item food-3">🍜</div>
              <div className="floating-item food-4">🍣</div>
              <div className="floating-item food-5">🥗</div>
              <div className="floating-item food-6">🍰</div>
              
              <div className="center-content">
                <h2>FoodDiary</h2>
                <p>Discover & Share</p>
                <p className="subtitle">Your Ultimate Food Story</p>
              </div>

              <div className="glow-effect"></div>
            </div>
          </div>
        )}
      </div>

      {/* Right Side - Animation/Form */}
      <div className={`auth-side ${isLogin ? 'animation-side' : 'form-side'}`}>
        {isLogin ? (
          <div className="animation-container">
            <div className="animation-content login-animation">
              <div className="floating-item food-1">🍕</div>
              <div className="floating-item food-2">🍔</div>
              <div className="floating-item food-3">🍜</div>
              <div className="floating-item food-4">🍣</div>
              <div className="floating-item food-5">🥗</div>
              <div className="floating-item food-6">🍰</div>
              
              <div className="center-content">
                <h2>FoodDiary</h2>
                <p>Discover & Share</p>
                <p className="subtitle">Your Ultimate Food Story</p>
              </div>

              <div className="glow-effect"></div>
            </div>
          </div>
        ) : (
          <div className="form-wrapper">
            <form className="auth-form register-form" onSubmit={handleRegisterSubmit}>
              <div className="form-header">
                <h1>Join Us 🎉</h1>
                <p>Create your food diary account today</p>
              </div>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="form-group">
                <label htmlFor="register-name">Full Name</label>
                <input
                  type="text"
                  id="register-name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-email">Email Address</label>
                <input
                  type="email"
                  id="register-email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-password">Password</label>
                <input
                  type="password"
                  id="register-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-confirm">Confirm Password</label>
                <input
                  type="password"
                  id="register-confirm"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span> Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>

              <div className="form-divider">or continue with</div>

              <div className="social-buttons">
                <button type="button" className="social-btn">
                  <span>🔍</span>
                </button>
                <button type="button" className="social-btn">
                  <span>✨</span>
                </button>
              </div>

              <p className="form-toggle">
                Already have an account?{' '}
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => {
                    setIsLogin(true);
                    resetForm();
                    setError('');
                    setSuccess('');
                  }}
                >
                  Sign in
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}