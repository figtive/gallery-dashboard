<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import CourseForm from '$lib/components/forms/CourseForm.svelte';
  import FormHeader from '$lib/components/forms/FormHeader.svelte';

  let courseId = $page.query.get('id');
  onMount(() => {
    if (courseId === '') {
      goto('/course');
    }
  });
</script>

<div class="container">
  <FormHeader title="Update Course" />
</div>
<CourseForm {courseId} />
