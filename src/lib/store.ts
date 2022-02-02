import { writable } from "svelte/store"
import { CharState } from "./Wordle"

interface IStore {
  modalViewed: boolean
  data: Record<string, Day>
  settings?: ISettings
}

export interface ISettings {
  layout: "ก-ฮ" | "Kedmanee"
  [key: string]: any
}

interface Day {
  attempts: any[]
  win?: boolean
  lose?: boolean
}

const defaultSettings: ISettings = { layout: "Kedmanee" }

const DEFAULT: IStore = {
  modalViewed: false,
  data: {},
  settings: defaultSettings,
}

const lsKey = "thwordle-attempts"

// export const store = writable<IStore>(
//   JSON.parse(
//     window.localStorage.getItem(lsKey) || JSON.stringify(DEFAULT)
//   )
// )

const storage: IStore = JSON.parse(window.localStorage.getItem(lsKey) || JSON.stringify(DEFAULT))

// store.subscribe((value) => {
//   window.localStorage[lsKey] = JSON.stringify(value)
// })

function storeSettings() {
  window.localStorage[lsKey] = JSON.stringify(storage)
}

export const modalViewed = writable<IStore["modalViewed"]>(storage.modalViewed)
export const data = writable<IStore["data"]>(storage.data)
export const settings = writable<IStore["settings"]>(storage.settings)

modalViewed.subscribe((value) => {
  storage.modalViewed = value
  storeSettings()
})

data.subscribe((value) => {
  storage.data = value
  storeSettings()
})

settings.subscribe((value) => {
  storage.settings = value
  storeSettings()
})

export default {
  modalViewed,
  data,
  settings,
}
