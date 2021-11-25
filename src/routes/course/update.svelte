<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import CourseForm from '$lib/components/forms/CourseForm.svelte';

  let courseId = $page.query.get('id');
  onMount(() => {
    if (courseId === '') {
      goto('/course');
    }
  });
</script>

<CourseForm {courseId} />
