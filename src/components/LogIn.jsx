import { useRef, useState } from "react";

import myApi from "./../service/service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";

function Login() {
  const emailInput = useRef();
  const passwordInput = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { authenticateUser } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;
    try {
      const response = await myApi.post("/auth/login", { email, password });
      console.log("success", response);
      localStorage.setItem("authToken", response.data.token);
      await authenticateUser();
      navigate("/");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="text" ref={emailInput} id="email" required />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" ref={passwordInput} id="password" required />
      </div>
      <button>Login</button>
      <p className="error">{error}</p>
      <article id="test-account-info">
        Hint: you can use a test account!
        <p id="test-account-info_email">
          {" "}
          Client:
          <span>user@user.com 1234567890Aa</span>
          CarDealer: <span> bestcars@bestcars.net 1234567890Aa</span>
        </p>
      </article>
    </form>
  );
}

export default Login;
