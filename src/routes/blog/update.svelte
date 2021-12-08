<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import BlogForm from '$lib/components/forms/BlogForm.svelte';
  import DeleteConfirmationModal from '$lib/components/forms/DeleteConfirmationModal.svelte';
  import FormHeader from '$lib/components/forms/FormHeader.svelte';

  let blogId = $page.query.get('id');
  onMount(() => {
    if (blogId === '') {
      goto('/blog');
    }
  });
  const deleteHandler = () => {
    api.coursework.blog
      .delete('', blogId)
      .then(() => goto('/blog'))
      .catch((err) => console.error(err));
  };
</script>

<div class="container mb-3">
  <FormHeader title="Update Blog" />
  <button
    type="button"
    class="btn btn-danger"
    data-bs-toggle="modal"
    data-bs-target="#deleteConfirmationModal"
  >
    Delete
  </button>
</div>
<BlogForm {blogId} />
<DeleteConfirmationModal onConfirm={deleteHandler} />
