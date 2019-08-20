import {
  createEvent,
  createEffect,
  restore,
  createStoreObject,
  sample,
  createStore,
  combine,
  createApi,
} from "effector"

import { CountriesApi } from "../api/states"

const $filter = createStore("Ar")

export const fetchCountries = createEvent()
const tickEvent = createEvent()
setInterval(tickEvent, 1000 / 60)

const _fetchCountries = createEffect()

const $source = restore(_fetchCountries, [])
const $length = $source.map(_ => _.length)
export const $firstTenCountries = $source.map(_ => _.slice(0, 10))
export const $countries = createStoreObject({
  data: $source,
  count: $length,
})
const $tick = createStore(0)
  .on(tickEvent, n => n + 1)
export const $sampled = sample(
  $tick,
  $firstTenCountries,
  (countries, tick) => ({ countries, tick }),
)
export const $filtered = combine($source, $filter, (source, filter) => source
  .filter(({ name }) => name.startsWith(filter)))

export const api = createApi($source, {
  getFirstPart: state => state.slice(0, state.length / 2),
  getQuarterPart: state => state.slice(state.length / 2, state.length),
})

fetchCountries.watch(_fetchCountries)

_fetchCountries.use(async () => {
  const { data } = await CountriesApi.getCountries()
  return data
})
