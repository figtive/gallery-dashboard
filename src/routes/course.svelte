<script lang="ts">
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

<GenericTable {headers} data={tableData} />
