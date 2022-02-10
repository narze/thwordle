<!-- Main.svelte -->
<script>
  import { Router, Link, Route } from "svelte-routing"
  import App from "./App.svelte"
  import Special from "./Special.svelte"

  export let url = ""
</script>

<Router {url}>
  <Route path="s/:specialId" component={Special} />
  <Route path="/"><App /></Route>
</Router>
