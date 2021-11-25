<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import BlogForm from '$lib/components/forms/BlogForm.svelte';

  let blogId = $page.query.get('id');
  onMount(() => {
    if (blogId === '') {
      goto('/blog');
    }
  });
</script>

<BlogForm {blogId} />
