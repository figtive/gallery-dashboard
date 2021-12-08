<script lang="ts">
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import { STATIC_BASE_URL_KEY } from '$lib/constants';
  import type { Project } from 'src';

  export let projectId: string;
  let imageInput: FileList;
  let project: Project;
  onMount(() => {
    updateProject();
  });
  const updateProject = () => {
    api.coursework.project
      .getOne('', projectId)
      .then((res) => (project = res))
      .catch((err) => console.error(err));
  };
  const submitHandler = () => {
    const formData = new FormData();
    formData.append('id', projectId);
    formData.append('file', imageInput[0]);
    api.coursework.project
      .updateThumbnail(formData)
      .then(() => updateProject())
      .catch((err) => console.error(err));
  };
</script>

<div class="container">
  <form class="mb-3" on:submit|preventDefault={submitHandler}>
    <div class="mb-3">
      <label for="thumbnail" class="form-label">Thumbnail</label>
      <input
        class="form-control"
        type="file"
        accept="image/*"
        id="thumbnail"
        bind:files={imageInput}
      />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <ul class="list-group">
    {#if project}
      {#each project.thumbnail as thumbnail (thumbnail)}
        <li class="list-group-item">
          <img
            src={window.localStorage.getItem(STATIC_BASE_URL_KEY) + thumbnail}
            class="img-fluid"
            alt={thumbnail}
          />
        </li>
      {/each}
    {/if}
  </ul>
</div>
