import { useState } from "react";
import "./../styles/SellItem.css";

function UploadResource() {

  const [title, setTitle] = useState("");
  const [branch, setBranch] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = () => {

    if (!title || !branch || !file) {
      alert("Please fill all fields");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {

      const currentUser =
  JSON.parse(localStorage.getItem("currentUser"));

const newResource = {
  title,
  branch,
  fileName: file.name,
  fileData: reader.result,
  owner: currentUser?.email
};

      const oldResources =
        JSON.parse(localStorage.getItem("resources")) || [];

      oldResources.push(newResource);

      localStorage.setItem(
        "resources",
        JSON.stringify(oldResources)
      );

      // Activity Feed

      const activities =
        JSON.parse(localStorage.getItem("activities")) || [];

      activities.unshift({
        text: `📚 ${title} uploaded`,
        time: new Date().toLocaleString()
      });

      localStorage.setItem(
        "activities",
        JSON.stringify(activities)
      );

      alert("📚 Resource Uploaded Successfully");

      setTitle("");
      setBranch("");
      setFile(null);
    };

    reader.readAsDataURL(file);
  };

  return (

    <div className="sell-page">

      <div className="sell-hero">

        <div className="hero-badge">📚 RESOURCE HUB</div>

        <h1 className="hero-title">Upload Resource</h1>
        <h2 className="hero-subtitle">Share knowledge, help others grow.</h2>

        <p className="hero-desc">
          Upload notes, PDFs, question papers and study materials
          for your juniors and peers to access.
        </p>

        <div className="hero-icon">📤</div>

      </div>

      <div className="sell-card">

        <h1>📚 Upload Resource</h1>

        <p>
          Upload notes, PDFs, question papers and study materials.
        </p>

        <input
          type="text"
          placeholder="Resource Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
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
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        {file && (
          <p>
            📄 {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
        >
          📤 Upload Resource
        </button>

      </div>

    </div>
  );
}

export default UploadResource;
