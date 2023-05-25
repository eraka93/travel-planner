import { useQuery } from "@tanstack/react-query"
import { Link, useSearchParams } from "react-router-dom"
import { CountryType, getCountries } from "../services/api"

import Loading from "../components/Loading"

import "./Countries.css"
import { useMemo, useCallback } from "react"

function Countries() {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchTerm = useMemo(() => {
    const search = searchParams.get("search")
    if (typeof search === "string") {
      return search
    }
    return ""
  }, [searchParams])

  const {
    data: allCountries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allCountries"],
    queryFn: getCountries,
  })

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = event

      setSearchParams((prevState) => {
        prevState.set("search", value)

        return prevState
      })
    },
    [setSearchParams],
  )

  const filteredCountries = useMemo(
    () =>
      allCountries?.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [allCountries, searchTerm],
  )

  const listOfCountry = useCallback((country: CountryType) => {
    return (
      <Link
        key={country.name}
        className="country-card-link"
        to={`/country/${country.name}`}
        style={{
          backgroundImage: `url(https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg)`,
        }}
      >
        <div className="country-overlay">
          <div className="country-name">{country.name}</div>
          <div className="country-region">{country.region}</div>
        </div>
      </Link>
    )
  }, [])

  const noResults = useMemo(() => {
    if (isLoading) {
      return false
    }
    return !(
      filteredCountries &&
      Array.isArray(filteredCountries) &&
      filteredCountries.length > 0
    )
  }, [isLoading, filteredCountries])

  if (isError) {
    return (
      <div className="container">
        <h3>Error occurred while fetching data.</h3>
      </div>
    )
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container">
      <div className="travel-guide">
        <h2>Travel Guide</h2>
        <p>Choose a country from the list below to begin your adventure.</p>
        <p>You can also search by country name.</p>
        <div className="search-box">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for a country..."
          />
        </div>
      </div>
      <div className="country-list">
        {noResults && <p>No results</p>}
        {filteredCountries?.map((country) => listOfCountry(country))}
      </div>
    </div>
  )
}

export default Countries
