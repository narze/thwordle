<script lang="ts">
  export let title: string
  export let description: string
  export let url: string
  export let imageUrl: string
  export let gtagId: string
</script>

<svelte:head>
  <title>{title}</title>

  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={imageUrl} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={imageUrl} />

  {#if gtagId}
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={gtagId}"></script>
    <script>
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag("js", new Date())
      gtag("config", "G-D48ZMRTDBR")
    </script>
  {/if}
</svelte:head>
