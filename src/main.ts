import "./app.css"
import { mount } from "svelte"
import Main from "./Main.svelte"

const app = mount(Main, {
  target: document.getElementById("app")!,
  intro: true,
})

export default app
