import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../styles/Resources.css";

const BRANCHES = ["All", "CSE", "ISE", "ECE", "EEE", "MECH", "CIVIL"];

function Resources() {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");

  useEffect(() => {
    const storedResources = JSON.parse(localStorage.getItem("resources")) || [];
    setResources(storedResources);
  }, []);

  const deleteResource = (index) => {
    const updated = resources.filter((_, i) => i !== index);
    localStorage.setItem("resources", JSON.stringify(updated));
    setResources(updated);
  };

  const downloadResource = (resource) => {
    if (!resource.fileData) { alert("PDF data not found"); return; }
    const link = document.createElement("a");
    link.href = resource.fileData;
    link.download = resource.fileName || "resource.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === "All" || resource.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="resources-page">
      <div className="resources-container">

        {/* ── Hero ── */}
        <div className="resources-hero">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">📚 JIT ShareHub</div>
              <h1 className="hero-title">
                Resources Portal
                <span>Study smarter, together.</span>
              </h1>
              <p className="hero-subtitle">
                Browse, download, and share academic resources across all branches.
              </p>
              <Link to="/upload-resource" className="upload-btn-hero">
                📤 Upload a Resource
              </Link>
            </div>
            <div className="hero-icon">📖</div>
          </div>
        </div>

        {/* ── Filter Bar ── */}
        <div className="filter-bar">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="branch-filters">
            {BRANCHES.map(branch => (
              <button
                key={branch}
                className={`branch-pill${selectedBranch === branch ? " active" : ""}`}
                onClick={() => setSelectedBranch(branch)}
              >
                {branch}
              </button>
            ))}
          </div>
        </div>

        {/* ── Results meta ── */}
        {resources.length > 0 && (
          <div className="results-meta">
            <span className="results-count">
              Showing <strong>{filteredResources.length}</strong> of {resources.length} resources
              {selectedBranch !== "All" && ` · ${selectedBranch}`}
            </span>
          </div>
        )}

        {/* ── Grid ── */}
        <div className="resource-grid">
          {filteredResources.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📭</span>
              <h3>No resources found</h3>
              <p>
                {searchTerm || selectedBranch !== "All"
                  ? "Try a different search or branch filter."
                  : "Be the first to share a resource with your batch!"}
              </p>
              <Link to="/upload-resource" className="upload-btn-hero" style={{ display: "inline-flex" }}>
                📤 Upload Resource
              </Link>
            </div>
          ) : (
            filteredResources.map((resource, index) => (
              <div
                key={index}
                className="resource-card"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="card-accent" />
                <div className="card-body">
                  <div className="card-top">
                    <h3>{resource.title}</h3>
                    <span className="branch-tag">{resource.branch}</span>
                  </div>

                  {resource.fileName && (
                    <div className="card-file-info">
                      <span className="file-icon">📄</span>
                      <span className="file-name-text">{resource.fileName}</span>
                    </div>
                  )}

                  <div className="card-actions">
                    <button
                      className="download-btn"
                      onClick={() => downloadResource(resource)}
                    >
                      📥 Download
                    </button>
                    <button
                      className="delete-resource"
                      title="Delete resource"
                      onClick={() => deleteResource(index)}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Resources;
