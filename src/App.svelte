<script lang="ts">
  // import "twind/shim"

  import { sineInOut } from "svelte/easing"

  import Head from "./lib/Head.svelte"
  import Kofi from "./lib/Kofi.svelte"
  import Menu from "./lib/Menu.svelte"
  import Social from "./lib/Social.svelte"
  import {
    CharState,
    generateAlphabetStateMap,
    getShareResults,
    splitWord,
    validateWord,
  } from "./lib/Wordle"
  import words from "./lib/words"
  import { onMount, tick } from "svelte"
  import Modal from "./lib/Modal.svelte"
  import dict from "./lib/dict.json"
  import { store } from "./lib/store"
  import AlertModal from "./lib/AlertModal.svelte"

  const url = "https://thwordle.vercel.app"
  const title = "Thwordle"

  const menuItems = [
    { name: "เจอบั๊ก?", url: "https://twitter.com/narze/status/1483857313224355840" },
    { name: "Github", url: "https://github.com/narze/thwordle" },
  ]

  const description = "Thwordle : เวอเดิ้ลภาษาไทย"
  const imageUrl =
    "https://raw.githubusercontent.com/narze/timelapse/master/projects/thwordle_home.png"

  const gtagId = "G-F2Q37REQE6"
  const words5to7 = words.filter((word) => {
    const w = splitWord(word)
    return w.length >= 5 && w.length <= 7
  })

  const rows = [
    ["ภ", "ถ", "ุ", "ึ", "ค", "ต", "จ", "ข", "ช", "⬅"],
    ["ๆ", "ไ", "ำ", "พ", "ะ", "ั", "ี", "ร", "น", "ย", "บ", "ล"],
    ["ฟ", "ห", "ก", "ด", "เ", "้", "่", "า", "ส", "ว", "ง"],
    ["⇧", "ผ", "ป", "แ", "อ", "ิ", "ื", "ท", "ม", "ใ", "ฝ", "↵"],
  ]

  const rowsShifted = [
    ["ภ", "ถ", "ู", "ึ", "ค", "ต", "จ", "ข", "ช", "⬅"],
    ["ๆ", "ไ", "ฎ", "ฑ", "ธ", "ั", "๊", "ณ", "น", "ญ", "ฐ", "ล"],
    ["ฤ", "ฆ", "ฏ", "โ", "ฌ", "็", "๋", "ษ", "ศ", "ซ", "ง"],
    ["⇧", "ผ", "ป", "ฉ", "ฮ", "ิ", "์", "ท", "ฒ", "ฬ", "ฝ", "↵"],
  ]

  // January 19, 2022 Game Epoch
  const epochMs = 1642525200000
  const now = Date.now()
  const msInDay = 86400000
  const dateIndex = Math.floor((now - epochMs) / msInDay)

  const attemptLimit = 6

  let input = ""
  // let solution = words5to7[Math.floor(Math.random() * words5to7.length)]
  let solution = words5to7[dateIndex % words5to7.length]
  let attempts: string[] = $store.data[dateIndex]?.attempts || []
  let validations = attempts.map((word) => validateWord(word, solution))
  let gameEnded = !!$store.data[dateIndex]?.win
  let attemptsContainer
  let modalViewed = !!$store.modalViewed
  let copied = false
  let lose = false
  let win = false
  let shifted = false
  let alertMessage = ""
  let showAlert = false

  $: attemptsLength = attempts.length
  $: solutionLength = splitWord(solution).length
  $: currentRows = shifted ? rowsShifted : rows
  $: inverseRows = shifted ? rows : rowsShifted
  $: alphabetStateMap = generateAlphabetStateMap(
    [...rows, ...rowsShifted].flat(),
    validations.flat()
  )
  $: input = input.replace(/[^ก-๙]/g, "")
  $: splittedInput = splitWord(input)
  $: {
    store.set({
      modalViewed,
      data: { ...$store.data, [`${dateIndex}`]: { attempts, win } },
    })
  }
  $: {
    const validation = validations.slice(-1)[0]

    if (validation) {
      // if all validation is correct
      let allMatched = true
      validation.forEach((v) => {
        if (v.correct !== CharState.Correct) {
          allMatched = false
        }
      })

      if (allMatched) {
        showAlertMessage("คุณชนะแล้ว!")
        gameEnded = true
        win = true
      } else if (attemptsLength >= attemptLimit) {
        showAlertMessage(`คุณแพ้แล้ว คำประจำวันนี้คือ "${solution}"`)
        gameEnded = true
        lose = true
      }
    }
  }

  // $: console.log(alphabetsLayout)

  // $: validate = validateWord(input, solution)

  const colors = {
    [CharState.Correct]: "bg-green-500 border-green-500 text-white",
    [CharState.OutOfPlace]: "bg-yellow-500 border-yellow-500 text-white",
    [CharState.Wrong]: "bg-gray-500 border-gray-500 text-white",
    [CharState.NotUsed]: "bg-white text-black",
  }

  
  // Enable global keyboard event listener
  document.addEventListener('keydown', onKeyDown);
  
  function onKeyDown(e: KeyboardEvent) {
    console.log(e.key);
    if (e.key === "Enter") {
      e.preventDefault()
      submit()
    }
    if (e.key === 'Backspace') {
      e.preventDefault()
      input = input.slice(0, -1)
      return
    }
    input += e.key;  
    
    // ถ้าเป็นสระบนล่างหรือวรรณยุกต์ ให้ใส่ได้เลยไม่ต้องเช็คความยาว
    if (
      !e.key.match(/[\u0E31\u0E34-\u0E3A\u0E47-\u0EC4]/) &&
      splittedInput.length >= solutionLength
      ) {
      input = input.slice(0, -1)
      e.preventDefault();
      return
    }
  }

  async function submit() {
    if (gameEnded) {
      return
    }

    // Check if the length is valid
    if (splitWord(input).length != solutionLength) {
      showAlertMessage("กรุณากรอกคำตอบ")
      return
    }

    // Check if the word is in the dict
    if (!wordExists(input)) {
      showAlertMessage("คำนี้ไม่มีในพจนานุกรม")
      return
    }

    // Add to solution array
    attempts = [...attempts, input]

    const validation = validateWord(input, solution)
    validations = [...validations, validation]

    input = ""

    await tick()
    attemptsContainer.scrollTop = attemptsContainer.scrollHeight
  }

  function copyResult() {
    const results = getShareResults(validations)

    const score: string = (lose ? "X" : `${results.length}`) + `/${attemptLimit}`

    navigator.clipboard.writeText(`#Thwordle ${dateIndex + 1} ${score}\n\n${results.join("\n")}`)

    copied = true

    setTimeout(() => {
      copied = false
    }, 2000)
  }

  function wordExists(input: string) {
    if (words.includes(input)) {
      return true
    }
    if (dict.includes(input)) {
      return true
    }

    for (let i = 2; i < input.length - 1; i++) {
      const left = input.slice(0, i)
      const right = input.slice(i)
      if (dict.includes(left) && dict.includes(right)) {
        return true
      }
    }

    return false
  }

  function spinAnimation(_node, { duration, delay }) {
    return {
      delay,
      duration,
      css: (t) => {
        const eased = sineInOut(t)
        const bg = eased <= 0.5 ? "background-color: transparent;" : ""
        const border = eased <= 0.5 ? "border-color: rgb(229, 231, 235);" : ""

        return `
          ${bg}
          ${border}
          transform: rotateX(${eased * 360}deg);
        `
      },
    }
  }

  function showAlertMessage(message: string) {
    alertMessage = message

    showAlert = true
  }
