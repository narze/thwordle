<script lang="ts">
    import SpecialModal from './SpecialSelectorModal.svelte'
    import SettingModal from "./SettingModal.svelte"
    import StatsModal from "./StatsModal.svelte"

    export let modes: string
    export let modalViewed
    let statsModal = false
    let settingModal = false
    let showSpecialModal = false

    let daily: boolean = false
    let special = false
    let training = false

    if ( modes == "daily" ) {
        daily = !daily
    } else if ( modes == "speacial" ) {
        special = !special
    } else {
        training = !training
    }
</script>

<header class="mb-4 w-full h-10 py-2">
    <div class="flex justify-between w-full px-4 h-10">
      <span class="flex justify-center h-full dark:text-white"
        ><button on:click={() => modalViewed.set(false)}>วิธีเล่น</button></span
      >
      <h1
        class="absolute text-center inset-x-0 top-4 leading-4 text-2xl text-red-400 mb-2 pointer-events-none"
      >
        Thwordle
      </h1>
      <span class="flex gap-4 justify-center h-full dark:text-white">
        {#if training || special}
        <button
          class="text-red-400 underline"
          on:click={() => {
            window.location.href = "/"
          }}>Daily</button
        >
        {/if}
          {#if daily || training}
          <button
            class="text-teal-800 underline"
            on:click={() => {
              showSpecialModal = !showSpecialModal
            }}>Special</button
          >
          {/if}
          {#if daily || special}
        <button
          class="text-amber-600 underline"
          on:click={() => {
            window.location.href = "/#/training"
          }}>Training</button
        >
        {/if}
        <button on:click={() => (statsModal = true)}>สถิติ</button>
        <button on:click={() => (settingModal = true)}>ตั้งค่า</button>
      </span>
    </div>
    <hr />
  </header>

  {#if settingModal}
    <SettingModal
      onClose={() => {
        settingModal = false
      }}
    />
  {/if}

  {#if statsModal}
    <StatsModal
      onClose={() => {
        statsModal = false
      }}
      special={false}
    />
  {/if}

  {#if showSpecialModal}
    <SpecialModal
      onClose={() => {
        showSpecialModal = false
      }}
    />
  {/if}