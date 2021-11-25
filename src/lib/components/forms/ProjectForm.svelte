<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import { ProjectFieldType, ProjectFieldTypeLabel } from '$lib/constants';
  import type { Course, Project, ProjectForm } from 'src';

  export let projectId: string = '';
  let courses: Course[] = [];
  let formData: ProjectForm = {
    name: '',
    team: '',
    description: '',
    link: '',
    video: '',
    active: false,
    courseId: '',
    field: '',
    metadata: '{}',
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
      .then((res: Project | null) => {
        if (projectId === '') {
          goto(`/project/${res.id}`);
        } else {
          goto(`/project/${projectId}`);
        }
      })
      .catch((err) => console.log(err));
  };
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
      <label for="video" class="form-label">Video</label>
      <input type="url" class="form-control" id="video" bind:value={formData.video} />
    </div>
    <div class="mb-3">
      <label for="course" class="form-label">Course</label>
      <select
        class="form-select"
        aria-label="Select course ID"
        id="course"
        bind:value={formData.courseId}
      >
        {#each courses as course (course.id)}
          <option value={course.id}>{course.name}</option>
        {/each}
      </select>
    </div>
    <div class="mb-3">
      <label for="field" class="form-label">Field</label>
      <select class="form-select" aria-label="Select field" id="field" bind:value={formData.field}>
        {#each Object.keys(ProjectFieldType).map((key) => ProjectFieldType[key]) as field (field)}
          <option value={field}>{ProjectFieldTypeLabel[field]}</option>
        {/each}
      </select>
    </div>
    <div class="form-check">
      <input type="checkbox" class="form-check-input" id="active" bind:checked={formData.active} />
      <label class="form-check-label" for="active"> Active </label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
