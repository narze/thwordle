<script lang="ts">
  import {
    calculateCurrentStreak,
    calculateGamesCount,
    calculateGuessDistribution,
    calculateMaxStreak,
    calculateWinPercentage,
    filterNormalDays,
    filterSpecialDays,
  } from "./Stats"

  import { data } from "./store"

  export let isSpecialStats = false

  let attemptsData = {}

  if (isSpecialStats) {
    attemptsData = filterSpecialDays($data)
  } else {
    attemptsData = filterNormalDays($data)
  }

  let gamesCount = calculateGamesCount(attemptsData)
  let winPercentage = calculateWinPercentage(attemptsData)
  let currentStreak = calculateCurrentStreak(attemptsData)
  let maxStreak = calculateMaxStreak(attemptsData)
  let guessDist = calculateGuessDistribution(attemptsData)
  let guessDistMax = Math.max(...guessDist)
</script>

<div class="flex flex-col items-center gap-4">
  <h2 class="text-xl font-bold">สถิติ</h2>

  <div class="flex gap-4 w-full justify-center px-2 sm:px-4">
    <div
      class="flex flex-col flex-1 text-center text-sm sm:text-base p-2 bg-slate-200 rounded-lg justify-center"
    >
      <div class="text-3xl sm:text-4xl">{gamesCount}</div>
      <div class="text-sm sm:text-xl">เกม</div>
    </div>
    <div
      class="flex flex-col flex-1 text-center text-sm sm:text-base p-2 bg-slate-200 rounded-lg justify-center"
    >
      <div class="text-3xl sm:text-4xl">{winPercentage}</div>
      <div class="text-sm sm:text-xl">% ชนะ</div>
    </div>
    <div
      class="flex flex-col flex-1 text-center text-sm sm:text-base p-2 bg-slate-200 rounded-lg justify-center"
    >
      <div class="text-3xl sm:text-4xl">{currentStreak}</div>
      <div class="text-base sm:text-xl">วันติดกัน</div>
    </div>
    <div
      class="flex flex-col flex-1 text-center text-sm sm:text-base p-2 bg-slate-200 rounded-lg justify-center"
    >
      <div class="text-3xl sm:text-4xl">{maxStreak}</div>
      <div class="text-base sm:text-xl">วันติดกัน (สูงสุด)</div>
    </div>
  </div>

  <h2 class="text-xl font-bold mt-8">จำนวนครั้ง</h2>

  <div class="flex flex-col gap-1 w-full sm:px-2">
    <div class="flex">
      <span class="px-2 py-1 w-4">1</span><span
        class="ml-2 px-2 py-1 bg-gray-400 text-white font-bold text-right rounded"
        style={`width: ${Math.max(7, (100 * guessDist[0]) / guessDistMax)}%`}>{guessDist[0]}</span
      >
    </div>
    <div class="flex">
      <span class="px-2 py-1 w-4">2</span><span
        class="ml-2 px-2 py-1 bg-gray-400 text-white font-bold text-right rounded"
        style={`width: ${Math.max(7, (100 * guessDist[1]) / guessDistMax)}%`}>{guessDist[1]}</span
      >
    </div>
    <div class="flex">
      <span class="px-2 py-1 w-4">3</span><span
        class="ml-2 px-2 py-1 bg-gray-400 text-white font-bold text-right rounded"
        style={`width: ${Math.max(7, (100 * guessDist[2]) / guessDistMax)}%`}>{guessDist[2]}</span
      >
    </div>
    <div class="flex">
      <span class="px-2 py-1 w-4">4</span><span
        class="ml-2 px-2 py-1 bg-gray-400 text-white font-bold text-right rounded"
        style={`width: ${Math.max(7, (100 * guessDist[3]) / guessDistMax)}%`}>{guessDist[3]}</span
      >
    </div>
    <div class="flex">
      <span class="px-2 py-1 w-4">5</span><span
        class="ml-2 px-2 py-1 bg-gray-400 text-white font-bold text-right rounded"
        style={`width: ${Math.max(7, (100 * guessDist[4]) / guessDistMax)}%`}>{guessDist[4]}</span
      >
    </div>
    <div class="flex">
      <span class="px-2 py-1 w-4">6</span><span
        class="ml-2 px-2 py-1 bg-gray-400 text-white font-bold text-right rounded"
        style={`width: ${Math.max(7, (100 * guessDist[5]) / guessDistMax)}%`}>{guessDist[5]}</span
      >
    </div>
    <div class="flex">
      <span class="px-2 py-1 w-4">X</span><span
        class="ml-2 px-2 py-1 bg-gray-400 text-white font-bold text-right rounded"
        style={`width: ${Math.max(7, (100 * guessDist[6]) / guessDistMax)}%`}>{guessDist[6]}</span
      >
    </div>
  </div>
</div>
