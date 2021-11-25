<script lang="ts">
  export let headers: string[];
  export let data: { data: any[]; clickHandler?: () => void }[];
</script>

<table class="table table-hover">
  <thead>
    <tr>
      {#each headers as header (header)}
        <th scope="col">{header}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as row, i (i)}
      <tr on:click={row.clickHandler}>
        {#each row.data as cell, j (j)}
          <td>{cell}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
