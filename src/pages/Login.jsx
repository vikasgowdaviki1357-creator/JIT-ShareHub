import "./../styles/Login.css";
import illustration from "../assets/student-illustration.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Simple hash function (btoa-based, consistent across sessions)
const hashPassword = (password) => {
  return btoa(
    password.split("").map((c, i) =>
      String.fromCharCode(c.charCodeAt(0) ^ (42 + i % 7))
    ).join("")
  );
};

function Login() {

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!email)    e.email    = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                   e.email    = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6)
                   e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleLogin = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    setErrors({});

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const hashed = hashPassword(password);

      const foundUser = users.find(
        (u) => u.email === email && u.password === hashed
      );

      if (!foundUser) {
        setErrors({ general: "Invalid email or password. Please try again." });
        setLoading(false);
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setLoading(false);
      navigate("/");
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="login-page">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* LEFT */}
      <div className="login-left">

        <div className="brand">🎓 JIT ShareHub</div>

        <img
          src={illustration}
          alt="Student Illustration"
          className="login-illustration"
        />

        <h1>Learn.<br />Trade.<br />Grow.</h1>

        <p>
          Resources, Marketplace, Placements and AI Assistant
          in one student ecosystem.
        </p>

        <div className="left-chips">
          <div className="chip">📚 Resources</div>
          <div className="chip">🛒 Marketplace</div>
          <div className="chip">🤖 AI Assistant</div>
          <div className="chip">🎯 Placements</div>
        </div>

      </div>

      {/* RIGHT */}
      <div className="login-right">
        <div className="login-card">

          <div className="card-logo">🎓</div>
          <h2>Welcome Back</h2>
          <p className="card-sub">Sign in to your JIT ShareHub account</p>

          {errors.general && (
            <div className="error-banner">⚠️ {errors.general}</div>
          )}

          <div className="field-group">
            <label>College Email</label>
            <input
              type="email"
              placeholder="yourname@jit.edu.in"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
              onKeyDown={handleKeyDown}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field-group">
            <label>Password</label>
            <div className="pass-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
                onKeyDown={handleKeyDown}
                className={errors.password ? "input-error" : ""}
              />
              <button
                type="button"
                className="pass-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="forgot-row">
            <span className="forgot-link">Forgot password?</span>
          </div>

          <button
            className={`login-btn-main ${loading ? "loading" : ""}`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : "Login →"}
          </button>

          <div className="divider"><span>or</span></div>

          <button className="google-btn">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="G"
              width="18"
            />
            Continue with Google
          </button>

          <p className="switch-auth">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>

        </div>
      </div>

    </div>
  );
}


export default Login;
