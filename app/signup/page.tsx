'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/signin');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto"></div>
        <p className="mt-4 text-cyan-300">Redirecting to sign up page...</p>
      </div>
    </div>
  );
};

export default SignupPage;