</script>

<div class="footer-wrapper">
  <Kofi name="narze" label="Support Me" />
  <Menu items={menuItems} />
  <Social {url} {title} />
</div>
<Head {title} {description} {url} {imageUrl} {gtagId} />

<main class="w-full h-screen flex flex-col items-center">
  <header class="mb-4 w-full h-10 py-2">
    <div class="flex justify-between w-full px-4 h-10">
      <span class="flex justify-center h-full"
        ><button on:click={() => (modalViewed = false)}>วิธีเล่น</button></span
      >
      <h1
        class="absolute text-center inset-x-0 top-4 leading-4 text-2xl text-red-400 mb-2 pointer-events-none"
      >
        <span>{title}</span>
      </h1>
      <span>&nbsp;</span>
    </div>
    <hr />
  </header>

  <span class="flex gap-4">
    <span>วันที่ {dateIndex + 1}</span>
    <span>ครั้งที่ {attemptsLength}/{attemptLimit}</span>
  </span>

  <!-- DEBUG: Input box -->
  <!-- <input
    type="text"
    class="border px-4 py-2 text-center w-64"
    on:keypress={onKeypress}
    bind:value={input}
    disabled={gameEnded}
    placeholder="คลิกที่นี่เพื่อใช้คีย์บอร์ด"
    autofocus
  /> -->

  <!-- DEBUG: Solution word -->
  <!-- <input type="text" class="border" bind:value={solution} /> -->
  <!-- Check Solution -->
  <div class="attempts grow overflow-y-auto" bind:this={attemptsContainer}>
    {#each attempts as input, n (n)}
      <div class="flex justify-center my-1">
        {#each validateWord(input, solution) as { correct, char }, idx (idx)}
          <div
            class={`${
              colors[correct] || "bg-white"
            } attempt-key border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold text-white
      rounded`}
            in:spinAnimation={{ duration: 500, delay: 150 * idx }}
          >
            {char ?? ""}
          </div>
        {/each}
      </div>
    {/each}

    {#if !gameEnded}
      <div class="flex justify-center my-1">
        {#each new Array(solutionLength).fill(0) as _, i}
          <div
            class={`bg-white attempt-key border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold rounded`}
          >
            {splittedInput[i] || ""}
          </div>
        {/each}
      </div>
    {/if}

    {#each new Array(Math.max(0, attemptLimit - attempts.length - 1)) as _, n (n)}
      <div class="flex justify-center my-1">
        {#each new Array(solutionLength).fill(0) as _}
          <div
            class={`${"bg-white"} attempt-key border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold text-white
      rounded`}
          />
        {/each}
      </div>
    {/each}
  </div>

  <!-- Layout -->
  <div class="layout my-4 w-full px-2 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
    {#each currentRows as row, rowIndex}
      <div class="w-full flex flex-row justify-center">
        {#each row as alphabet, alphabetIndex}
          <div class="flex-grow flex m-0.5 relative">
            <button
              on:click={() => {
                if (alphabet === "⇧") shifted = !shifted
                else if (alphabet === "⬅") input = input.slice(0, -1)
                else if (alphabet === "↵") submit()
                // ตรวจสอบก่อนด้วยว่าสามารถใส่ตัวอักษรเพิ่มได้หรือไม่
                // \u0E31\u0E34-\u0E3A\u0E47-\u0EC4 คือพวกนสระบนล่างหรือวรรณยุกต์
                else if (
                  !gameEnded &&
                  (alphabet.match(/[\u0E31\u0E34-\u0E3A\u0E47-\u0EC4]/) ||
                    splittedInput.length < solutionLength)
                ) {
                  input += alphabet
                  shifted = false
                }
              }}
              class={colors[alphabetStateMap[alphabet]] +
                " " +
                "flex-grow layout-key border-solid border-2 flex items-end justify-end text-xl font-bold rounded text-black"}
            >
              {alphabet}
              <!-- Inverse character -->
              {#if currentRows[rowIndex][alphabetIndex] !== inverseRows[rowIndex][alphabetIndex]}
                <div
                  class={colors[alphabetStateMap[inverseRows[rowIndex][alphabetIndex]]] +
                    " absolute top-1 left-1 border-solid border-1 rounded text-sm leading-4 p-0.5 w-4"}
                >
                  {inverseRows[rowIndex][alphabetIndex]}
                </div>
              {/if}
            </button>
          </div>
        {/each}
      </div>
    {/each}
  </div>

  <!-- Input word -->
  <div class="share-button text-center">
    {#if gameEnded}
      <button
        on:click={copyResult}
        class="flex text-lg items-center justify-center rounded border mx-2 p-3 bg-green-300 border-green-300 text-xs font-bold cursor-pointer bg-slate-200 hover:bg-slate-300 active:bg-slate-400"
      >
        {copied ? "Copied" : "Share"}
      </button>
    {/if}
  </div>

  <!-- Debug -->
  <!-- <div class="flex justify-center my-20">
    <div>DEBUG</div>
    {JSON.stringify(attempts)}
  </div> -->
  {#if !modalViewed}
    <Modal
      onClose={() => {
        modalViewed = true
      }}
    />
  {/if}

  {#if showAlert}
    <AlertModal
      message={alertMessage}
      onClose={() => {
        showAlert = false
      }}
    />
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
      "Open Sans", "Helvetica Neue", sans-serif;
  }

  .attempts {
    min-height: 96px;
  }

  .share-button {
    margin-bottom: 4rem;
  }

  .layout-key {
    @apply px-0.5 h-14;
  }

  .attempt-key {
    @apply w-14 h-14;
  }

  @media (max-height: 800px) {
    .footer-wrapper {
      display: none;
    }

    .share-button {
      margin-bottom: 1rem;
    }

    .layout-key {
      @apply h-12;
    }

    .attempt-key {
      /* @apply w-13 h-13; */
      width: 3.25rem;
      height: 3.25rem;
    }
  }
  @media (max-height: 680px) {
    .attempt-key {
      @apply w-12 h-12;
    }
  }
</style>
