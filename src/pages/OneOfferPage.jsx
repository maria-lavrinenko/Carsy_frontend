import React from "react";
import { useAuth } from "../context/AuthContext";

function OneOfferPage() {
  const { user, isLoggedIn } = useAuth();
  const isMyOffer = isLoggedIn && prop.carDealer && prop.carDealer === user._id;
  const isMyFav = isLoggedIn && prop.user && prop.user === user._id;

  return (
    <div id="action-buttons">
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
}

export default OneOfferPage;
