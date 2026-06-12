import { useState } from "react";
import "./../styles/ResumeBuilder.css";
import jsPDF from "jspdf";

function ResumeBuilder() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [summary, setSummary] = useState("");

  const generatePDF = () => {

    const doc = new jsPDF();

    let y = 20;

    // Header
    doc.setFontSize(22);
    doc.text(name || "Your Name", 20, y);

    y += 10;

    doc.setFontSize(11);
    doc.text(
      `${phone || ""} | ${email || ""}`,
      20,
      y
    );

    y += 7;

    doc.text(
      linkedin || "",
      20,
      y
    );

    y += 15;

    // Summary
    doc.setFontSize(15);
    doc.text("PROFESSIONAL SUMMARY", 20, y);

    y += 8;

    const summaryLines =
      doc.splitTextToSize(
        summary || "-",
        170
      );

    doc.text(summaryLines, 20, y);

    y += summaryLines.length * 6 + 10;

    // Education
    doc.setFontSize(15);
    doc.text("EDUCATION", 20, y);

    y += 8;

    const educationLines =
      doc.splitTextToSize(
        education || "-",
        170
      );

    doc.text(educationLines, 20, y);

    y += educationLines.length * 6 + 10;

    // Skills
    doc.setFontSize(15);
    doc.text("SKILLS", 20, y);

    y += 8;

    const skillsLines =
      doc.splitTextToSize(
        skills || "-",
        170
      );

    doc.text(skillsLines, 20, y);

    y += skillsLines.length * 6 + 10;

    // Projects
    doc.setFontSize(15);
    doc.text("PROJECTS", 20, y);

    y += 8;

    const projectLines =
      doc.splitTextToSize(
        projects || "-",
        170
      );

    doc.text(projectLines, 20, y);

    doc.save(`${name || "Resume"}.pdf`);

    // Activity Feed
    const activities =
      JSON.parse(localStorage.getItem("activities")) || [];

    activities.unshift({
      text: "📄 Resume generated",
      time: new Date().toLocaleString()
    });

    localStorage.setItem(
      "activities",
      JSON.stringify(activities)
    );
  };

  return (
    <div className="resume-page">

      <div className="resume-container">

        <h1 className="resume-title">
          📄 Resume Builder
        </h1>

        <div className="resume-form">

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
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="LinkedIn URL"
            value={linkedin}
            onChange={(e) =>
              setLinkedin(e.target.value)
            }
          />

          <textarea
            placeholder="Professional Summary"
            value={summary}
            onChange={(e) =>
              setSummary(e.target.value)
            }
          />

          <textarea
            placeholder="Education"
            value={education}
            onChange={(e) =>
              setEducation(e.target.value)
            }
          />

          <textarea
            placeholder="Skills"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
          />

          <textarea
            placeholder="Projects"
            value={projects}
            onChange={(e) =>
              setProjects(e.target.value)
            }
          />

          <button
            className="generate-btn"
            onClick={generatePDF}
          >
            📄 Download Resume
          </button>

        </div>

        <div className="resume-preview">

          <div className="resume-header">

            <h2>
              {name || "YOUR NAME"}
            </h2>

            <div className="contact-line">
              {phone || "Phone"} | {email || "Email"}
            </div>

            <div className="contact-line">
              {linkedin || "LinkedIn Profile"}
            </div>

          </div>

          <hr />

          <h3>PROFESSIONAL SUMMARY</h3>

          <p>
            {summary || "Write a short professional summary"}
          </p>

          <h3>EDUCATION</h3>

          <p>
            {education || "Add education details"}
          </p>

          <h3>SKILLS</h3>

          <p>
            {skills || "Add your skills"}
          </p>

          <h3>PROJECTS</h3>

          <p>
            {projects || "Add project details"}
          </p>

        </div>

      </div>

    </div>
  );
}

export default ResumeBuilder;