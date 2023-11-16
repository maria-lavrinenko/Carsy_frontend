import React from "react";
import { Outlet, Link } from "react-router-dom";
import Carousel, { CarouselItem } from "../components/Carousel";

function List(props) {
  console.log(props);
  return (
    <>
      {props.offersToFetch.map((prop) => {
        return (
          <div id="offer-card" key={prop._id}>
            <Link
              to={
                prop.offer ? `/offers/${prop.offer._id}` : `/offers/${prop._id}`
              }
            >
              {prop.offer ? (
                <Carousel indicators={false}>
                  {prop.offer.photo.map((photo) => (
                    <CarouselItem src={photo} width={"100%"} />
                  ))}
                </Carousel>
              ) : (
                <Carousel indicators={false}>
                  {prop.photo.map((photo) => (
                    <CarouselItem src={photo} width={"100%"} />
                  ))}
                </Carousel>
              )}

              <div className="carousel-offer-info">
                <h3>{prop.brand ?? prop.offer.brand}</h3>
                <h3>{prop.model ?? prop.offer.model}</h3>
                <p>{prop.price ?? prop.offer.price} €</p>
              </div>
            </Link>
          </div>
        );
      })}

      <Outlet />
    </>
  );
}

export default List;
