<script lang="ts">
  import { onMount } from "svelte"

  // Version constant - change this to show the modal again to all users
  export const ANNOUNCEMENT_VERSION = "20251116-200151"

  const STORAGE_KEY = "thwordle-announcement-version"

  export let onClose = () => {}

  let showModal = false

  onMount(() => {
    // Check if user has seen this version
    const storedVersion = localStorage.getItem(STORAGE_KEY)
    if (storedVersion !== ANNOUNCEMENT_VERSION) {
      showModal = true
    }
  })

  function handleClose() {
    // Store the current version when modal is closed
    localStorage.setItem(STORAGE_KEY, ANNOUNCEMENT_VERSION)
    showModal = false
    onClose()
  }
</script>

{#if showModal}
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="announcement-modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        on:click={handleClose}
      />

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        on:click|stopPropagation
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-slate-800">
          <div class="mt-3 text-center sm:mt-0 sm:text-left dark:text-white">
            <slot />
          </div>

          <div class="mt-4 flex flex-row-reverse">
            <button
              type="button"
              class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-400 text-base font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-gray-300 sm:ml-3 sm:text-sm"
              on:click={handleClose}
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
