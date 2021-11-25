<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  import BlogForm from '$lib/components/forms/BlogForm.svelte';
  import FormHeader from '$lib/components/forms/FormHeader.svelte';

  let blogId = $page.query.get('id');
  onMount(() => {
    if (blogId === '') {
      goto('/blog');
    }
  });
</script>

<div class="container">
  <FormHeader title="Update Blog" />
</div>
<BlogForm {blogId} />
