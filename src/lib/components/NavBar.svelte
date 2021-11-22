<script lang="ts">
  import { onMount } from 'svelte';

  import { auth } from '$lib/api';
  import { login, logout } from '$lib/auth';
  import { JWT_KEY } from '$lib/constants';
  import { authStore } from '$lib/store';
  import type { GoogleAuthResponse } from 'src';

  const renderGoogleSignIn = () => {
    // @ts-ignore
    google.accounts.id.renderButton(document.getElementById('google-signin'), {
      theme: 'outline',
      shape: 'pill',
      size: 'large',
    });
    // @ts-ignore
    google.accounts.id.prompt();
  };

  onMount(() => {
    const localJwt = localStorage.getItem(JWT_KEY);
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: (response: GoogleAuthResponse) => {
        auth
          .login(response.credential)
          .then(() => {
            login(response.credential);
          })
          .catch(() => {
            console.error('failed to sign in');
            logout();
          });
      },
    });
    if (localJwt) {
      auth
        .login(localJwt)
        .then(() => {
          login(localJwt);
        })
        .catch(() => {
          renderGoogleSignIn();
        });
    } else {
      renderGoogleSignIn();
    }
  });
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Admin Dashboard</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navs"
      aria-controls="navs"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navs">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/settings">Settings</a>
        </li>
      </ul>
      <div id="google-signin" class:hidden={$authStore.isAuthenticated} />
    </div>
  </div>
</nav>

<style>
  .hidden {
    display: none;
  }
</style>
