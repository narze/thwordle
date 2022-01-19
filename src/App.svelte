<script lang="ts">
  import "twind/shim"
  import { tw } from "twind"
  import logo from "./assets/svelte.png"
  import Head from "./lib/Head.svelte"
  import Kofi from "./lib/Kofi.svelte"
  import Menu from "./lib/Menu.svelte"
  import Social from "./lib/Social.svelte"
  import { CharState, getShareResults, layout, splitWord, validateWord } from "./lib/Wordle"
  import words from "./lib/words"
  import { tick } from "svelte"
  import Modal from "./lib/Modal.svelte"

  const url = "https://thwordle.vercel.app"
  const title = "Thwordle"

  const menuItems = [{ name: "Github", url: "https://github.com/narze/thwordle" }]

  const description = "Wordle clone, but it's Thai."
  const imageUrl =
    "https://raw.githubusercontent.com/narze/timelapse/master/projects/thwordle_home.png"

  const gtagId = null
  const words5to7 = words.filter((word) => {
    const w = splitWord(word)
    return w.length >= 5 && w.length <= 7
  })
  const alphabets = "กขคฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮะัาิีึืุูเแโำใไฤ"

  // January 19, 2022 Game Epoch
  const epochMs = 1642525200000
  const now = Date.now()
  const msInDay = 86400000
  const dateIndex = Math.floor((now - epochMs) / msInDay)

  let input = ""
  // let solution = words5to7[Math.floor(Math.random() * words5to7.length)]
  let solution = words5to7[dateIndex % words5to7.length]
  let attempts: string[] = []
  let validations = []
  let gameEnded = false
  let attemptsContainer
  let modal = true
  let copied = false

  $: solutionLength = splitWord(solution).length

  $: input = input.replace(/[^ก-๙]/g, "")
  $: splittedInput = splitWord(input)
  $: alphabetsLayout = layout(alphabets, validations.flat())

  // $: console.log(alphabetsLayout)

  // $: validate = validateWord(input, solution)

  const colors = {
    [CharState.Correct]: "bg-green-500 border-green-500",
    [CharState.OutOfPlace]: "bg-yellow-500 border-yellow-500",
    [CharState.Wrong]: "bg-gray-500 border-gray-500",
    [CharState.NotUsed]: "bg-white",
  }

  function onKeypress(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault()
      submit()
    }
  }

  async function submit() {
    if (gameEnded) {
      return
    }

    // Check if the length is valid
    if (splitWord(input).length != solutionLength) {
      alert("กรุณากรอกคำตอบ")
      return
    }

    // Add to solution array
    attempts = [...attempts, input]

    const validation = validateWord(input, solution)
    validations = [...validations, validation]

    // if all validation is correct
    let win = true
    validation.forEach((v) => {
      if (v.correct !== CharState.Correct) {
        win = false
      }
    })

    if (win) {
      alert("คุณชนะแล้ว!")
      gameEnded = true
    }

    input = ""

    await tick()
    attemptsContainer.scrollTop = attemptsContainer.scrollHeight
  }

  function copyResult() {
    const results = getShareResults(validations)

    navigator.clipboard.writeText(
      `Thwordle ${dateIndex + 1} (${results.length} ครั้ง)\n\n${results.join("\n")}`
    )

    copied = true

    setTimeout(() => {
      copied = false
    }, 2000)
  }
</script>

<Kofi name="narze" label="Support Me" />
<Menu items={menuItems} />
<Social {url} {title} />
<Head {title} {description} {url} {imageUrl} {gtagId} />

<main class="w-full h-screen py-4 flex flex-col items-center">
  <h1 class="text-6xl text-green-400 flex flex-col mb-4">
    <span>{title}<span class="text-sm text-gray-400 ml-2">Beta</span></span>
  </h1>

  วันที่ {dateIndex + 1}

  <!-- Input word -->
  <!-- svelte-ignore a11y-autofocus -->
  <input
    type="text"
    class="border px-4 py-2 text-lg text-center"
    on:keypress={onKeypress}
    bind:value={input}
    autofocus
  />

  {#if gameEnded}
    <button
      on:click={copyResult}
      class="flex items-center justify-center rounded border m-2 px-4 py-2 bg-green-300 border-green-300 text-xs font-bold cursor-pointer bg-slate-200 hover:bg-slate-300 active:bg-slate-400"
    >
      {copied ? "Copied" : "Share"}
    </button>
  {:else}
    <button
      on:click={submit}
      class="flex items-center justify-center rounded border m-2 px-4 py-2 bg-green-300 border-green-300 text-xs font-bold cursor-pointer bg-slate-200 hover:bg-slate-300 active:bg-slate-400"
    >
      Enter</button
    >
  {/if}

  <!-- DEBUG: Solution word -->
  <!-- <input type="text" class="border" bind:value={solution} /> -->
  <!-- Check Solution -->
  <div class="attempts grow overflow-y-auto" bind:this={attemptsContainer}>
    {#each attempts as input}
      <div class="flex justify-center my-1">
        {#each validateWord(input, solution) as { correct, char }}
          <div
            class={`${
              colors[correct] || "bg-white"
            } w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold
      rounded`}
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
            class={`bg-white w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded`}
          >
            {splittedInput[i] || ""}
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Layout -->
  <div class="grid grid-cols-10 justify-center mb-16 mt-8">
    {#each Object.entries(alphabetsLayout) as [alphabet, correctState]}
      <button
        on:click={() => (input += alphabet)}
        class={colors[correctState] +
          " w-12 h-12 border-solid border-2 flex items-center justify-center m-0.5 text-lg font-bold rounded text-black"}
      >
        {alphabet}
      </button>
    {/each}
  </div>

  <!-- Debug -->
  <!-- <div class="flex justify-center my-20">
    <div>DEBUG</div>
    {JSON.stringify(attempts)}
  </div> -->
  {#if modal}
    <Modal
      onClose={() => {
        modal = false
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
</style>
