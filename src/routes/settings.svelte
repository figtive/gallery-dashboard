<script lang="ts">
  import { onMount } from 'svelte';

  import { API_HOST_KEY } from '$lib/constants';

  let apiHost: string;
  let saving = false;
  onMount(() => {
    apiHost = window.localStorage.getItem(API_HOST_KEY);
  });

  const submitHandler = () => {
    saving = true;
    window.localStorage.setItem(API_HOST_KEY, apiHost);
    saving = false;
  };
</script>

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
  <button type="submit" class="btn btn-primary" disabled={saving}>
    {#if saving}
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
      Saving
    {:else}
      Save
    {/if}
  </button>
</form>
