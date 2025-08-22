'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Settings, Trophy, Gamepad2, Zap } from 'lucide-react';

interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  isActive: boolean;
  role: string;
  emailVerified: boolean;
}

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authChange'));
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-gradient">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-electric-blue/30 shadow-neon glow-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-gradient">
        <div className="text-center glass-effect-strong p-8 rounded-2xl shadow-neon">
          <div className="text-red-400 text-xl mb-4 font-bold">Error: {error}</div>
          <Link href="/login" className="text-electric-blue hover:text-glow font-medium transition-all duration-200">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-gradient">
        <div className="text-center glass-effect-strong p-8 rounded-2xl shadow-neon">
          <div className="text-electric-blue text-xl mb-4 font-bold">User not found</div>
          <Link href="/login" className="text-electric-blue hover:text-glow font-medium transition-all duration-200">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-gradient">
      <nav className="glass-effect-strong border-b border-electric-blue/40 z-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Gamepad2 className="w-8 h-8 text-electric-blue mr-3" />
              <h1 className="text-xl font-bold bg-blue-gradient bg-clip-text text-transparent text-white">Gaming Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-readable font-medium">Welcome, {user.username}!</span>
              <button
                onClick={handleLogout}
                className="btn-primary px-4 py-2 rounded-lg text-sm font-medium shadow-glow-blue transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* User Profile Card */}
            <div className="glass-effect-strong overflow-hidden shadow-neon rounded-2xl border border-electric-blue/30">
              <div className="px-6 py-6">
                <div className="flex items-center mb-4">
                  <User className="w-6 h-6 text-electric-blue mr-2" />
                  <h3 className="text-lg leading-6 font-bold text-electric-blue">
                    Profile Info
                  </h3>
                </div>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-readable-secondary">Username</dt>
                    <dd className="text-sm text-readable font-medium">{user.username}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-readable-secondary">Email</dt>
                    <dd className="text-sm text-readable font-medium">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-readable-secondary">Role</dt>
                    <dd className="text-sm text-readable font-medium">{user.role === 'user' ? 'Gamer' : user.role}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-readable-secondary">Status</dt>
                    <dd className="text-sm">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        user.isActive 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-readable-secondary">Email Verified</dt>
                    <dd className="text-sm">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        user.emailVerified 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {user.emailVerified ? 'Verified' : 'Pending'}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-readable-secondary">Member Since</dt>
                    <dd className="text-sm text-readable font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="glass-effect-strong overflow-hidden shadow-neon rounded-2xl border border-electric-blue/30">
              <div className="px-6 py-6">
                <div className="flex items-center mb-4">
                  <Settings className="w-6 h-6 text-electric-blue mr-2" />
                  <h3 className="text-lg leading-6 font-bold text-electric-blue">
                    Quick Actions
                  </h3>
                </div>
                <div className="space-y-3">
                  <button className="w-full btn-primary py-3 px-4 rounded-lg text-sm font-medium shadow-glow-blue transition-all duration-200 hover:scale-105">
                    Edit Profile
                  </button>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg text-sm font-medium shadow-lg transition-all duration-200 hover:scale-105">
                    Change Password
                  </button>
                  <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white py-3 px-4 rounded-lg text-sm font-medium shadow-lg transition-all duration-200 hover:scale-105">
                    Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Gaming Stats Card */}
            <div className="glass-effect-strong overflow-hidden shadow-neon rounded-2xl border border-electric-blue/30">
              <div className="px-6 py-6">
                <div className="flex items-center mb-4">
                  <Trophy className="w-6 h-6 text-electric-blue mr-2" />
                  <h3 className="text-lg leading-6 font-bold text-electric-blue">
                    Gaming Stats
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-readable-secondary font-medium">Account ID</span>
                    <span className="text-sm text-readable font-mono bg-gray-800/50 px-2 py-1 rounded border border-electric-blue/20">
                      {user.id.slice(-8)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-readable-secondary font-medium">Login Sessions</span>
                    <span className="text-sm text-electric-blue font-bold">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-readable-secondary font-medium">Last Login</span>
                    <span className="text-sm text-electric-blue font-bold">Today</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-readable-secondary font-medium">Games Owned</span>
                    <span className="text-sm text-electric-blue font-bold">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mt-6 sm:mt-8 glass-effect-strong shadow-neon rounded-2xl border border-electric-blue/30">
            <div className="px-4 py-4 sm:px-6 sm:py-6">
              <div className="flex items-center mb-3">
                <Zap className="w-6 h-6 text-electric-blue mr-2" />
                <h3 className="text-lg leading-6 font-bold text-electric-blue">
                  Welcome to Your Gaming Dashboard!
                </h3>
              </div>
              <p className="text-sm text-readable-secondary leading-relaxed">
                You have successfully logged into your gaming account. This dashboard is protected and requires authentication.
                You now have access to all features available in your account. Start exploring the gaming universe!
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/products" className="btn-primary px-4 py-2 rounded-lg text-sm font-medium shadow-glow-blue transition-all duration-200 text-center">
                  Browse Games
                </Link>
                <Link href="/blog" className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-all duration-200 text-center">
                  Gaming News
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;