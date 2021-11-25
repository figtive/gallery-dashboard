<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import GenericTable from '$lib/components/GenericTable.svelte';
  import type { Course } from 'src';

  let courses: Course[] = [];
  onMount(() => {
    api.course.getAll().then((res) => {
      courses = res;
    });
  });
  let headers = ['ID', 'Name', 'Description', 'Vote quota'];
  $: tableData = courses.map((course) => [
    course.id,
    course.name,
    course.description,
    course.voteQuota,
  ]);
</script>

<div class="container mb-3">
  <h1>Courses</h1>
  <button class="btn btn-primary" on:click={() => goto('/course/new')}>Add new</button>
</div>
<GenericTable {headers} data={tableData} />
