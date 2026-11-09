'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AppPage() {
  const router = useRouter();

  useEffect(() => {
    const search = typeof window !== 'undefined' ? window.location.search : '';
    router.replace('/painel' + search);
  }, [router]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0b141a', color: '#94a3b8', fontFamily: 'sans-serif' }}>
      Redirecionando para o Painel do Gabinete...
    </div>
  );
}
