<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import GenericTable from '$lib/components/GenericTable.svelte';
  import util from '$lib/util';
  import type { Blog } from 'src';

  let blogs: Blog[] = [];
  onMount(() => {
    api.coursework.blog
      .getAll()
      .then((res) => {
        blogs = res;
      })
      .catch((err) => console.error(err));
  });
  let headers = ['ID', 'Title', 'Author', 'Link', 'Category', 'Created at'];
  $: tableData = blogs.map((blog) => {
    return {
      clickHandler: () => goto('/blog/update?id=' + blog.id),
      data: [
        blog.id,
        blog.title,
        blog.author,
        blog.link,
        blog.category,
        util.stringDateToDate(blog.createdAt),
      ],
    };
  });
</script>

<div class="container mb-3">
  <h1>Blog</h1>
  <button class="btn btn-primary" on:click={() => goto('/blog/new')}>Add new</button>
</div>
<GenericTable {headers} data={tableData} />
