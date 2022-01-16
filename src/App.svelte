<script lang="ts">
  import "twind/shim"
  import { tw } from "twind"
  import logo from "./assets/svelte.png"
  import Head from "./lib/Head.svelte"
  import Kofi from "./lib/Kofi.svelte"
  import Menu from "./lib/Menu.svelte"
  import Social from "./lib/Social.svelte"
  import { CharState, splitWord, validateWord } from "./lib/Wordle"
  import words from "./lib/words"

  const url = "https://single-page-svelte.vercel.app"
  const title = "Single Page Svelte"

  const menuItems = [{ name: "Github", url: "https://github.com/narze/single-page-svelte" }]

  const description = "Build a single page app with Svelte, quickly."
  const imageUrl =
    "https://raw.githubusercontent.com/narze/timelapse/master/projects/single-page-svelte_home.png"
  const gtagId = null

  let input = ""
  let solution = words[Math.floor(Math.random() * words.length)]
  let validate

  $: input = input.replace(/[^ก-๙a-zA-Z]/g, "")

  $: validate = validateWord(input, solution)
  $: console.log(validate)

  const colors = {
    [CharState.Correct]: "bg-green-500 border-green-500",
    [CharState.OutOfPlace]: "bg-yellow-500 border-yellow-500",
    [CharState.Wrong]: "bg-slate-500 border-slate-500",
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
  <input type="text" class="border" bind:value={input} />
  <!-- Solution word -->
  <input type="text" class="border" bind:value={solution} />
  <!-- Output -->
  <div class="flex justify-center my-20">
    {#each validate as { correct, char }}
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
  {JSON.stringify(validate)}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
      "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
