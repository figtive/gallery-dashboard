<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import CourseForm from '$lib/components/forms/CourseForm.svelte';
  import DeleteConfirmationModal from '$lib/components/forms/DeleteConfirmationModal.svelte';
  import FormHeader from '$lib/components/forms/FormHeader.svelte';

  let courseId = $page.query.get('id');
  onMount(() => {
    if (courseId === '') {
      goto('/course');
    }
  });
  const deleteHandler = () => {
    api.course
      .delete(courseId)
      .then(() => goto('/course'))
      .catch((err) => console.error(err));
  };
</script>

<div class="container mb-3">
  <FormHeader title="Update Course" />
  <button
    type="button"
    class="btn btn-danger"
    data-bs-toggle="modal"
    data-bs-target="#deleteConfirmationModal"
  >
    Delete
  </button>
</div>
<CourseForm {courseId} />
<DeleteConfirmationModal onConfirm={deleteHandler} />
