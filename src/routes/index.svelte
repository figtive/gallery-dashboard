<script lang="ts">
  const links = [
    {
      ref: '/course',
      text: 'Course',
    },
    {
      ref: '/project',
      text: 'Project',
    },
    {
      ref: '/blog',
      text: 'Blog',
    },
  ];
</script>

<div class="container">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Tables</th>
      </tr>
    </thead>
    <tbody>
      {#each links as link (link)}
        <tr>
          <td>
            <a href={link.ref}>{link.text}</a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
