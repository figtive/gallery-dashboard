<script lang="ts">
  export let headers: string[];
  export let data: any[][];
</script>

<table class="table">
  <thead>
    <tr>
      {#each headers as header (header)}
        <th scope="col">{header}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as row, i (i)}
      <tr>
        {#each row as cell, j (j)}
          <td>{cell}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
