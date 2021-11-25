<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import type { CourseForm } from 'src';

  export let courseId: string = '';
  const formData: CourseForm = {
    id: '',
    name: '',
    description: '',
    voteQuota: 0,
  };
  onMount(() => {
    if (courseId !== '') {
      api.course.get(courseId).then((res) => {
        formData.id = res.id;
        formData.name = res.name;
        formData.description = res.description;
        formData.voteQuota = res.voteQuota;
      });
    }
  });
  const submitHandler = () => {
    let request: (courseForm: CourseForm) => Promise<any>;
    if (courseId === '') {
      request = api.course.new;
    } else {
      request = api.course.update;
    }
    request(formData)
      .then(() => goto('/course'))
      .catch((err) => console.error(err));
  };
</script>

<div class="container">
  <form on:submit|preventDefault={submitHandler}>
    <div class="mb-3">
      <label for="id" class="form-label">ID</label>
      <input type="text" class="form-control" id="id" bind:value={formData.id} />
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" bind:value={formData.name} />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea class="form-control" id="description" rows="3" bind:value={formData.description} />
    </div>
    <div class="mb-3">
      <label for="quota" class="form-label">Vote Quota</label>
      <input
        type="number"
        class="form-control"
        id="quota"
        min="0"
        bind:value={formData.voteQuota}
      />
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>
  </form>
</div>
