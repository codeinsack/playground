import React from "react"
import { useStore, useList, useStoreMap } from "effector-react"

import {
  $countries,
  $firstTenCountries,
  fetchCountries,
  $sampled,
  $filtered,
  api,
} from "~/model/states"

const Effector = () => {
  const countries = useStore($countries)
  const firstTenCountries = useList($firstTenCountries, ({ name }, index) => (
    <div key={index}>
      {name}
    </div>
  ))
  const japan = useStoreMap({
    store: $countries,
    keys: ["Japan"],
    fn: (lands, [necessaryName]) => lands.data.find(land => land.name === necessaryName) || null,
  })
  const sampled = useStore($sampled)
  const filtered = useStore($filtered)
  console.log("countries", countries)
  // console.log("firstTenCountries", firstTenCountries)
  // console.log("japan", japan)
  // console.log("sampled", sampled)
  // console.log("filtered", filtered)

  const handleClick = () => {
    fetchCountries()
  }

  const handleClickFirstPart = () => {
    api.getFirstPart()
  }

  const handleClickQuarterPart = () => {
    api.getQuarterPart()
  }

  return (
    <div className="App">
      <button type="button" onClick={handleClick}>Fetch countries</button>
      <button type="button" onClick={handleClickFirstPart}>First part</button>
      <button type="button" onClick={handleClickQuarterPart}>Quarter part</button>
      {firstTenCountries}
    </div>
  )
}

export default Effector
