<script lang="ts">
  import "twind/shim"
  import { tw } from "twind"
  import logo from "./assets/svelte.png"
  import Head from "./lib/Head.svelte"
  import Kofi from "./lib/Kofi.svelte"
  import Menu from "./lib/Menu.svelte"
  import Social from "./lib/Social.svelte"
  import { CharState, layout, splitWord, validateWord } from "./lib/Wordle"
  import words from "./lib/words"

  const url = "https://single-page-svelte.vercel.app"
  const title = "Single Page Svelte"

  const menuItems = [{ name: "Github", url: "https://github.com/narze/single-page-svelte" }]

  const description = "Build a single page app with Svelte, quickly."
  const imageUrl =
    "https://raw.githubusercontent.com/narze/timelapse/master/projects/single-page-svelte_home.png"
  const gtagId = null
  const words5to7 = words.filter((word) => {
    const w = splitWord(word)
    return w.length >= 5 && w.length <= 7
  })
  const alphabets = "กขคฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮะัาิีึืุูเแโำใไฤ"

  let input = ""
  let solution = words5to7[Math.floor(Math.random() * words5to7.length)]
  let attempts: string[] = []
  let validations = []
  let gameEnded = false

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

  function submit() {
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
  }
</script>

<Kofi name="narze" label="Support Me" />
<Menu items={menuItems} />
<Social {url} {title} />
<Head {title} {description} {url} {imageUrl} {gtagId} />

<main class="w-full h-screen flex flex-col justify-center items-center">
  <h1 class="text-6xl text-green-400 flex flex-col">
    <span>Thwordle</span>
  </h1>

  <!-- Input word -->
  <input type="text" class="border" on:keypress={onKeypress} bind:value={input} />

  <button
    on:click={submit}
    class="flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer bg-slate-200 hover:bg-slate-300 active:bg-slate-400"
  >
    Enter</button
  >

  <!-- Solution word -->
  <!-- <input type="text" class="border" bind:value={solution} /> -->
  <!-- Check Solution -->
  {#each attempts.slice(-6) as input}
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

  <!-- Layout -->
  <div class="grid grid-cols-10 justify-center mb-1 mt-8">
    {#each Object.entries(alphabetsLayout) as [alphabet, correctState]}
      <div
        class={colors[correctState] +
          " w-12 h-12 border-solid border-2 flex items-center justify-center m-0.5 text-lg font-bold rounded text-black"}
      >
        {alphabet}
      </div>
    {/each}
  </div>

  <!-- Debug -->
  <!-- <div class="flex justify-center my-20">
    <div>DEBUG</div>
    {JSON.stringify(attempts)}
  </div> -->
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
      "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
