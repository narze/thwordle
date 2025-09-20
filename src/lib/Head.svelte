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

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;600&display=swap"
    rel="stylesheet"
  />

  <!-- Google Tag Manager -->
  <script>
    ;(function (w, d, s, l, i) {
      w[l] = w[l] || []
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" })
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : ""
      j.async = true
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl
      f.parentNode.insertBefore(j, f)
    })(window, document, "script", "dataLayer", "GTM-P6RFNJX7")
  </script>
  <!-- End Google Tag Manager -->

  {#if gtagId}
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={gtagId}"></script>
    {@html `<script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gtagId}');
    </script>`}
  {/if}
</svelte:head>

<!-- Google Tag Manager (noscript) -->
<noscript
  ><iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-P6RFNJX7"
    height="0"
    width="0"
    style="display:none;visibility:hidden"
  ></iframe></noscript
>
<!-- End Google Tag Manager (noscript) -->
