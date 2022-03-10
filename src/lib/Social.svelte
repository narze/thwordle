<script lang="ts">
  import { Facebook, Twitter } from "svelte-share-buttons-component"

  export let url: string
  export let title: string
</script>

{#if url}
  <div class="flex gap-2 justify-center w-full fixed bottom-4 center">
    <Facebook class="h-10 w-10 rounded" {url} />
    <Twitter class="h-10 w-10 rounded" text={title} {url} />
  </div>
{/if}
