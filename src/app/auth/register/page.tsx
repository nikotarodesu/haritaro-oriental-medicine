import { Suspense } from 'react';
import type { Metadata } from 'next';
import GoogleAuthForm from '@/components/auth/GoogleAuthForm';
export const metadata: Metadata = { title: 'Googleで無料会員登録', robots: { index: false, follow: true } };
export default function Page() { return <Suspense fallback={<p className="p-8 text-center">ログイン画面を準備しています...</p>}><GoogleAuthForm mode="register" /></Suspense>; }
