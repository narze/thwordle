<script lang="ts">
  interface Item {
    name: string
    url: string
  }

  export let items: Item[] = []
</script>

<div class="text-xs fixed sm:text-base bottom-4 right-4 text-right z-10">
  {#each items as { name, url }}
    <a
      href={url}
      class="sm:px-2.5 px-1 py-0.5 sm:mx-1 bg-white rounded"
      target="_blank"
      rel="noreferrer">{name}</a
    >
  {/each}
</div>
