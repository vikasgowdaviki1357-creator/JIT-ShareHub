import "./../styles/Login.css";
import illustration from "../assets/student-illustration.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const hashPassword = (password) => {
  return btoa(
    password.split("").map((c, i) =>
      String.fromCharCode(c.charCodeAt(0) ^ (42 + i % 7))
    ).join("")
  );
};

function Signup() {

  const navigate = useNavigate();

  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [branch, setBranch]     = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  const strength = (p) => {
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8)           s++;
    if (/[A-Z]/.test(p))         s++;
    if (/[0-9]/.test(p))         s++;
    if (/[^A-Za-z0-9]/.test(p))  s++;
    return s;
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];
  const pwStrength = strength(password);

  const validate = () => {
    const e = {};
    if (!name.trim())  e.name = "Full name is required";
    if (!email)        e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                       e.email = "Enter a valid email address";
    if (!branch)       e.branch = "Please select your branch";
    if (!password)     e.password = "Password is required";
    else if (password.length < 6)
                       e.password = "Minimum 6 characters required";
    if (!confirm)      e.confirm = "Please confirm your password";
    else if (confirm !== password)
                       e.confirm = "Passwords do not match";
    return e;
  };

  const handleSignup = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    setErrors({});

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const exists = users.find((u) => u.email === email);

      if (exists) {
        setErrors({ email: "An account with this email already exists." });
        setLoading(false);
        return;
      }

      const newUser = {
        name,
        email,
        branch,
        password: hashPassword(password),
        joinedAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      setLoading(false);
      navigate("/login");
    }, 800);
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
          alt="Student"
          className="login-illustration"
        />

        <h1>Create<br />Your<br />Account.</h1>

        <p>Join 1500+ JIT students already on the platform.</p>

        <div className="left-chips">
          <div className="chip">📚 Resources</div>
          <div className="chip">🛒 Marketplace</div>
          <div className="chip">🤖 AI Assistant</div>
          <div className="chip">🎯 Placements</div>
        </div>

      </div>

      {/* RIGHT */}
      <div className="login-right">
        <div className="login-card signup-card">

          <div className="card-logo">🎓</div>
          <h2>Get Started</h2>
          <p className="card-sub">Create your free JIT ShareHub account</p>

          {errors.general && (
            <div className="error-banner">⚠️ {errors.general}</div>
          )}

          <div className="form-row-2">
            <div className="field-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors({}); }}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="field-group">
              <label>Branch</label>
              <select
                value={branch}
                onChange={(e) => { setBranch(e.target.value); setErrors({}); }}
                className={errors.branch ? "input-error" : ""}
              >
                <option value="">Select Branch</option>
                <option>CSE</option>
                <option>ISE</option>
                <option>AIML</option>
                <option>AIDS</option>
                <option>ECE</option>
                <option>EEE</option>
                <option>MECH</option>
                <option>CIVIL</option>
              </select>
              {errors.branch && <span className="field-error">{errors.branch}</span>}
            </div>
          </div>

          <div className="field-group">
            <label>College Email</label>
            <input
              type="email"
              placeholder="yourname@jit.edu.in"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field-group">
            <label>Password</label>
            <div className="pass-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
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
            {password && (
              <div className="strength-bar">
                <div className="strength-track">
                  {[1,2,3,4].map(i => (
                    <div
                      key={i}
                      className="strength-seg"
                      style={{
                        background: i <= pwStrength
                          ? strengthColor[pwStrength]
                          : "rgba(255,255,255,0.15)"
                      }}
                    />
                  ))}
                </div>
                <span style={{ color: strengthColor[pwStrength] }}>
                  {strengthLabel[pwStrength]}
                </span>
              </div>
            )}
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="field-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setErrors({}); }}
              className={errors.confirm ? "input-error" : ""}
            />
            {errors.confirm && <span className="field-error">{errors.confirm}</span>}
          </div>

          <button
            className={`login-btn-main ${loading ? "loading" : ""}`}
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : "Create Account →"}
          </button>

          <p className="switch-auth">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Signup;
