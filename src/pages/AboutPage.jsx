// import React from "react";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="about-message">
      <div className="about-message_text">
        <h1>Hello!</h1>{" "}
        <p>
          {" "}
          My name is Maria and I’m junior full stack JavaScript developer,
          freshly graduated from Ironhack bootcamp.{" "}
        </p>
        <p>
          This web app is a BtoC platform where the professional car dealers can
          publish, edit and remove their sale offers. The professional account
          allows also to view all your current offers at once. The offer page
          displays the information about the vehicle characteristics as well as
          the date of publication, the name of the car dealer, his phone number
          and the address. The location is visually presented on Google Maps.
          The data is fetched by Google API.{" "}
        </p>
        <p>
          The client user can filter the current offers by vehicle
          characteristics, price and location. The fetched data can be sorted by
          price in ascending and descending order. The logged in user can add
          offers to the list of favourites and remove them. It is also possible
          to view the full list of your current favourites.{" "}
        </p>
        <div id="about-page-tech_used">
          <h3>Technologies Used</h3>{" "}
          <ul>
            <h4>
              Frontend: <span>React.js</span>
            </h4>
          </ul>
          <ul>
            <h4>
              Backend: <span>Express.js</span>
            </h4>
          </ul>{" "}
          <ul>
            <h4>
              Database: <span>MongoDB Atlas</span>
            </h4>
          </ul>
          <ul>
            <h4>
              Authentication: <span>JSON web token</span>
            </h4>
          </ul>
          <ul>
            <h4>
              API: <span>Google Maps API</span>
            </h4>
          </ul>
          <ul>
            <h4>
              Styling: <span>FontAwesome Icons</span>
            </h4>
          </ul>
        </div>
        You can check out the code on my GitHub:
        <Link to="https://github.com/maria-lavrinenko">
          {" "}
          https://github.com/maria-lavrinenko.
        </Link>{" "}
        <p>
          This project is my first full-stack web application. Contributions are
          welcome!{" "}
        </p>
        <p>Feel free to open issues or submit pull requests.</p>
      </div>
      <div id="about-page_pictures">
        <div id="first-about-picture">
          <img src="/cat-2.jpg" alt="" />
        </div>
        <div id="second-about-picture">
          <img src="/cat-1.jpg" alt="" />
        </div>
      </div>
      Thank you for your interest and happy coding to everyone!{" "}
      {"\uD83D\uDC99 "}
    </div>
  );
}

export default AboutPage;
