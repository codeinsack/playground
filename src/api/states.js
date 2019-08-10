import { request } from "~/axios"

const getCountries = async () => request.get("/countries")

export const CountriesApi = {
  getCountries,
}
