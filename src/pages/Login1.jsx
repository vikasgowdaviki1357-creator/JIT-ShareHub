import "./../styles/Login.css";
import illustration from "../assets/student-illustration.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!foundUser) {
      alert("Invalid Email or Password");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

    alert("Login Successful 🚀");

    navigate("/dashboard");
  };

  return (
    <div className="login-page">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <div className="login-left">

        <img
          src={illustration}
          alt="Student Illustration"
          className="login-illustration"
        />

        <div className="brand">
          JIT ShareHub
        </div>

        <h1>
          Learn.
          <br />
          Trade.
          <br />
          Grow.
        </h1>

        <p>
          Resources, Marketplace, Placements and AI Assistant
          in one student ecosystem.
        </p>

      </div>

      <div className="login-right">

        <div className="login-card">

          <h2>Login</h2>

          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button onClick={handleLogin}>
            Login
          </button>

          <button className="google-btn">
            Continue with Google
          </button>

          <p
            style={{
              marginTop: "15px",
              textAlign: "center"
            }}
          >
            Don't have an account?

            <span
              onClick={() =>
                navigate("/signup")
              }
              style={{
                color: "#2563eb",
                cursor: "pointer",
                marginLeft: "5px",
                fontWeight: "600"
              }}
            >
              Sign Up
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;