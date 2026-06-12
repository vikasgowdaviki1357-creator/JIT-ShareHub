import "./../styles/Placements.css";
import { Link } from "react-router-dom";

function Placements() {

  const companies = [
    {
      name: "Google",
      role: "Software Engineer",
      package: "₹25 LPA"
    },
    {
      name: "Microsoft",
      role: "SDE",
      package: "₹22 LPA"
    },
    {
      name: "Infosys",
      role: "System Engineer",
      package: "₹6 LPA"
    },
    {
      name: "TCS",
      role: "Ninja",
      package: "₹4 LPA"
    }
  ];

  return (
    <div className="placements-page">

      <div className="placements-hero">

        <div className="hero-badge">🎯 PLACEMENT PORTAL</div>

        <h1 className="hero-title">Placements</h1>
        <h2 className="hero-subtitle">Your gateway to top opportunities.</h2>

        <p className="hero-desc">
          Explore the latest job openings, track packages, and
          build your resume to stand out.
        </p>

        <div className="hero-icon">🏢</div>

      </div>

      <div className="placement-stats">

        <div className="placement-card">
          <h2>25+</h2>
          <p>Companies</p>
        </div>

        <div className="placement-card">
          <h2>100+</h2>
          <p>Jobs</p>
        </div>

        <div className="placement-card">
          <h2>1</h2>
          <p>Current User</p>
        </div>

        <div className="placement-card">
          <h2>300+</h2>
          <p>Aptitude Resources</p>
        </div>

      </div>

      <h2 className="section-title">🏢 Latest Opportunities</h2>

      <div className="company-grid">

        {companies.map((company, index) => (

          <div
            key={index}
            className="company-card"
          >

            <h3>{company.name}</h3>

            <p>
              Role: {company.role}
            </p>

            <p>
              Package: {company.package}
            </p>

            <button>
              Apply Now
            </button>

          </div>

        ))}

        {/* Resume Builder Card */}

        <div className="company-card resume-card">

          <h3>📄 Resume Builder</h3>

          <p>
            Create professional resumes for
            placement drives.
          </p>

          <Link to="/resume-builder">
            <button>
              Open Resume Builder
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Placements;
