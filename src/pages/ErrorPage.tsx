import React from "react"
import { useNavigate } from "react-router-dom"
import "./ErrorPage.css"

const ErrorPage = () => {
  const navigate = useNavigate()

  const navigateToHome = () => {
    navigate("/")
  }

  return (
    <div className="error-page-container">
      <h1>Oops! Something went wrong.</h1>
      <p>We're sorry, but the page you're looking for could not be found.</p>
      <p>
        Possible errors include exceeding the allowed number of requests for the
        Country Layer API or YouTube API.
      </p>
      <p>
        Please try generating a new API Key and replacing it in the .env file.
      </p>
      <button className="home-button" onClick={navigateToHome}>
        Go to Home
      </button>
    </div>
  )
}

export default ErrorPage
