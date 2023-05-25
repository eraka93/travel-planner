import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  getCountry,
  getYouTubeComments,
  getYouTubeVideoId,
} from "../services/api"
import { useParams } from "react-router-dom"

import Loading from "../components/Loading"
import Comments from "../components/Comments"

import "./Country.css"

function Country() {
  const { name: countryName } = useParams()
  const {
    data: country,
    isLoading: isLoadingCountry,
    isError: isErrorCountry,
  } = useQuery(["country", countryName], () => getCountry(countryName ?? ""), {
    enabled: !!countryName,
  })

  const {
    data: youtubeVideoId,
    isLoading: isLoadingVideoId,
    isError: isErrorVideoId,
  } = useQuery(
    ["youtube/link", countryName],
    () => getYouTubeVideoId(countryName ?? ""),
    {
      enabled: !!countryName,
    },
  )

  const {
    data: youTubeComment,
    isLoading: isLoadingComment,
    isError: isErrorComment,
  } = useQuery(
    ["youtube/comments", youtubeVideoId],
    () => getYouTubeComments(youtubeVideoId),
    {
      enabled: !!youtubeVideoId,
    },
  )

  const youTubeLink = useMemo(
    () => `https://youtube.com/embed/${youtubeVideoId}`,
    [youtubeVideoId],
  )

  if (isErrorComment || isErrorCountry || isErrorVideoId) {
    return (
      <div className="container">
        <h3>Error occurred while fetching data</h3>
      </div>
    )
  }

  if (isLoadingCountry || isLoadingVideoId || isLoadingComment) {
    return <Loading />
  }

  return (
    <>
      <div className="container-country">
        <div className="country">
          <h2>{country.name}</h2>
          <div className="country-info">
            <div className="country-info-overlay">
              <div>
                <p>
                  <strong>Capital:</strong> {country.capital}
                </p>
                <p>
                  <strong>Region:</strong> {country.region}
                </p>
                <p>
                  <strong>Country code:</strong> +{country.callingCodes[0]}
                </p>
                <p>
                  <strong>Domain:</strong> {country.topLevelDomain[0]}
                </p>
              </div>
              <img
                className="country-flag"
                width={120}
                src={`https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg`}
                alt={country.name}
              />
            </div>
            <iframe
              className="youtube-video"
              src={youTubeLink}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
            {
              <div>
                <div className="youtube">
                  <p>
                    <strong>YouTube comment:</strong>
                  </p>
                  <a
                    className="youtube-button"
                    target="_blank"
                    rel="noopener"
                    href={`https://www.youtube.com/watch?v=${youTubeComment?.snippet.videoId}}&lc=${youTubeComment?.snippet.topLevelComment.id}`}
                  >
                    OPEN YOUTUBE
                  </a>
                </div>
                <div className="youtube-comment">
                  <img
                    className="youtube-comment-icon"
                    width={35}
                    height={35}
                    src={
                      youTubeComment?.snippet.topLevelComment.snippet
                        .authorProfileImageUrl
                    }
                    alt={
                      youTubeComment?.snippet?.topLevelComment.snippet
                        .authorDisplayName
                    }
                  />
                  <div className="youtube-comment-overlay">
                    <div className="youtube-comment-author">
                      {
                        youTubeComment?.snippet?.topLevelComment.snippet
                          .authorDisplayName
                      }
                    </div>
                    <div className="youtube-comment-text">
                      {
                        youTubeComment?.snippet?.topLevelComment.snippet
                          .textDisplay
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <div className="comments-section">
          {countryName && <Comments country={countryName} />}
        </div>
      </div>
    </>
  )
}

export default Country
