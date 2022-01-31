<script lang="ts">
  import { onMount } from "svelte"

  export let message = ""
  export let onClose = () => {}

  onMount(() => {
    setTimeout(() => {
      onClose()
    }, 2000)
  })
</script>

<div
  class="fixed z-10 inset-0 overflow-y-auto"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
  on:click={onClose}
>
  <div
    class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
  >
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
      >&#8203;</span
    >
    <div
      class="h-32 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
    >
      <div class="bg-white p-4 flex h-full justify-center items-center">
        <p>
          {message}
        </p>
      </div>
    </div>
  </div>
</div>
