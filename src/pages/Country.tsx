import { useEffect, useState } from "react"
import { QueryKey, useQuery } from "@tanstack/react-query"
import {
  getCountry,
  getYouTubeComments,
  getYouTubeVideoId,
} from "../services/api"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet"

import { CountryType } from "./Countries"
import Loading from "../components/Loading"
import Comments from "../components/Comments"

import "./Country.css"

type YouTubeComment = {
  kind: string
  etag: string
  id: string
  snippet: {
    videoId: string
    topLevelComment: {
      kind: string
      etag: string
      id: string
      snippet: {
        videoId: string
        textDisplay: string
        textOriginal: string
        authorDisplayName: string
        authorProfileImageUrl: string
        authorChannelUrl: string
        authorChannelId: {
          value: string
        }
        canRate: boolean
        viewerRating: string
        likeCount: number
        publishedAt: string
        updatedAt: string
      }
    }
    canReply: boolean
    totalReplyCount: number
    isPublic: boolean
  }
}

function Country() {
  const [youTubeLink, setYouTubeLink] = useState("")
  const [youTubeComment, setYouTubeComment] = useState<YouTubeComment>()

  const { name: countryName } = useParams()
  const {
    data: country,
    isLoading,
    isError,
  } = useQuery<unknown, unknown, CountryType, QueryKey>(
    ["country", countryName],
    () => getCountry(countryName ?? ""),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!countryName,
      refetchOnMount: false,
    },
  )

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoId = await getYouTubeVideoId(countryName ?? "")
        const commentYouTube = await getYouTubeComments(videoId)
        setYouTubeComment(commentYouTube ?? [])
        setYouTubeLink(`https://www.youtube.com/embed/${videoId}` ?? "")
      } catch (error) {
        console.error(error)
      }
    }
    fetchVideo()
  }, [countryName])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>
  }

  return (
    <>
      <Helmet>
        <title>{countryName}</title>
      </Helmet>
      <div className="country-page">
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
          <div className="youtube-video">
            <iframe
              width="420"
              height="280"
              src={youTubeLink}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
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

        {countryName && <Comments country={countryName} />}
      </div>
    </>
  )
}

export default Country
