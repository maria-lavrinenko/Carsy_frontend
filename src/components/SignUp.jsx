import { useRef, useState } from "react";
import myApi from "./../service/service";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthForm } from "../context/AuthFormContext";

function Signup({ isFlipped, setIsFlipped }) {
  const usernameInput = useRef();
  const passwordInput = useRef();
  const emailInput = useRef();
  const { userType, setUserType } = useAuthForm();

  const zipcodeInput = useRef();
  const userTypeInput = useRef();
  const cityInput = useRef();
  const phoneInput = useRef();
  const [error, setError] = useState("");

  function handleRoleChange(e) {
    setUserType(e.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    const email = emailInput.current.value;
    const role = userTypeInput.current.value;
    const zipcode = zipcodeInput.current.value;
    const city = cityInput.current.value;
    const phone = phoneInput.current.value;

    try {
      const response = await myApi.signup({
        username,
        password,
        email,
        role,
        address: { zipcode, city },
        phone,
      });
      console.log("success", response);
      setIsFlipped(!isFlipped);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userType">You are a: </label>
        <select
          ref={userTypeInput}
          id="userType"
          onChange={handleRoleChange}
          defaultValue={userType}
        >
          <option value="client">Client</option>
          <option value="carDealer">Car Dealer</option>
        </select>
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          ref={emailInput}
          id="email"
          required
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          ref={usernameInput}
          id="username"
          required
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="zipcode">Zipcode: </label>
        <input
          type="number"
          ref={zipcodeInput}
          id="zipcode"
          autoComplete="off"
          required
        />
      </div>
      <div>
        <label htmlFor="city">City: </label>
        <input
          type="text"
          ref={cityInput}
          id="city"
          autoComplete="off"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          title="Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter."
          ref={passwordInput}
          id="password"
        />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input type="text" ref={phoneInput} id="phone" />
      </div>

      <button>Signup</button>
      <p className="error">{error}</p>
    </form>
  );
}

export default Signup;
