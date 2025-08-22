"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loading from './Loading';

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <Loading message="Loading..." />
        </div>
      )}
      <div className={loading ? 'opacity-50 transition-opacity duration-300' : 'opacity-100 transition-opacity duration-300'}>
        {children}
      </div>
    </>
  );
}