<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import FormHeader from '$lib/components/forms/FormHeader.svelte';
  import DeleteConfirmationModal from '$lib/components/forms/DeleteConfirmationModal.svelte';
  import ProjectForm from '$lib/components/forms/ProjectForm.svelte';

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
  <button
    type="button"
    class="btn btn-danger"
    data-bs-toggle="modal"
    data-bs-target="#deleteConfirmationModal"
  >
    Delete
  </button>
</div>
<ProjectForm {projectId} />
<DeleteConfirmationModal onConfirm={deleteHandler} />
