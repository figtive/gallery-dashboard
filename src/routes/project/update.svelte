<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import FormHeader from '$lib/components/forms/FormHeader.svelte';
  import ProjectForm from '$lib/components/forms/ProjectForm.svelte';
  import ProjectThumbnailForm from '$lib/components/forms/ProjectThumbnailForm.svelte';

  let projectId = $page.query.get('id');
  onMount(() => {
    if (projectId === null) {
      goto('/project');
    }
  });
  const deleteHandler = () => {
    api.coursework.project
      .delete('', projectId)
      .then(() => goto('/project'))
      .catch((err) => console.error(err));
  };
</script>

<div class="container mb-3">
  <FormHeader title="Update Project" />
  <button class="btn btn-danger" on:click={deleteHandler}>Delete</button>
</div>
<div class="mb-3">
  <ProjectForm {projectId} />
</div>
<div class="mb-3">
  <ProjectThumbnailForm {projectId} />
</div>
