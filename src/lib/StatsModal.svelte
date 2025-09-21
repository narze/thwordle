<script lang="ts">
  import Stats from "./Stats.svelte"

  export let special = false
  export let onClose = () => {}
</script>

<div
  class="fixed z-10 inset-0 overflow-y-auto"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  >
  <div
    class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
  >
    <div
      class="fixed fadein inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
      on:click={() => onClose()}
    ></div>

    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
      >&#8203;</span
    >

    <div
      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full"
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-slate-800">
        <div class="mt-3 text-left">
          <Stats isSpecialStats={special} />
        </div>

        <div class="mt-4 flex flex-row-reverse">
          <button
            type="button"
            class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-400 text-base font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-gray-300 sm:ml-3 sm:text-sm"
            on:click={() => {
              onClose()
            }}
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .toggle-theme__input {
    display: none;
  }

  .toggle-theme__button {
    position: relative;
    cursor: pointer;
    display: inline-block;

    font-size: 1rem;
    line-height: 20px;

    width: 120px;
    height: 35px;
    color: white;
    background-color: white;
    border: solid 1px rgba(0, 0, 0, 0.2);

    transition: all 0.3 ease;
  }

  .toggle-theme__button::before {
    content: "ปิด";
    position: absolute;
    display: flex;
    align-items: center;

    top: 4px;
    left: 5px;
    height: 25px;
    padding: 0 10px;

    background: rgba(0, 0, 0, 0.5);
    color: white;
    transition: all 0.3s ease;
  }

  .toggle-theme__input:checked + .toggle-theme__button {
    color: black;
    background: rgba(0, 0, 0, 0.2);
    border: solid 1px rgba(255, 255, 255, 1);
  }

  .toggle-theme__input:checked + .toggle-theme__button::before {
    content: "เปิด";
    left: 67px;
    color: black;
    background: white;
  }
</style>
