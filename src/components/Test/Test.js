import React, { useState } from "react"

const Test = ({ min, max }) => {
  const [number, setNumber] = useState(0)
  const [numberEntered, setNumberEntered] = useState(0)

  const handleChange = (event) => {
    setNumberEntered(true)
    setNumber(Number(event.target.value))
  }

  const isValid = !numberEntered || (number >= min && number <= max)

  return (
    <div>
      <label htmlFor="favorite-number">Favorite number</label>
      <input
        data-testid="input123"
        id="favorite-number"
        type="number"
        value={number}
        onChange={handleChange}
      />
      {isValid ? null : (
        <div>The number is invalid</div>
      )}
    </div>
  )
}

export default Test
