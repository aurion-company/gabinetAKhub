'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const search = typeof window !== 'undefined' ? window.location.search : '';
    router.replace('/acessar' + search);
  }, [router]);

  return null;
}
