<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import GenericTable from '$lib/components/GenericTable.svelte';
  import util from '$lib/util';
  import type { Project } from 'src';

  let projects: Project[] = [];
  onMount(() => {
    api.coursework.project.getAll().then((res) => {
      projects = res;
    });
  });
  const headers = [
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
    return {
      clickHandler: () => goto('/project/update?id=' + project.id),
      data: [
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
        util.stringDateToDate(project.createdAt),
      ],
    };
  });
</script>

<div class="container mb-3">
  <h1>Project</h1>
  <button class="btn btn-primary" on:click={() => goto('/project/new')}>Add new</button>
</div>
<GenericTable {headers} data={tableData} />
