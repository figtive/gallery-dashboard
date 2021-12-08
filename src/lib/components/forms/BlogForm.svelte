<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  import api from '$lib/api';
  import { BlogCategoryType, BlogCategoryTypeLabel } from '$lib/constants';
  import type { BlogForm, Course } from 'src';

  export let blogId: string = '';
  let courses: Course[] = [];
  const formData: BlogForm = {
    title: '',
    author: '',
    link: '',
    category: '',
    courseId: '',
  };
  onMount(() => {
    api.course
      .getAll()
      .then((res) => (courses = res))
      .catch((err) => console.log(err));
    if (blogId !== '') {
      api.coursework.blog
        .getOne('', blogId)
        .then((res) => {
          formData.id = res.id;
          formData.title = res.title;
          formData.author = res.author;
          formData.link = res.link;
          formData.category = res.category;
          formData.courseId = res.courseId;
        })
        .catch((err) => console.log(err));
    }
  });
  const submitHandler = () => {
    let request: (blog: BlogForm) => Promise<any>;
    if (blogId === '') {
      request = api.coursework.blog.new;
    } else {
      request = api.coursework.blog.update;
    }
    request(formData)
      .then(() => goto(`/blog`))
      .catch((err) => console.log(err));
  };
</script>

<div class="container">
  <form on:submit|preventDefault={submitHandler}>
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input type="text" class="form-control" id="title" bind:value={formData.title} />
    </div>
    <div class="mb-3">
      <label for="author" class="form-label">Author</label>
      <input type="text" class="form-control" id="author" bind:value={formData.author} />
    </div>
    <div class="mb-3">
      <label for="link" class="form-label">Link</label>
      <input type="url" class="form-control" id="link" bind:value={formData.link} />
    </div>
    <div class="mb-3">
      <label for="course" class="form-label">Course</label>
      <select
        class="form-select"
        aria-label="Select course ID"
        id="course"
        bind:value={formData.courseId}
      >
        <option value="" selected>Course</option>
        {#each courses as course (course.id)}
          <option value={course.id}>{course.name}</option>
        {/each}
      </select>
    </div>
    <div class="mb-3">
      <label for="category" class="form-label">Category</label>
      <select
        class="form-select"
        aria-label="Select field"
        id="category"
        bind:value={formData.category}
      >
        {#each Object.keys(BlogCategoryType).map((key) => BlogCategoryType[key]) as category (category)}
          <option value={category}>{BlogCategoryTypeLabel[category]}</option>
        {/each}
      </select>
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>
  </form>
</div>
