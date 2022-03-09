<script lang="ts">
  import { data, modalViewed, settings } from "./store"

  console.log({ data })
  let gamesCount = 10
  let winPercentage = 90
  let currentStreak = 1
  let maxStreak = 2
  let guessDist = [0, 2, 3, 4, 1, 3]
  let guessDistMax = Math.max(...guessDist)
</script>

<div class="container flex flex-col items-center bg-slate-300">
  <h2 class="text-xl font-bold">สถิติ</h2>

  <div class="flex gap-4 mt-4">
    <div class="flex flex-col text-center w-16">
      <div class="text-2xl">{gamesCount}</div>
      <div>เกม</div>
    </div>
    <div class="flex flex-col text-center w-16">
      <div class="text-2xl">{winPercentage}</div>
      <div>% ชนะ</div>
    </div>
    <div class="flex flex-col text-center w-16">
      <div class="text-2xl">{currentStreak}</div>
      <div>วันติดกัน</div>
    </div>
    <div class="flex flex-col text-center w-16">
      <div class="text-2xl">{maxStreak}</div>
      <div>วันติดกัน (สูงสุด)</div>
    </div>
  </div>

  <h2 class="text-xl font-bold mt-8">จำนวนครั้ง</h2>

  <div class="">
    <div class="w-[400px] flex">
      <span class="p-2 w-4">1</span><span
        class="ml-2 p-2 bg-slate-500 text-right"
        style={`width: ${Math.max(7, (100 * guessDist[0]) / guessDistMax)}%`}>{guessDist[0]}</span
      >
    </div>
    <div class="w-[400px] flex">
      <span class="p-2 w-4">2</span><span
        class="ml-2 p-2 bg-slate-500 text-right"
        style={`width: ${Math.max(7, (100 * guessDist[1]) / guessDistMax)}%`}>{guessDist[1]}</span
      >
    </div>
    <div class="w-[400px] flex">
      <span class="p-2 w-4">3</span><span
        class="ml-2 p-2 bg-slate-500 text-right"
        style={`width: ${Math.max(7, (100 * guessDist[2]) / guessDistMax)}%`}>{guessDist[2]}</span
      >
    </div>
    <div class="w-[400px] flex">
      <span class="p-2 w-4">4</span><span
        class="ml-2 p-2 bg-slate-500 text-right"
        style={`width: ${Math.max(7, (100 * guessDist[3]) / guessDistMax)}%`}>{guessDist[3]}</span
      >
    </div>
    <div class="w-[400px] flex">
      <span class="p-2 w-4">5</span><span
        class="ml-2 p-2 bg-slate-500 text-right"
        style={`width: ${Math.max(7, (100 * guessDist[4]) / guessDistMax)}%`}>{guessDist[4]}</span
      >
    </div>
    <div class="w-[400px] flex">
      <span class="p-2 w-4">6</span><span
        class="ml-2 p-2 bg-slate-500 text-right"
        style={`width: ${Math.max(7, (100 * guessDist[5]) / guessDistMax)}%`}>{guessDist[5]}</span
      >
    </div>
  </div>
</div>
