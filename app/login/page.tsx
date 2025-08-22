'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    username: string;
  };
  message?: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        window.dispatchEvent(new Event('authChange'));
        
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black to-gray-900" >
      <div className="absolute inset-0 overflow-hidden">
        {[60, 80, 100, 120, 90, 70, 110, 85, 95, 75, 105, 65, 115, 125, 55].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/10"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
              animation: `float ${10 + (i % 5) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(-20px, 20px) rotate(180deg); }
          75% { transform: translate(-30px, -10px) rotate(270deg); }
        }
      `}</style>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Login to Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Or{' '}
            <Link href="/signin" className="font-medium text-cyan-400 hover:text-cyan-300 transition-all duration-200">
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cyan-400">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cyan-400">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-cyan-400 focus:ring-cyan-400 border border-gray-600 rounded"
              />
              <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300 transition-all duration-200">
                Forgot your password?
              </a>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-900/50 border border-red-500 p-4">
              <div className="text-sm text-red-400">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-cyan-400 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;