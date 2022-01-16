<script>
  // Based on code from https://stackoverflow.com/questions/59629947/how-do-i-load-an-external-js-library-in-svelte-sapper
  import { onMount, createEventDispatcher } from "svelte"
  const dispatch = createEventDispatcher()
  export let src
  export let libraryDetectionObject
  let script

  onMount(() => {
    if (libraryDetectionObject && window && typeof window[libraryDetectionObject] !== "undefined") {
      return dispatch("load")
    }

    script.addEventListener("load", () => {
      // console.log('load event from script')
      dispatch("load")
    })

    script.addEventListener("error", (event) => {
      // console.error('something went wrong', event)
      dispatch("error")
    })
  })
</script>

<svelte:head>
  <script bind:this={script} {src}></script>
</svelte:head>
