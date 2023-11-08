import { useRef, useState } from "react";
import myApi from "./../service/service";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const usernameInput = useRef();
  const passwordInput = useRef();
  const emailInput = useRef();
  const userTypeInput = useRef();
  const zipcodeInput = useRef();
  const cityInput = useRef();
  const phoneInput = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    const email = emailInput.current.value;
    // const userType = userTypeInput.current.value; to add also to the async function in the req body!!!!
    const zipcode = zipcodeInput.current.value;
    const city = cityInput.current.value;
    const phone = phoneInput.current.value;

    try {
      const response = await myApi.signup({
        username,
        password,
        email,

        zipcode,
        city,
        phone,
      });
      console.log("success", response);
      //   change for a toggle!!! singUp - logIn//
      //   navigate("/login");
    } catch (error) {
      console.log(error);
      //   setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="text" ref={emailInput} id="email" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          ref={usernameInput}
          id="username"
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
        />
      </div>
      <div>
        <label htmlFor="city">City: </label>
        <input type="text" ref={cityInput} id="city" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" ref={passwordInput} id="password" />
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

export default SignupPage;
