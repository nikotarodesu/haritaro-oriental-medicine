'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useClinicalMemo } from '@/contexts/ClinicalMemoContext';

const Drawer = dynamic(() => import('./MyClinicalRecordDrawer'));

export default function DeferredClinicalDrawer() {
  const { isDrawerOpen } = useClinicalMemo();
  const [hasOpened, setHasOpened] = useState(false);
  // Remember the first request so closing the drawer does not unmount its
  // unsaved form. The guarded update only adjusts this component's state.
  if (isDrawerOpen && !hasOpened) setHasOpened(true);
  return hasOpened ? <Drawer /> : null;
}
