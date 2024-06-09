'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';

import {
  type PageBuilderStore,
  createPageBuilderStore,
  initPageBuilderStore,
} from '@/store/pagebuilder-store';

export const PageBuilderStoreContext =
  createContext<StoreApi<PageBuilderStore> | null>(null);

export interface PageBuilderStoreProviderProps {
  children: ReactNode;
}

export const PageBuilderStoreProvider = ({
  children,
}: PageBuilderStoreProviderProps) => {
  const storeRef = useRef<StoreApi<PageBuilderStore>>();
  if (!storeRef.current) {
    storeRef.current = createPageBuilderStore(initPageBuilderStore());
  }

  return (
    <PageBuilderStoreContext.Provider value={storeRef.current}>
      {children}
    </PageBuilderStoreContext.Provider>
  );
};

export const usePageBuilderStore = <T,>(
  selector: (store: PageBuilderStore) => T
): T => {
  const pageBuilderStore = useContext(PageBuilderStoreContext);

  if (!pageBuilderStore) {
    throw new Error(
      `usePageBuilderStore must be use within PageBuilderStoreProvider`
    );
  }

  return useStore(pageBuilderStore, selector);
};
