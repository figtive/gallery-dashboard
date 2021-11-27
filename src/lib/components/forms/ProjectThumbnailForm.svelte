<script lang="ts">
  import api from '$lib/api';

  import type { Project } from 'src';
  import { onMount } from 'svelte';

  export let projectId: string;
  let imageInput: FileList;
  let project: Project;
  onMount(() => {
    api.coursework.project
      .getOne('', projectId)
      .then((res) => (project = res))
      .catch((err) => console.error(err));
  });
  const submitHandler = () => {
    const formData = new FormData();
    formData.append('id', projectId);
    formData.append('file', imageInput[0]);
    api.coursework.project.updateThumbnail(formData);
  };
</script>

<div class="container">
  <form on:submit|preventDefault={submitHandler}>
    <div class="mb-3">
      <label for="thumbnail" class="form-label">Thumbnail</label>
      <input class="form-control" type="file" id="thumbnail" bind:files={imageInput} />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
