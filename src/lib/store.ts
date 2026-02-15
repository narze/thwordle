import { writable } from "svelte/store"
import { browser } from "$app/environment"
import { CharState } from "./Wordle"

interface IStore {
  modalViewed: boolean
  data: Record<string, Day>
  settings?: ISettings
}

export interface ISettings {
  layout: "ก-ฮ" | "Kedmanee"
  darkMode: boolean
  hideTrainingCode: boolean
  [key: string]: any
}

interface Day {
  attempts: any[]
  win?: boolean
  lose?: boolean
}

const defaultSettings: ISettings = { layout: "Kedmanee", darkMode: false, hideTrainingCode: false }

const DEFAULT: IStore = {
  modalViewed: false,
  data: {},
  settings: defaultSettings,
}

const LOCALSTORAGE_KEY = "thwordle-attempts"

const storage: IStore = browser
  ? JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY) || JSON.stringify(DEFAULT))
  : DEFAULT

function storeSettings() {
  if (browser) {
    window.localStorage[LOCALSTORAGE_KEY] = JSON.stringify(storage)
  }
}

export const modalViewed = writable<IStore["modalViewed"]>(
  storage.modalViewed || DEFAULT["modalViewed"]
)
export const data = writable<IStore["data"]>(storage.data || DEFAULT["data"])
export const settings = writable<IStore["settings"]>(storage.settings || DEFAULT["settings"])

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
