import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to log in');
        }
    };

    return (
        // 1. Background color changed to "smoke white" (bg-gray-100)
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            
            {/* 2. Login box changed to black, with rounded corners and a shadow */}
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-6">
                
                {/* 3. All text inside is now light */}
                <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>
                
                {error && <p className="bg-red-900 bg-opacity-50 text-red-300 p-3 rounded-md text-center">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
                        {/* 4. Input fields are now dark with light text */}
                        <input
                            type="email" id="email" autoComplete="email" required
                            className="mt-1 block w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="you@example.com"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password"  className="text-sm font-medium text-gray-400">Password</label>
                        <input
                            type="password" id="password" autoComplete="current-password" required
                            className="mt-1 block w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="••••••••"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-primary">
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-primary hover:text-primary-dark hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};
export default LoginPage;