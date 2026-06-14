import "./../styles/Login.css";
import illustration from "../assets/student-illustration.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {

    if (
      !name ||
      !email ||
      !branch ||
      !password
    ) {
      alert("Please fill all fields");
      return;
    }

    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const alreadyExists =
      users.find(
        (user) => user.email === email
      );

    if (alreadyExists) {
      alert("User already exists");
      return;
    }

    const newUser = {
      name,
      email,
      branch,
      password
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Account Created Successfully 🚀");

    navigate("/login");
  };

  return (
    <div className="login-page">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <div className="login-left">

        <img
          src={illustration}
          alt="Student"
          className="login-illustration"
        />

        <div className="brand">
          JIT ShareHub
        </div>

        <h1>
          Create
          <br />
          Your
          <br />
          Account
        </h1>

        <p>
          Join the student ecosystem.
        </p>

      </div>

      <div className="login-right">

        <div className="login-card">

          <h2>Sign Up</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <select
            value={branch}
            onChange={(e) =>
              setBranch(e.target.value)
            }
          >
            <option value="">
              Select Branch
            </option>

            <option>CSE</option>
            <option>ISE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>MECH</option>
            <option>CIVIL</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button onClick={handleSignup}>
            Create Account
          </button>

          <p
            style={{
              marginTop: "15px",
              textAlign: "center"
            }}
          >
            Already have an account?

            <span
              onClick={() =>
                navigate("/login")
              }
              style={{
                color: "#2563eb",
                cursor: "pointer",
                marginLeft: "5px",
                fontWeight: "600"
              }}
            >
              Login
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;