<script lang="ts">
  import { CharState } from "./Wordle"

  const example1 = [
    { correct: CharState.Correct, char: "อ" },
    { correct: CharState.NotUsed, char: "นุ" },
    { correct: CharState.NotUsed, char: "ญ" },
    { correct: CharState.NotUsed, char: "า" },
    { correct: CharState.NotUsed, char: "ต" },
  ]

  const example2 = [
    { correct: CharState.NotUsed, char: "ป" },
    { correct: CharState.OutOfPlace, char: "ร" },
    { correct: CharState.NotUsed, char: "ะ" },
    { correct: CharState.NotUsed, char: "โ" },
    { correct: CharState.NotUsed, char: "ย" },
    { correct: CharState.NotUsed, char: "ค" },
  ]

  const example3 = [
    { correct: CharState.NotUsed, char: "พ" },
    { correct: CharState.NotUsed, char: "ย" },
    { correct: CharState.NotUsed, char: "า" },
    { correct: CharState.Wrong, char: "บ" },
    { correct: CharState.NotUsed, char: "า" },
    { correct: CharState.NotUsed, char: "ท" },
  ]

  const example4 = [
    { correct: CharState.NotUsed, char: "เ" },
    { correct: CharState.Correct, char: "พิ่" },
    { correct: CharState.NotUsed, char: "ม" },
    { correct: CharState.NotUsed, char: "เ" },
    { correct: CharState.OutOfPlace, char: "ติ" },
    { correct: CharState.NotUsed, char: "ม" },
  ]

  const colors = {
    [CharState.Correct]: "bg-green-500 border-green-500",
    [CharState.OutOfPlace]:
      "bg-yellow-500 border-yellow-500 dark:bg-amber-500 dark:border-amber-500",
    [CharState.Wrong]: "bg-gray-500 border-gray-500",
    [CharState.NotUsed]: "bg-white dark:bg-slate-800",
  }

  export let onClose = () => {}
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
    <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
      >&#8203;</span
    >

    <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
    <div
      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-slate-800">
        <div class="sm:flex sm:items-start">
          <!-- <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            Heroicon name: outline/exclamation
            <svg
              class="h-6 w-6 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div> -->
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left dark:text-white">
            <h3
              class="text-base leading-6 font-medium text-gray-900 dark:text-white"
              id="modal-title"
            >
              เกม Thwordle
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500 dark:text-gray-300">
                ทายคำปริศนาประจำวัน โดยการทายแต่ละครั้งจะได้ผลลัพท์เป็นสีต่างๆ<br />
                (เหมือนกับ
                <a target="_blank" href="https://www.powerlanguage.co.uk/wordle" class="underline"
                  >Wordle</a
                > นั่นแหละ แต่เป็นภาษาไทย)
              </p>
            </div>
            <hr class="my-2" />
            <div class="mt-2 ">
              <h3 class="text-base font-medium">ตัวอย่าง</h3>
              <div class="flex justify-center my-1">
                {#each example1 as { correct, char }}
                  <div
                    class={`${
                      colors[correct] || "bg-white"
                    } w-10 h-10 border-solid border-2 flex items-center justify-center mx-0.5 text-base font-bold
                rounded`}
                  >
                    {char ?? ""}
                  </div>
                {/each}
              </div>
              <p class="text-sm text-gray-500 mb-4 dark:text-gray-300">
                มีตัวอักษร <strong>อ</strong> อยู่ในคำ และอยู่ในตำแหน่งที่ถูกต้อง
              </p>
              <div class="flex justify-center my-1">
                {#each example2 as { correct, char }}
                  <div
                    class={`${
                      colors[correct] || "bg-white"
                    } w-10 h-10 border-solid border-2 flex items-center justify-center mx-0.5 text-base font-bold
                rounded`}
                  >
                    {char ?? ""}
                  </div>
                {/each}
              </div>
              <p class="text-sm text-gray-500 mb-4 dark:text-gray-300">
                มีตัวอักษร <strong>ร</strong> อยู่ในคำ แต่อยู่ในตำแหน่งที่ผิด
              </p>
              <div class="flex justify-center my-1">
                {#each example3 as { correct, char }}
                  <div
                    class={`${
                      colors[correct] || "bg-white"
                    } w-10 h-10 border-solid border-2 flex items-center justify-center mx-0.5 text-base font-bold
                rounded`}
                  >
                    {char ?? ""}
                  </div>
                {/each}
              </div>
              <p class="text-sm text-gray-500 mb-4 dark:text-gray-300">
                ไม่มีตัวอักษร <strong>บ</strong> อยู่ในคำปริศนา
              </p>
            </div>
            <hr class="my-2" />
            <div class="mt-2">
              <h3
                class="text-base leading-6 font-medium text-gray-900 dark:text-white"
                id="modal-title"
              >
                กฎพิเศษ
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-300">
                เนื่องจากภาษาไทยมีตัวสระและวรรณยุกต์ในตำแหน่งเดียวกันได้<br />
                ถ้าตัวอักษรตัวกลางอยู่ในคำ (สีเขียว, สีเหลือง) จะมีการเติมสระ/วรรณยุกต์ให้โดยอัตโนมัติ
              </p>
              <div class="flex justify-center my-1">
                {#each example4 as { correct, char }}
                  <div
                    class={`${
                      colors[correct] || "bg-white"
                    } w-10 h-10 border-solid border-2 flex items-center justify-center mx-0.5 text-base font-bold
                rounded`}
                  >
                    {char ?? ""}
                  </div>
                {/each}
              </div>
              <p class="text-sm text-gray-500 mb-4 dark:text-gray-300">
                มีตัวอักษร <strong>พ</strong> และอยู่ในตำแหน่งที่ถูกต้อง
                จะทำการเติมสระ/วรรณยุกต์ให้โดยอัตโนมัติ (<strong>พิ่</strong>)
              </p>
              <p class="text-sm text-gray-500 mb-4 dark:text-gray-300">
                มีตัวอักษร <strong>ต</strong> อยู่ในคำ จะทำการเติมสระ/วรรณยุกต์ให้โดยอัตโนมัติ (<strong
                  >ติ</strong
                >)
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-300">
                สระและวรรณยุกต์ตัวบน/ล่าง จะไม่ถูกทำเครื่องหมายว่าไม่อยู่ในคำนั้น หากใส่ผิดจุด
              </p>

              <hr class="my-2" />

              <a
                class="text-gray-500 text-sm underline dark:text-gray-300"
                href="https://twitter.com/thwordle"
              >
                แจ้งบั๊ก / ข้อเสนอแนะ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
