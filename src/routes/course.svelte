<script lang="ts">
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import GenericTable from '$lib/components/GenericTable.svelte';
  import type { Course } from 'src';

  let HEADERS = ['ID', 'Name', 'Description', 'Vote quota'];

  let courses: Course[] = [];
  onMount(() => {
    api.course.getAll().then((res) => {
      courses = res;
    });
  });
  $: tableData = courses.map((course) => [
    course.id,
    course.name,
    course.description,
    course.voteQuota,
  ]);
</script>

<GenericTable headers={HEADERS} data={tableData} />
