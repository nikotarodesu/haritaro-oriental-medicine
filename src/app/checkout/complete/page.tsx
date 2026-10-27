import type { Metadata } from 'next';
import CheckoutComplete from './CheckoutComplete';

export const metadata: Metadata = {
  title: 'お申し込みの確認',
  description: 'お支払いと会員サービスへの反映を確認します。',
  robots: { index: false, follow: false },
  alternates: { canonical: '/checkout/complete' },
};
export default function Page() { return <CheckoutComplete />; }
