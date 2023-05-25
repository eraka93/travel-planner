import { Link } from "react-router-dom"
import "./Home.css"

function Home() {
  return (
    <div className="container">
      <h2>Welcome to the our planner app.</h2>
      <h1>FIND & TRAVEL</h1>
      <h4>Place where you can explore and plan your next adventure!</h4>
      <p>Start by selecting a country from the list below:</p>
      <Link className="link" to="all">
        List of Countries
      </Link>
      <p>
        Once you have selected a country, you will be able to see more details
        about it, including:
      </p>
      <div className="list">
        <ul>
          <li>General information about the country</li>
          <li>Interesting facts and landmarks</li>
          <li>A YouTube video showcasing the country</li>
          <li>User comments and reviews</li>
        </ul>
      </div>
      <p>
        Prepare to embark on a captivating journey, delving into the enchanting
        beauty and rich cultural tapestry of diverse countries across the globe!
      </p>
    </div>
  )
}

export default Home
