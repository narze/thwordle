import "@testing-library/jest-dom"

import { render } from "@testing-library/svelte"

import Kofi from "./Kofi.svelte"

it("works", () => {
  const { getByText } = render(Kofi, { name: "foo", label: "Pay me" })

  expect(getByText("Pay me")).toBeInTheDocument()
})
