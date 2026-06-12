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

      <h1>🎯 Placement Portal</h1>

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

      <h2>🏢 Latest Opportunities</h2>

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

        <div className="company-card">

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