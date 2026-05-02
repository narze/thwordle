<script lang="ts">
  export let url: string
  export let title: string

  $: facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  $: twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
</script>

{#if url}
  <div class="flex gap-2 justify-center w-full fixed bottom-4 center">
    <a
      class="h-10 w-10 rounded flex items-center justify-center bg-[#1877F2] text-white font-bold"
      href={facebookHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on Facebook"
    >
      f
    </a>
    <a
      class="h-10 w-10 rounded flex items-center justify-center bg-black text-white font-bold"
      href={twitterHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on Twitter"
    >
      X
    </a>
  </div>
{/if}
