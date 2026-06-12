import "./../styles/Home.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const resources    = JSON.parse(localStorage.getItem("resources"))    || [];
  const products     = JSON.parse(localStorage.getItem("products"))     || [];
  const users        = JSON.parse(localStorage.getItem("users"))        || [];
  const currentUser  = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  /* ── Scroll-reveal via IntersectionObserver ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  /* ── Navbar scroll-shrink ── */
  useEffect(() => {
    const nav = document.querySelector(".navbar");
    const onScroll = () => {
      if (window.scrollY > 60) nav?.classList.add("scrolled");
      else nav?.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="home page-enter">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">JIT ShareHub</span>
        </div>

        <div className="nav-links">
          <Link to="/" className="active">Home</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/marketplace">Marketplace</Link>
          <Link to="/events">Events</Link>
          <Link to="/ai-assistant">AI Assistant</Link>
        </div>

        <div className="nav-actions">
          <Link to="/dashboard" className="dashboard-btn">Dashboard</Link>
          {currentUser ? (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" className="login-btn">
              <span className="login-icon">👤</span> Login
            </Link>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-content">

          {/* LEFT */}
          <div className="hero-left">
            <div className="badge">🚀 Student Ecosystem Platform</div>

            <h1 className="hero-title">
              Learn. Share.<br />
              <span>Grow Together.</span>
            </h1>

            <p className="hero-desc">
              All the resources, tools and opportunities
              you need to excel in your academic journey.
            </p>

            <div className="hero-buttons">
              <Link to="/resources" className="primary-btn">Explore Now →</Link>
              <Link to="/dashboard" className="secondary-btn">View Dashboard ⊞</Link>
            </div>

            <div className="student-count">
              <div className="avatars">
                <img src="https://i.pravatar.cc/36?img=1" alt="" />
                <img src="https://i.pravatar.cc/36?img=2" alt="" />
                <img src="https://i.pravatar.cc/36?img=3" alt="" />
                <img src="https://i.pravatar.cc/36?img=4" alt="" />
              </div>
              <div>
                <strong>Join {users.length || 1000}+ Students</strong>
                <p>and explore endless opportunities.</p>
              </div>
            </div>
          </div>

          {/* RIGHT — floating cards */}
          <div className="hero-right">
            <div className="hero-card card-resources">
              <div className="card-icon resources-icon">📄</div>
              <h4>Resources</h4>
            </div>

            <div className="hero-card card-marketplace">
              <div className="card-icon marketplace-icon">🛒</div>
              <h4>Marketplace</h4>
            </div>

            <div className="hero-card card-ai">
              <div className="card-icon ai-icon">🤖</div>
              <h4>AI Assistant</h4>
            </div>

            <div className="hero-card card-placements">
              <div className="card-icon placements-icon">💼</div>
              <h4>Placements</h4>
            </div>

            <div className="dashboard-preview">
              <div className="dash-bar bar1"></div>
              <div className="dash-bar bar2"></div>
              <div className="dash-circle"></div>
              <span className="dash-label">💻</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats reveal stagger">
        <div className="stat-box">
          <div className="stat-icon resources-stat">📄</div>
          <div className="stat-text">
            <h2>{resources.length || "250+"}</h2>
            <p>Resources</p>
            <small>Study materials &amp; notes</small>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon students-stat">👥</div>
          <div className="stat-text">
            <h2>{users.length || "1500+"}</h2>
            <p>Students</p>
            <small>Active on platform</small>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon market-stat">🛍️</div>
          <div className="stat-text">
            <h2>{products.length || "350+"}</h2>
            <p>Marketplace Items</p>
            <small>Buy &amp; sell anything</small>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon dept-stat">🏛️</div>
          <div className="stat-text">
            <h2>9+</h2>
            <p>Departments</p>
            <small>Across JIT</small>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features">
        <p className="section-eyebrow reveal">What's inside</p>
        <h2 className="reveal">Explore Features</h2>
        <div className="underline-accent reveal"></div>

        <div className="features-grid stagger">
          <div className="feature-card reveal">
            <div className="feat-icon resources-feat">📄</div>
            <div className="feat-text">
              <h3>Study Resources</h3>
              <p>Access notes, PDFs, question papers and study materials.</p>
              <Link to="/resources" className="feat-link">Explore Now →</Link>
            </div>
          </div>
          <div className="feature-card reveal">
            <div className="feat-icon market-feat">🛒</div>
            <div className="feat-text">
              <h3>Marketplace</h3>
              <p>Buy and sell books, electronics and other student items.</p>
              <Link to="/marketplace" className="feat-link">Explore Now →</Link>
            </div>
          </div>
          <div className="feature-card reveal">
            <div className="feat-icon ai-feat">🤖</div>
            <div className="feat-text">
              <h3>AI Assistant</h3>
              <p>Get instant help for coding, projects and academic questions.</p>
              <Link to="/ai-assistant" className="feat-link">Explore Now →</Link>
            </div>
          </div>
          <div className="feature-card reveal">
            <div className="feat-icon place-feat">💼</div>
            <div className="feat-text">
              <h3>Placements</h3>
              <p>Find placement updates, resume builder and interview resources.</p>
              <Link to="/placements" className="feat-link">Explore Now →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPARTMENTS ── */}
      <section className="branches">
        <p className="section-eyebrow reveal">Your branch</p>
        <h2 className="reveal">Departments</h2>
        <div className="underline-accent reveal"></div>

        <div className="branch-grid stagger">
          {["💻 CSE","🖥️ ISE","🤖 AIML","📡 ECE","⚡ EEE","⚙️ MECH","🏗️ CIVIL","📊 AIDS","💼 MBA"].map((b) => (
            <div className="branch-card reveal" key={b}>
              <span>{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer reveal">
        <h2>JIT ShareHub</h2>
        <p>Built for students to learn, share and grow together.</p>
        <p>© 2026 JIT ShareHub</p>
      </footer>

      {/* ── FLOATING AI BUTTON ── */}
      <Link to="/ai-assistant" className="floating-ai-btn">
        <span>🤖</span>
      </Link>

    </div>
  );
}

export default Home;
