import "@testing-library/jest-dom"

import { render } from "@testing-library/svelte"

import App from "./App.svelte"

it("works", () => {
  const { getByText } = render(App, {})

  expect(getByText("Svelte")).toBeInTheDocument()
})
