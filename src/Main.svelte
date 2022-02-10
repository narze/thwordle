<!-- Main.svelte -->
<script>
  import url from "./lib/url"
  import App from "./App.svelte"
  import Special from "./Special.svelte"
</script>

{#if $url.hash.indexOf("#/s/") === 0 || $url.hash === "#/"}
  <Special specialId={$url.hash.split(["#/s/"])[1]} />
{:else}
  <App />
{/if}
