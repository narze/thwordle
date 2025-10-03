import { test } from "vitest"
import { render } from "@testing-library/svelte"

import Social from "./Social.svelte"

test("works", () => {
  const { component } = render(Social, {
    title: "Twitter",
    url: "http://twitter.com/foo",
  })

  expect(component).toBeDefined()
})
