import "./app.css"
import Main from "./Main.svelte"

const app = new Main({
  target: document.getElementById("app"),
  intro: true,
  // hydrate: true,
})

export default app
