import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function List(props) {
  const { user, isLoggedIn } = useAuth();
  console.log(props);
  return (
    <>
      {props.offersToFetch.map((prop) => {
        const isMyOffer =
          isLoggedIn && prop.carDealer && prop.carDealer === user._id;
        const isMyFav = isLoggedIn && prop.user && prop.user === user._id;

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
            {isLoggedIn && (
              <div>
                {isMyOffer && (
                  <div>
                    <button>Delete</button>
                    <button>Update</button>
                  </div>
                )}

                {isMyFav && (
                  <div>
                    <button>Unlike</button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <Outlet />
    </>
  );
}

export default List;
