import { test } from "vitest"
import { render } from "@testing-library/svelte"

import Menu from "./Menu.svelte"

test("works", () => {
  const { getByText } = render(Menu, {
    items: [{ name: "Twitter", url: "http://twitter.com/foo" }],
  })

  expect(getByText("Twitter")).toBeInTheDocument()
  expect(getByText("Twitter")).toHaveAttribute("href", "http://twitter.com/foo")
})
