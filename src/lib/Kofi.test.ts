import { test } from "vitest"
import { render } from "@testing-library/svelte"

import Kofi from "./Kofi.svelte"

test("works", () => {
  const { getByText } = render(Kofi, { name: "foo", label: "Pay me" })

  expect(getByText("Pay me")).toBeInTheDocument()
})
