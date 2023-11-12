import React from "react";
import { Outlet, Link } from "react-router-dom";

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
              {prop.photo
                ? prop.photo.map((onephoto, index) => {
                    return <img key={index} src={onephoto} alt="car photo" />;
                  })
                : prop.offer.photo.map((onephoto, index) => {
                    return <img key={index} src={onephoto} alt="car photo" />;
                  })}

              <div id="offer-card_info">
                <h3>{prop.brand ?? prop.offer.brand}</h3>
                <h3>{prop.model ?? prop.offer.model}</h3>
                <p>{prop.price ?? prop.offer.price} €</p>
              </div>
            </Link>
          </div>
        );
      })}
      ;
      <Outlet />
    </>
  );
}

export default List;
