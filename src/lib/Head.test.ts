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

it("renders with measurement ID G-F2Q37REQE6", () => {
  const { component } = render(Head, {
    title: "Test Title",
    url: "http://test.com",
    description: "Test description",
    imageUrl: "test.jpg",
    gtagId: "G-F2Q37REQE6",
  })

  expect(component).toBeDefined()
})
