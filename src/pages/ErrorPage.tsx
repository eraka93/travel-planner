import React from "react"
import { Link } from "react-router-dom"
import "./ErrorPage.css"

const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <h1>Oops! Something went wrong.</h1>
      <p>We're sorry, but the page you're looking for could not be found.</p>
      <Link className="home-button" to={"/"}>
        Go to Home
      </Link>
    </div>
  )
}

export default ErrorPage
