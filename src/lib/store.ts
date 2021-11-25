import { writable } from 'svelte/store';

import type { AuthStore } from 'src';

export const authStore = writable<AuthStore>({ isAuthenticated: false });

export const apiHostStore = writable<string>('');
