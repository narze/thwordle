<script lang="ts">
  import LibLoader from "./LibLoader.svelte"

  export let name: string
  export let label = "Support me"

  function loadKofiWidget() {
    window.kofiWidgetOverlay?.draw(
      name,
      {
        type: "floating-chat",
        "floating-chat.donateButton.text": label,
        "floating-chat.donateButton.background-color": "#ff3e00",
        "floating-chat.donateButton.text-color": "#fff",
      },
      "kofiContainer"
    )
  }
</script>

{#if name}
  <div id="kofiContainer" class="web-only">{label}</div>

  <LibLoader
    on:load={loadKofiWidget}
    src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
    libraryDetectionObject="kofiWidgetOverlay"
  />
{/if}
