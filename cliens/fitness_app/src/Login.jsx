import { useState } from "react";
import axios from "./api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (E) => {
    E.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        loginData,
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(res.data.existingUser),
      );

      navigate("/home");
    } catch (error) {
      console.error(error);
      console.log("AXIOS ERROR:", error);
      alert("Hibas email vagy jelszo");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Log in</button>
      </form>
      <div>
        <h4>
          You don&apos;t have an account yet?{" "}
          <a href="/register">Register</a>{" "}
        </h4>
      </div>
    </div>
  );
}
