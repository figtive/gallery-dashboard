<script lang="ts">
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import type { Project } from 'src';
  import GenericTable from '$lib/components/GenericTable.svelte';

  let projects: Project[] = [];
  onMount(() => {
    api.coursework.project.getAll().then((res) => {
      projects = res;
    });
  });
  const HEADERS = [
    'ID',
    'Name',
    'Team',
    'Description',
    'Thumbnail',
    'Link',
    'Video',
    'Active',
    'Course ID',
    'Field',
    'Metadata',
    'Created at',
  ];
  $: tableData = projects.map((project) => {
    return [
      project.id,
      project.name,
      project.team,
      project.description,
      project.thumbnail,
      project.link,
      project.video,
      project.active,
      project.courseId,
      project.field,
      project.metadata,
      project.createdAt,
    ];
  });
</script>

<GenericTable headers={HEADERS} data={tableData} />
