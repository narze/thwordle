<script lang="ts">
  import { settings } from "./store"

  export let onClose = () => {}

  const onToggleChange = () => {
    const darkMode = JSON.parse(localStorage.getItem("thwordle-attempts"))?.settings.darkMode

    if (Boolean(darkMode)) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }
</script>

<div
  class="fixed z-10 inset-0 overflow-y-auto"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div
    class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
  >
    <div
      class="fixed fadein inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
      on:click={() => onClose()}
    />

    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
      >&#8203;</span
    >

    <div
      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full"
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-slate-800">
        <div class="mt-3 text-left">
          <h3 class="text-xl leading-4 font-medium text-gray-900 dark:text-white" id="modal-title">
            ตั้งค่า
          </h3>
          <div class="mt-4 flex w-full dark:text-white">
            <span class="grow font-bold">เลย์เอาท์</span>
            <span>
              <select class="border rounded-md p-1 dark:bg-slate-800" bind:value={$settings.layout}>
                <option value="Kedmanee">Kedmanee (ค่าเริ่มต้น)</option>
                <option value="Manoonchai">Manoonchai</option>
                <option value="ก-ฮ">ก-ฮ</option>
              </select>
            </span>
          </div>
          <div class="mt-4 flex w-full">
            <span class="grow font-bold self-center dark:text-white">โหมดมืด</span>
            <button>
              <section>
                <label for="toggle-theme" class="toggle-theme">
                  <input
                    type="checkbox"
                    name="toggle-theme"
                    id="toggle-theme"
                    class="toggle-theme__input"
                    bind:checked={$settings.darkMode}
                    on:change={onToggleChange}
                  />
                  <span class="toggle-theme__button" />
                </label>
              </section>
            </button>
          </div>
          <div class="mt-4 flex w-full">
            <span class="grow font-bold self-center dark:text-white">ซ่อนรหัสในโหมด Unlimited</span>
            <button>
              <section>
                <label for="toggle-training-code" class="toggle-theme">
                  <input
                    type="checkbox"
                    name="toggle-training-code"
                    id="toggle-training-code"
                    class="toggle-theme__input"
                    bind:checked={$settings.hideTrainingCode}
                  />
                  <span class="toggle-theme__button" />
                </label>
              </section>
            </button>
          </div>
        </div>
        <div class="py-3 flex justify-center">
          <button
            type="button"
            class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-5 py-2 bg-gray-400 text-base font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-gray-300 sm:ml-3 sm:text-sm"
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

    width: 70px;
    height: 35px;
    color: white;
    background-color: rgb(37, 37, 37);
    border-radius: 0.375rem;

    transition: all 0.3 ease;
  }

  .toggle-theme__button::before {
    content: "";
    position: absolute;
    display: flex;
    align-items: center;

    top: 4px;
    left: 5px;
    height: 25px;
    width: 25px;
    border-radius: 100%;
    padding: 0 10px;

    background: white;
    transition: all 0.3s ease;
  }

  .toggle-theme__input:checked + .toggle-theme__button {
    background: #f87160;
  }

  .toggle-theme__input:checked + .toggle-theme__button::before {
    content: "";
    height: 25px;
    width: 25px;
    border-radius: 100%;
    left: 40px;
    background: #fffdfd;
  }
</style>
