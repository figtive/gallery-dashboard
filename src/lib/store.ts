import { writable } from 'svelte/store';

import { API_HOST_KEY } from './constants';
import type { AuthStore } from 'src';

export const authStore = writable<AuthStore>({ isAuthenticated: false });

export const apiHostStore = writable<string>(localStorage.getItem(API_HOST_KEY));
apiHostStore.subscribe((host) => localStorage.setItem(API_HOST_KEY, host));
