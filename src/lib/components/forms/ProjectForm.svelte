<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import { ProjectFieldType, ProjectFieldTypeLabel } from '$lib/constants';
  import type { Course, Project, ProjectForm, ProjectMetadata } from 'src';

  export let projectId: string = '';
  let courses: Course[] = [];
  let formData: ProjectForm = {
    name: '',
    team: '',
    description: '',
    link: '',
    video: '',
    active: true,
    courseId: '',
    field: '',
    metadata: JSON.stringify({}),
  };
  let metadataFormData: ProjectMetadata = {
    partner: '',
    productOwner: '',
    scrumMaster: '',
    devOps: '',
    developmentTeam: [''],
  };
  onMount(() => {
    api.course
      .getAll()
      .then((res) => (courses = res))
      .catch((err) => console.log(err));
    if (projectId !== '') {
      api.coursework.project
        .getOne('', projectId)
        .then((res) => {
          formData = {
            id: res.id,
            name: res.name,
            team: res.team,
            description: res.description,
            link: res.link,
            video: res.video,
            active: res.active,
            courseId: res.courseId,
            field: res.field,
            metadata: res.metadata,
          };
          const metadata = JSON.parse(res.metadata);
          metadata.developmentTeam.push('');
          metadataFormData = metadata;
        })
        .catch((err) => console.log(err));
    }
  });
  const submitHandler = () => {
    let request: (project: ProjectForm) => Promise<any>;
    if (projectId === '') {
      request = api.coursework.project.new;
    } else {
      request = api.coursework.project.update;
    }
    request(formData)
      .then(() => goto('/project'))
      .catch((err) => console.log(err));
  };
  $: if (metadataFormData.developmentTeam[metadataFormData.developmentTeam.length - 1] !== '') {
    metadataFormData.developmentTeam.push('');
  }
  $: {
    // https://stackoverflow.com/a/25921504
    const metadata = JSON.parse(JSON.stringify(metadataFormData));
    metadata.developmentTeam.splice(-1);
    formData.metadata = JSON.stringify(metadata);
  }
</script>

<div class="container">
  <form on:submit|preventDefault={submitHandler}>
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" bind:value={formData.name} />
    </div>
    <div class="mb-3">
      <label for="team" class="form-label">Team</label>
      <input type="text" class="form-control" id="team" bind:value={formData.team} />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea class="form-control" id="description" rows="3" bind:value={formData.description} />
    </div>
    <div class="mb-3">
      <label for="link" class="form-label">Link</label>
      <input type="url" class="form-control" id="link" bind:value={formData.link} />
    </div>
    <div class="mb-3">
      <label for="video" class="form-label">Video ID</label>
      <input type="text" class="form-control" id="video" bind:value={formData.video} />
    </div>
    <div class="mb-3">
      <label for="course" class="form-label">Course</label>
      <select
        class="form-select"
        aria-label="Select course ID"
        id="course"
        bind:value={formData.courseId}
        disabled={courses.length === 0}
      >
        {#if courses.length === 0}
          <option value="" disabled>Please add Courses first</option>
        {/if}
        {#each courses as course (course.id)}
          <option value={course.id}>{course.name}</option>
        {/each}
      </select>
    </div>
    <div class="mb-3">
      <label for="field" class="form-label">Field</label>
      <select class="form-select" aria-label="Select field" id="field" bind:value={formData.field}>
        {#each Object.keys(ProjectFieldType)
          .filter((key) => ProjectFieldType[key] !== ProjectFieldType.All)
          .map((key) => ProjectFieldType[key]) as field (field)}
          <option value={field}>{ProjectFieldTypeLabel[field]}</option>
        {/each}
      </select>
    </div>
    <div class="mb-3">
      <label for="partner" class="form-label">Partner</label>
      <input type="text" class="form-control" id="partner" bind:value={metadataFormData.partner} />
    </div>
    <div class="mb-3">
      <label for="productOwner" class="form-label">Product Owner</label>
      <input
        type="text"
        class="form-control"
        id="productOwner"
        bind:value={metadataFormData.productOwner}
      />
    </div>
    <div class="mb-3">
      <label for="scrumMaster" class="form-label">Scrum Master</label>
      <input
        type="text"
        class="form-control"
        id="scrumMaster"
        bind:value={metadataFormData.scrumMaster}
      />
    </div>
    <div class="mb-3">
      <label for="devOps" class="form-label">DevOps</label>
      <input type="text" class="form-control" id="devOps" bind:value={metadataFormData.devOps} />
    </div>
    <div class="mb-3">
      <label for="developmentTeam" class="form-label">Development Team</label>
      <input
        type="text"
        class="form-control"
        id="developmentTeam"
        placeholder="Add new"
        bind:value={metadataFormData.developmentTeam[0]}
      />
    </div>
    {#each metadataFormData.developmentTeam as developmentTeam, i (i)}
      {#if i > 0}
        <div class="mb-3 input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Add new"
            aria-describedby="remove-developmentTeam-{i}"
            bind:value={developmentTeam}
          />
          <button
            class="btn btn-danger"
            type="button"
            id="remove-developmentTeam-{i}"
            disabled={i === metadataFormData.developmentTeam.length - 1 && developmentTeam === ''}
            on:click={() => {
              metadataFormData.developmentTeam = [
                ...metadataFormData.developmentTeam.slice(0, i),
                ...metadataFormData.developmentTeam.slice(i + 1),
              ];
            }}>-</button
          >
        </div>
      {/if}
    {/each}
    <div class="form-check mb-3">
      <input type="checkbox" class="form-check-input" id="active" bind:checked={formData.active} />
      <label class="form-check-label" for="active">Active</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
