import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../styles/Resources.css";

function Resources() {

  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");

  useEffect(() => {

    const storedResources =
      JSON.parse(localStorage.getItem("resources")) || [];

    setResources(storedResources);

  }, []);

  const deleteResource = (index) => {

    const updatedResources =
      resources.filter((_, i) => i !== index);

    localStorage.setItem(
      "resources",
      JSON.stringify(updatedResources)
    );

    setResources(updatedResources);
  };

  const downloadResource = (resource) => {

    if (!resource.fileData) {
      alert("PDF data not found");
      return;
    }

    const link =
      document.createElement("a");

    link.href = resource.fileData;

    link.download =
      resource.fileName || "resource.pdf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const filteredResources = resources.filter(resource => {

    const matchesSearch =
      resource.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesBranch =
      selectedBranch === "All" ||
      resource.branch === selectedBranch;

    return matchesSearch && matchesBranch;
  });

  return (

    <div className="resources-page">

      <div className="resources-container">

        <h1 className="resources-title">
          📚 Resources Portal
        </h1>

        <Link
          to="/upload-resource"
          className="upload-btn"
          style={{
            display: "block",
            textAlign: "center",
            textDecoration: "none",
            marginBottom: "25px"
          }}
        >
          📤 Upload Resource
        </Link>

        <div className="upload-card">

          <input
            type="text"
            placeholder="🔍 Search Resources..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

          <select
            value={selectedBranch}
            onChange={(e) =>
              setSelectedBranch(e.target.value)
            }
          >
            <option>All</option>
            <option>CSE</option>
            <option>ISE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>MECH</option>
            <option>CIVIL</option>
          </select>

        </div>

        <div className="resource-grid">

          {filteredResources.length === 0 ? (

            <div className="resource-card">

              <h3>
                No Resources Found 📭
              </h3>

              <p>
                Upload your first resource.
              </p>

            </div>

          ) : (

            filteredResources.map(
              (resource, index) => (

                <div
                  key={index}
                  className="resource-card"
                >

                  <h3>
                    {resource.title}
                  </h3>

                  <span className="branch-tag">
                    {resource.branch}
                  </span>

                  <p
                    style={{
                      marginTop: "15px"
                    }}
                  >
                    📄 {resource.fileName}
                  </p>

                  <button
                    className="upload-btn"
                    onClick={() =>
                      downloadResource(resource)
                    }
                  >
                    📥 Download
                  </button>

                  <button
                    className="delete-resource"
                    onClick={() =>
                      deleteResource(index)
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              )
            )

          )}

        </div>

      </div>

    </div>

  );
}

export default Resources;