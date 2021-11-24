<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import ProjectForm from '$lib/components/forms/ProjectForm.svelte';

  let projectId = $page.query.get('id');
  onMount(() => {
    if (projectId === null) {
      goto('/project');
    }
  });
</script>

<ProjectForm {projectId} />
