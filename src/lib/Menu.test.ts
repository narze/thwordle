import "@testing-library/jest-dom"

import { render } from "@testing-library/svelte"

import Menu from "./Menu.svelte"

it("works", () => {
  const { getByText } = render(Menu, {
    items: [{ name: "Twitter", url: "http://twitter.com/foo" }],
  })

  expect(getByText("Twitter")).toBeInTheDocument()
  expect(getByText("Twitter")).toHaveAttribute("href", "http://twitter.com/foo")
})
