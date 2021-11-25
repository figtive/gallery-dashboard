<script lang="ts">
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import { login, logout } from '$lib/auth';
  import { API_HOST_KEY, JWT_KEY } from '$lib/constants';
  import { apiHostStore, authStore } from '$lib/store';
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
        api.auth
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
      api.auth
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
    apiHostStore.set(localStorage.getItem(API_HOST_KEY));
  });
  const logoutHandler = () => {
    logout();
    window.location.reload();
  };
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
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle active"
            href="/"
            id="tableDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Tables
          </a>
          <ul class="dropdown-menu" aria-labelledby="tableDropdown">
            <li><a class="dropdown-item" href="/course">Course</a></li>
            <li><a class="dropdown-item" href="/project">Project</a></li>
            <li><a class="dropdown-item" href="/blog">Blog</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/settings">Settings</a>
        </li>
      </ul>
      <div id="google-signin" class:hidden={$authStore.isAuthenticated} />
      {#if $authStore.isAuthenticated}
        <button class="btn btn-danger" on:click={logoutHandler}>Logout</button>
      {/if}
    </div>
  </div>
</nav>

<style>
  .hidden {
    display: none;
  }
</style>
