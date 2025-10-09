import { render } from "@testing-library/svelte"
import { test, vi } from "vitest"

import App from "./App.svelte"

vi.mock("svelte", async () => {
  const originalModule = await vi.importActual("svelte")

  return {
    ...originalModule,
    onMount: vi.fn((args) => console.log("onMount called", args)),
  }
})

test("works", () => {
  const { getByText } = render(App, {})
  expect(getByText("Thwordle")).toBeInTheDocument()
})
