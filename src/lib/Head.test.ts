import "@testing-library/jest-dom"

import { render } from "@testing-library/svelte"

import Head from "./Head.svelte"

it("works", () => {
  const { component } = render(Head, {
    title: "Twitter",
    url: "http://twitter.com/foo",
    description: "foo",
    imageUrl: "bar",
    gtagId: "baz",
  })

  expect(component).toBeDefined()
})
