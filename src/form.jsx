import React, { useState } from 'react';
import api from './api';
import { useNavigate, Link } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constans';
import { Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';

const AuthFormBasic = ({ route, method }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  const validate = () => {
    const newErrors = {};
    if (method !== 'login' && !formData.username) newErrors.username = 'Username is required';
    if (!formData.email && method !== 'login') newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (method !== 'login') {
      if (!formData.password_confirmation) newErrors.password_confirmation = 'Please confirm password';
      if (formData.password && formData.password_confirmation && formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = 'Passwords do not match';
      }
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    try {
      let payload;
      if (method === 'login') {
        payload = { username: formData.username.trim(), password: formData.password };
      } else {
        payload = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation
        };
      }

      const response = await api.post(route, payload);

      if (method === 'login') {
        if (response.data?.access) localStorage.setItem(ACCESS_TOKEN, response.data.access);
        if (response.data?.refresh) localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        navigate('/home');
      } else {
        navigate('/login');
      }
    } catch (error) {
      const respData = error.response?.data;
      if (respData && typeof respData === 'object') {
        const mapped = Object.keys(respData).reduce((acc, key) => {
          const val = respData[key];
          acc[key] = Array.isArray(val) ? val.join(' ') : String(val);
          return acc;
        }, {});
        setErrors(mapped);
      } else {
        setErrors({ non_field_errors: error.message || 'Request failed' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Decorative Blobs */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-lime-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-lime-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-500 rounded-full opacity-5 blur-3xl"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-black/40 backdrop-blur-md border border-lime-500/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-500/20 border border-lime-500/30 rounded-full mb-4">
              {method === 'login' ? (
                <LogIn className="text-lime-400" size={32} />
              ) : (
                <UserPlus className="text-lime-400" size={32} />
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {method === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-400 text-sm">
              {method === 'login' 
                ? 'Sign in to access your account' 
                : 'Sign up to get started'}
            </p>
          </div>

          <div className="space-y-5">
            {method !== 'login' && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <User className="inline mr-1" size={16} />
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none text-white placeholder-gray-500 transition-all"
                />
                {errors.username && (
                  <p className="text-sm text-red-400 mt-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.username}
                  </p>
                )}
              </div>
            )}

            {/* Username for Login / Email for Register */}
            {method === 'login' ? (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <User className="inline mr-1" size={16} />
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none text-white placeholder-gray-500 transition-all"
                />
                {errors.username && (
                  <p className="text-sm text-red-400 mt-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.username}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <Mail className="inline mr-1" size={16} />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none text-white placeholder-gray-500 transition-all"
                />
                {errors.email && (
                  <p className="text-sm text-red-400 mt-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.email}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                <Lock className="inline mr-1" size={16} />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none text-white placeholder-gray-500 transition-all"
              />
              {errors.password && (
                <p className="text-sm text-red-400 mt-1.5 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                  {errors.password}
                </p>
              )}
            </div>

            {method !== 'login' && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <Lock className="inline mr-1" size={16} />
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none text-white placeholder-gray-500 transition-all"
                />
                {errors.password_confirmation && (
                  <p className="text-sm text-red-400 mt-1.5 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.password_confirmation}
                  </p>
                )}
              </div>
            )}

            {errors.non_field_errors && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <p className="text-sm text-red-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                  {errors.non_field_errors}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-lime-500 hover:bg-lime-600 text-black font-semibold py-3.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{boxShadow: '0 0 25px rgba(132, 204, 22, 0.4)'}}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                  Processing...
                </span>
              ) : (
                method === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {method === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="text-lime-400 cursor-pointer hover:text-lime-300 font-medium transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-lime-400 cursor-pointer hover:text-lime-300 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-lime-500 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default AuthFormBasic;