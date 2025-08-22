'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


interface SigninFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SigninResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    username: string;
  };
  message?: string;
}

const SigninPage = () => {
  const [formData, setFormData] = useState<SigninFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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

  const validateForm = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data: SigninResponse = await response.json();


      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        window.dispatchEvent(new Event('authChange'));
        
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 z-content">
      <div className="absolute inset-0 bg-cyber-gradient">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        <div className="absolute inset-0 overflow-hidden">
          {[60, 80, 100, 120, 90, 70, 110, 85, 95, 75, 105, 65, 115, 125, 55].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-electric-blue/10 glow-blue"
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
        <div className="glass-effect-strong rounded-2xl p-8 shadow-neon">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-readable text-glow">
            Create Gaming Account
          </h2>
          <p className="mt-2 text-center text-sm text-readable-secondary">
            Or{' '}
            <Link href="/login" className="font-medium text-electric-blue hover:text-glow transition-all duration-200">
              sign in to existing account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6 glass-effect-strong rounded-2xl p-8 shadow-neon" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-electric-blue">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="mt-1 input-cyber appearance-none relative block w-full px-3 py-2 rounded-md focus:z-10 sm:text-sm"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-electric-blue">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 input-cyber appearance-none relative block w-full px-3 py-2 rounded-md focus:z-10 sm:text-sm"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-electric-blue">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 input-cyber appearance-none relative block w-full px-3 py-2 rounded-md focus:z-10 sm:text-sm"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-electric-blue">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 input-cyber appearance-none relative block w-full px-3 py-2 rounded-md focus:z-10 sm:text-sm"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-blue-50 p-4 border border-electric-blue/30 shadow-neon">
              <div className="text-sm text-electric-blue">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed shadow-glow-blue"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <div className="text-xs text-electric-blue text-center">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-blue-300 hover:text-electric-blue">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-300 hover:text-blue-400">Privacy Policy</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;