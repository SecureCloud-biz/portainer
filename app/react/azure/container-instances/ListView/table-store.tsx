import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

import { keyBuilder } from '@/portainer/hooks/useLocalStorage';

import { paginationSettings, sortableSettings } from '@@/datatables/types';

import { TableSettings } from './types';

/**
 * use for default nested table store
 */

export function createStoreHook(storageKey: string) {
  return createStore<TableSettings>()(
    persist(
      (set) => ({
        ...sortableSettings(set, 'state'),
        ...paginationSettings(set),
      }),
      {
        name: keyBuilder(storageKey),
      }
    )
  );
}
