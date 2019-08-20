import React from "react"

import { render, fireEvent } from "@testing-library/react"

import Test from "./Test"

test("renders a number input with a label 'Favorite Number'", () => {
  const { getByTestId } = render(<Test />)
  const input = getByTestId("input123")
  expect(input).toHaveAttribute("type", "number")
})

test("entering an invalid value shows an error message", () => {
  const { getByLabelText, debug } = render(<Test />)
  debug()
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, { target: { value: 10 } })
  debug()
})
