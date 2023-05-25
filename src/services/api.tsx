import axios, { AxiosResponse } from "axios"

const CountryAPI = axios.create({
  baseURL: "http://api.countrylayer.com/v2",
  params: {
    access_key: import.meta.env.VITE_COUNTRY_LAYER_API_KEY,
  },
})

const YoutubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
  },
})

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

export type YouTubeComment = {
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

export const getCountries = () => {
  return CountryAPI.get<CountryType[]>(`/all`, { timeout: 5000 }).then(
    (response) => response.data,
  )
}

export const getCountry = (countryName: string) => {
  return CountryAPI.get<CountryType[]>(`/name/${countryName}`, {
    timeout: 5000,
    params: {
      fullText: true,
    },
  }).then((response) => response.data?.[0])
}

export const getYouTubeVideoId = (countryName: string) => {
  return YoutubeAPI.get(`/search`, {
    timeout: 5000,
    params: {
      q: `${countryName} travel, best place to visit`,
      maxResults: 1,
      type: "video",
      part: "id",
    },
  }).then((response) => {
    console.log(response)
    return response.data.items[0]?.id.videoId
  })
}

export const getYouTubeComments = (video_id: string) => {
  return YoutubeAPI.get("/commentThreads", {
    timeout: 5000,
    params: {
      textFormat: "plainText",
      part: "snippet",
      videoId: `${video_id}`,
      maxResults: 10,
    },
  }).then((response) => {
    const data = response.data.items
    const randomIndex = Math.floor(Math.random() * data.length)
    return data[randomIndex]
  })
}
