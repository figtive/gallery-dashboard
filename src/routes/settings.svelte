<script lang="ts">
  import { onMount } from 'svelte';

  import { API_HOST_KEY, STATIC_BASE_URL_KEY } from '$lib/constants';

  let apiHost: string;
  let staticBaseUrl: string;
  let saving = false;
  onMount(() => {
    apiHost = window.localStorage.getItem(API_HOST_KEY);
    staticBaseUrl = window.localStorage.getItem(STATIC_BASE_URL_KEY);
  });

  const submitHandler = () => {
    saving = true;
    window.localStorage.setItem(API_HOST_KEY, apiHost);
    window.localStorage.setItem(STATIC_BASE_URL_KEY, staticBaseUrl);
    saving = false;
  };
</script>

<div class="container">
  <form on:submit|preventDefault={submitHandler}>
    <div class="mb-3">
      <label for="apiHost-input" class="form-label">API Host</label>
      <input
        type="text"
        id="apiHost-input"
        class="form-control"
        bind:value={apiHost}
        disabled={saving}
      />
    </div>
    <div class="mb-3">
      <label for="staticBaseUrl" class="form-label">Static File Base URL</label>
      <input
        type="text"
        id="staticBaseUrl"
        class="form-control"
        aria-describedby="staticBaseUrlHelp"
        bind:value={staticBaseUrl}
        disabled={saving}
      />
      <div id="staticBaseUrlHelp" class="form-text">Used for displaying static files</div>
    </div>
    <button type="submit" class="btn btn-primary" disabled={saving}>
      {#if saving}
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        Saving
      {:else}
        Save
      {/if}
    </button>
  </form>
</div>
