import "@testing-library/jest-dom"

import { render } from "@testing-library/svelte"

import Social from "./Social.svelte"

it("works", () => {
  const { component } = render(Social, {
    title: "Twitter",
    url: "http://twitter.com/foo",
  })

  expect(component).toBeDefined()
})
