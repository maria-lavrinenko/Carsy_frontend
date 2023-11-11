import React from "react";
import { Outlet } from "react-router-dom";

function List(props) {
  console.log(props);
  return (
    <>
      {props.offersToFetch.map((prop) => {
        return (
          <div id="offer-card" key={prop.id}>
            <div>
              {prop.photo
                ? prop.photo.map((onephoto, index) => {
                    return <img key={index} src={onephoto} alt="car photo" />;
                  })
                : prop.offer.photo.map((onephoto, index) => {
                    return <img key={index} src={onephoto} alt="car photo" />;
                  })}
            </div>
            <h3>{prop.brand ?? prop.offer.brand}</h3>
            <h3>{prop.model ?? prop.offer.model}</h3>
            <p>{prop.price ?? prop.offer.price} €</p>
          </div>
        );
      })}
      ;
      <Outlet />
    </>
  );
}

export default List;
