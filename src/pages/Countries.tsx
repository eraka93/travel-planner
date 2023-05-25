import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { getCountries } from "../services/api"
import { Helmet } from "react-helmet"

import Loading from "../components/Loading"

import "./Countries.css"
import { SetStateAction, useState } from "react"

export type CountryType = {
  name: string
  topLevelDomain: string[]
  alpha2Code: string
  alpha3Code: string
  callingCodes: string[]
  capital: string
  altSpellings: string[]
  region: string
}

function Countries() {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const {
    data: allCountries,
    isLoading,
    isError,
  } = useQuery<any, unknown, CountryType[]>({
    queryKey: ["allCountries"],
    queryFn: getCountries,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
  })

  document.title = "List of all countries"

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearchTerm(event.target.value)
  }

  const filteredCountries = allCountries?.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  function handleClick(countryName: string) {
    navigate(`/country/${countryName}`)
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>
  }

  return (
    <>
      <Helmet>
        <title>List of all countries</title>
      </Helmet>
      <div className="container">
        <div className="travel-guide">
          <h2>Travel Guide</h2>
          <p>Pick a country from the list below to start your journey.</p>
          <p>Also you can search by country name</p>
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
          {filteredCountries?.map((country) => (
            <div
              key={country.name}
              className="country-card"
              onClick={() => handleClick(country.name ?? "")}
              style={{
                backgroundImage: `url(https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg)`,
              }}
            >
              <div className="country-overlay">
                <div className="country-name">{country.name}</div>
                <div className="country-region">{country.region}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Countries
