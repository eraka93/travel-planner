import axios from "axios"

export const getCountries = async () => {
  try {
    const response = await axios.get(
      `http://api.countrylayer.com/v2/all?access_key=${
        import.meta.env.VITE_COUNTRY_LAYER_API_KEY
      }`,
      { timeout: 3000 },
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getCountry = async (countryName: string) => {
  const response = await axios.get(
    `http://api.countrylayer.com/v2/name/${countryName}?access_key=${
      import.meta.env.VITE_COUNTRY_LAYER_API_KEY
    }&fullText=true`,
    { timeout: 3000 },
  )
  return response.data[0]
}

export const getYouTubeVideoId = async (countryName: string) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        timeout: 3000,
        params: {
          q: `${countryName} travel, best place to visit`,
          maxResults: 1,
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
          type: "video",
          part: "id",
        },
      },
    )
    // Extract the video ID from the API response
    const videoId = response.data.items[0]?.id.videoId
    return videoId
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getYouTubeComments = async (video_id: string) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/commentThreads",
      {
        timeout: 3000,
        params: {
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
          textFormat: "plainText",
          part: "snippet",
          videoId: `${video_id}`,
          maxResults: 10,
        },
      },
    )
    const data = response.data.items
    const randomIndex = Math.floor(Math.random() * data.length)
    return data[randomIndex]
  } catch (error) {
    console.error(error)
    return null
  }
}
