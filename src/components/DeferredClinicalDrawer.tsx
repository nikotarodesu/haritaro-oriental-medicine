'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useClinicalMemo } from '@/contexts/ClinicalMemoContext';

const Drawer = dynamic(() => import('./MyClinicalRecordDrawer'));

export default function DeferredClinicalDrawer() {
  const { isDrawerOpen } = useClinicalMemo();
  const [hasOpened, setHasOpened] = useState(false);
  // Load the quick view on first use and keep the lightweight module mounted.
  // The guarded update only adjusts this component's state.
  if (isDrawerOpen && !hasOpened) setHasOpened(true);
  return hasOpened ? <Drawer /> : null;
}
