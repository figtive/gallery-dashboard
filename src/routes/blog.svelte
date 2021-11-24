<script lang="ts">
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
  $: tableData = blogs.map((blog) => [
    blog.id,
    blog.title,
    blog.author,
    blog.link,
    blog.category,
    util.stringDateToDate(blog.createdAt),
  ]);
</script>

<GenericTable {headers} data={tableData} />
